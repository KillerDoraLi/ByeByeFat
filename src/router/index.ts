import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { GoldMedal, UserFilled, List } from '@element-plus/icons-vue';

const routes: (RouteRecordRaw & { hideInMenu?: boolean })[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),

    meta: {
      title: '首页',
      hideInMenu: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      hideInMenu: true,
      title: '登录',
    },
  },
  // 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: {
      hideInMenu: true,
      title: '页面不存在',
    },
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   // 白名单：不需要登录就可以访问的页面
//   const whiteList = ['/login'];

//   if (token) {
//     // 已登录用户访问登录或注册页面，重定向到首页
//     if (whiteList.includes(to.path)) {
//       next('/');
//     } else {
//       next();
//     }
//   } else {
//     // 未登录用户只能访问白名单中的页面
//     if (whiteList.includes(to.path)) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });

export default router;
