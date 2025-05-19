import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import pinia from './store';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import './style.css';

import './api'

const app = createApp(App);

// 配置 Element Plus 主题
app.use(ElementPlus, {
  locale: zhCn,
  size: 'large',
});

app.use(router);
app.use(pinia);

app.mount('#app');
