<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      ref="uploadRef"
      :show-file-list="true"
      :file-list="fileList"
      :limit="1"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-change="handleFileChange"
      :on-exceed="handleExceed"
      list-type="text"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">支持jpg/png/pdf文件，大小不超过5MB</div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import { uploadInvoiceFile } from '@/api';

interface Attachment {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  related_id: number;
  related_type: string;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  uploaded_at: string;
  uploader_id: number;
}

// prop
const props = defineProps({
  attachments: {
    type: Array as PropType<Attachment[]>,
    required: false,
    default: () => [],
  },
  invoiceId: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['file-change', 'upload-success']);

const fileList = ref<any[]>([]);

const uploadRef = ref();

// 监听 attachments 变化，更新文件列表
watch(
  () => props.attachments,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      const attachment = newVal[newVal.length - 1];
      fileList.value = [
        {
          name: attachment.file_name,
          url: attachment.file_path,
          id: attachment.id,
        },
      ];
    } else {
      fileList.value = [];
    }
  },
  { immediate: true },
);

const beforeUpload = (file: any) => {
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('文件大小不能超过5MB');
    return false;
  }
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/png' &&
    file.type !== 'application/pdf'
  ) {
    ElMessage.error('文件格式必须为jpg/png/pdf');
    return false;
  }
  return false; // 返回 false 阻止自动上传
};

const handleExceed = (files: any[]) => {
  ElMessage.warning('只能上传一个文件，新文件将替换当前文件');

  // 清空上传组件的内部文件列表，但不清空显示的文件列表
  if (uploadRef.value) {
    uploadRef.value.clearFiles();

    // 手动上传新文件
    uploadRef.value.handleStart(files[0]);
  }
};

const handleFileChange = async (file: any, uploadFileList: any[]) => {
  if (file.status === 'ready') {
    // 不清空现有文件列表，保留原来的文件
    // 直接上传新文件
    try {
      const formData = new FormData();
      formData.append('file', file.raw);
      formData.append('remark', String(props.invoiceId));

      const res: any = await uploadInvoiceFile(props.invoiceId, formData);
      if (String(res.code) === '200' || String(res.code) === '201') {
        emit('file-change', file.raw);
        emit('upload-success', res.data);
        ElMessage.success('上传成功');

        // 上传成功后，才替换文件列表
        if (res.data) {
          fileList.value = [
            {
              name: res.data.file_name,
              url: res.data.file_path,
              id: res.data.id,
            },
          ];
        }
      } else {
        ElMessage.error(res.data?.message || '上传失败');
        // 上传失败时，不修改文件列表
      }
    } catch (error) {
      console.error('上传失败', error);
      ElMessage.error('上传失败');
      // 上传失败时，不修改文件列表
    }
  }
};
</script>

<style lang="less" scoped>
.upload-demo {
  width: 100%;

  :deep(.el-upload-dragger) {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--el-border-color);
    border-radius: 8px;
    background-color: var(--el-fill-color-blank);
    transition: all 0.3s;

    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  :deep(.el-upload-list) {
    margin-top: 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    padding: 8px;
    background-color: var(--el-fill-color-blank);

    .el-upload-list__item {
      margin-top: 8px;
      padding: 8px;
      border-radius: 4px;
      background-color: var(--el-fill-color-light);
      transition: all 0.3s;

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        background-color: var(--el-fill-color);
      }

      .el-upload-list__item-name {
        color: var(--el-text-color-primary);
        font-weight: 500;
      }

      .el-upload-list__item-status-label {
        color: var(--el-color-success);
      }
    }
  }
}
</style>
