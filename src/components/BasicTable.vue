<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{
      backgroundColor: '#f5f5f5',
    }"
  >
    <template v-for="item in columns" :key="item.prop">
      <template v-if="item.type === 'index'">
        <el-table-column
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          type="index"
          :index="(index: number) => index + 1"
        />
      </template>
      <el-table-column
        v-else-if="item.type !== 'slot'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align"
        :fixed="item.fixed"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :formatter="item.formatter"
      />
      <el-table-column
        v-else
        :width="item.width"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        :align="item.align"
        :fixed="item.fixed"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template #default="{ row }">
          <slot :name="item.slotType" :row="row" />
        </template>
      </el-table-column>
    </template>

    <template #empty>
      <el-empty description="暂无数据" />
    </template>
  </el-table>
  <el-pagination
    v-if="showPagination"
    class="pagination"
    :current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    :size="size"
    :disabled="disabled"
    :background="background"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { ColumnType } from '@/types/table';

// props
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  size: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  background: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
});

const emit = defineEmits(['size-change', 'current-change']);

const handleSizeChange = (val: number) => {
  emit('size-change', val);
};

const handleCurrentChange = (val: number) => {
  emit('current-change', val);
};
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  margin-top: 12px;
  margin-right: -10px;
}
</style>
