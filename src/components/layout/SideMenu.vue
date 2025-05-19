<template>
  <el-menu
    class="el-menu-vertical"
    active-text-color="#333"
    background-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :default-active="defaultActive"
  >
    <template v-for="item in menus">
      <el-sub-menu
        v-if="item.children && item.children.length && !item.meta.hideInMenu"
        :key="item.path"
        :index="item.path"
        :title="item.meta.title"
      />
      <el-menu-item
        v-else-if="!item.meta.hideInMenu"
        :key="item.name"
        :index="item.path"
      >
        <el-icon :size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const menus = router.getRoutes();

const defaultActive = router.currentRoute.value.path;

const handleOpen = (key: string, keyPath: string[]) => {
  //
};
const handleClose = (key: string, keyPath: string[]) => {
  //
};
</script>

<style lang="less" scoped>
.el-menu-vertical {
  border: none;
  margin: 0 12px;
}
.el-menu-item {
  margin: 0 4px;
  border-radius: 14px;
  height: 42px;
  margin-bottom: 2px;

  .el-icon {
    color: var(--el-text-color-regular);
  }
}
.el-menu-item.is-active {
  background-color: #f5f7fa;

  .el-icon {
    color: var(--el-color-primary);
  }
}
.el-menu-item:hover {
  background-color: #f5f7fa;
}
</style>
