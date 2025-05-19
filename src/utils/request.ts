// utils/request.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import router from '@/router';

const service: AxiosInstance = axios.create({
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (response.status !== 200 && response.status !== 201) {
      ElMessage({
        message: data.message || '请求失败',
        type: 'error',
        grouping: true,
      });
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const message = error.response?.data?.message || '网络错误';
    // 处理 401 未授权的情况
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      // 清除用户信息
      userStore.clearUserInfo();
      // 清除 token
      localStorage.removeItem('token');
      if (error.response.data.code === 'INVALID_PASSWORD') {
        ElMessage({
          message: message,
          type: 'error',
          grouping: true,
        });
      } else {
        // 跳转到登录页
        router.push('/login');
        ElMessage({
          message: '登录已过期，请重新登录',
          type: 'error',
          grouping: true,
        });
      }
    } else {
      ElMessage({
        message: message,
        type: 'error',
        grouping: true,
      });
    }
    return Promise.reject(error);
  },
);

export default service;
