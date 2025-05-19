import { defineStore } from 'pinia';

interface UserInfo {
  id: number;
  username: string;
}

export const useUserStore = defineStore('user', {
  state: () => {
    // 从 localStorage 中恢复用户信息
    const userInfoStr = localStorage.getItem('userInfo');
    let userInfo = null;
    try {
      userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
    } catch (error) {
      console.error('解析用户信息失败:', error);
      userInfo = null;
    }
    
    return {
      userInfo: userInfo as UserInfo | null
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      // 将用户信息保存到 localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    clearUserInfo() {
      this.userInfo = null;
      // 清除 localStorage 中的用户信息
      localStorage.removeItem('userInfo');
    }
  },
  getters: {
    getUserInfo: (state) => state.userInfo
  }
})