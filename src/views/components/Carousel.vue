<template>
  <div class="carousel-wrapper">
    <el-carousel height="400px" indicator-position="outside">
      <el-carousel-item v-for="image in images" :key="image">
        <img :src="image" alt="banner" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner4.png';
import banner3 from '@/assets/banner5.png';
import banner4 from '@/assets/banner6.png';
const images = [banner4];
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  margin-bottom: 20px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f5f7fa;
}

:deep(.el-carousel__container) {
  height: 400px;
}

:deep(.el-carousel__item) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
