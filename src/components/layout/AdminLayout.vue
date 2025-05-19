<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header">
        <h3>ByeByeFat</h3>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-icon :size="20" style="margin-right: 4px"><Avatar /></el-icon>
              {{ userInfo?.username }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="common-container">
        <el-aside class="common-aside">
          <SideMenu />
        </el-aside>
        <el-main class="common-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, Avatar } from '@element-plus/icons-vue';
import SideMenu from './SideMenu.vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const handleCommand = (command: string) => {
  if (command === 'logout') {
    // 清除 token
    localStorage.removeItem('token');
    // 清除用户信息
    userStore.clearUserInfo();
    // 跳转到登录页
    router.push({ path: '/login' });
    ElMessage.success('退出登录成功');
  }
};
</script>

<style lang="less" scoped>
.common-layout {
  .common-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    min-height: calc(100vh - 60px);
    width: 220px;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
  .common-header {
    background-color: #fff;
    color: #333;
    text-align: right;
    line-height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      color: #444;
    }
    .header-right {
      height: 100%;
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #333;
        padding: 12px 12px;
        border-radius: 4px;
        transition: all 0.3s;

        &:hover {
          background-color: #f5f7fa;
        }

        .el-icon--right {
          margin-left: 5px;
        }
      }
    }
  }
  .common-container {
    height: calc(100vh - 60px);
  }
  .common-main {
    background-color: #f5f7fa;
    width: calc(100% - 220px);
  }
}
</style>
