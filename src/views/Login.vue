<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧白色区域 -->
      <div class="login-left">
        <h1 class="title">ByeByeFat</h1>
        <h2 class="login-title">登录</h2>
        <p class="subtitle">
          还没有账号？ <a href="/#/register" class="link">注册</a>
        </p>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="form"
        >
          <el-form-item label="登录账号" prop="identity">
            <el-input
              v-model="form.identity"
              placeholder="请输入登录账号"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-button
            class="signup-btn"
            type="primary"
            :disabled="loading"
            :loading="loading"
            @click="handleSubmit"
          >
            登 录
          </el-button>
        </el-form>
      </div>

      <!-- 右侧插画区域 -->
      <div class="login-right">
        <div class="illustration-box">
          <img
            src="../assets/login3.png"
            alt="Illustration"
            class="illustration-img"
          />
          <!-- <div class="illustration-text">Have your own personal website</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

// import { login } from '@/api';

const form = reactive({
  identity: 'licj@q-yd.com',
  password: 'admin123',
});

const rules = {
  identity: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};

const formRef = ref();
const router = useRouter();
const loading = ref(false);

const handleSubmit = () => {
  router.push({ path: '/' });
  ElMessage.success('登录成功');
  // formRef.value.validate((valid) => {
  //   if (valid) {
  //     loading.value = true;
  // login(form)
  //   .then((res) => {
  //     // 存储 token
  //     localStorage.setItem('token', res.data);
  //     // 存储用户信息到 store
  //     // userStore.setUserInfo(res.data.user);
  //     // 跳转到首页
  //     router.push({ path: '/' });
  //     ElMessage.success('登录成功');
  //   })
  //   .catch((error) => {
  //     // ElMessage.error(error.message || '登录失败');
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
  //   }
  // });
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #dbdcfc; */
  background-image: url('@/assets/bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.login-container {
  display: flex;
  font-family: 'Inter', sans-serif;
  width: 960px;
  margin: 0 auto;
  height: 500px;
  /* border: 1px solid #eee; */
  border-radius: 20px;
  padding: 24px;
  background-color: #fff;
}

/* 左侧表单区域 */
.login-left {
  width: 45%;
  background-color: #ffffff;
  padding: 60px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.logo {
  width: 32px;
  margin-right: 8px;
}

.brand-name {
  font-size: 20px;
  font-weight: 600;
}

.title {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
}

.link {
  color: #40ab9c;
  font-weight: 600;
  text-decoration: none;
}

.form {
  max-width: 400px;
}

.signup-btn {
  width: 100%;
  height: 44px;
  background-color: #40ab9c;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 10px;
}

/* 右侧插画背景 */
.login-right {
  width: 60%;
  background: #40ab9c;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.illustration-box {
  width: 480px;
  text-align: center;
}

.illustration-img {
  width: 100%;
  object-fit: contain;
}

.illustration-text {
  color: white;
  font-size: 18px;
  margin-top: 20px;
  font-weight: 500;
}
</style>
