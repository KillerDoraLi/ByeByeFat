<template>
  <div class="home" id="exportArea">
    <div class="header">
      <!-- <Carousel />  -->
      <el-button type="primary" @click="exportPDF" class="export-btn">
        导出PDF
      </el-button>
    </div>
    <Table />
    <!-- 
    <div class="progress-container">
      <div class="progress-card">
        <Activity
          :data="{
            Shawee: getPersonData('Shawee'),
            Aiving: getPersonData('Aiving'),
            Dora: getPersonData('Dora'),
          }"
        />
      </div>
    </div> -->

    <div class="charts-container">
      <div class="chart-card">
        <h2>Shawee</h2>
        <div class="chart-content">
          <LineChart
            name="Shawee"
            :data="getPersonData('Shawee').data"
            :goal="getPersonData('Shawee').goal"
          />
        </div>
        <div class="chart-content">
          <HeatMap name="Shawee" :data="getWeightChanges('Shawee')" />
        </div>
      </div>
    </div>
    <div class="chart-card">
      <h2>Aiving</h2>
      <div class="chart-content">
        <LineChart
          name="Aiving"
          :data="getPersonData('Aiving').data"
          :goal="getPersonData('Aiving').goal"
        />
      </div>
      <div class="chart-content">
        <HeatMap name="Aiving" :data="getWeightChanges('Aiving')" />
      </div>
    </div>

    <div class="chart-card">
      <h2>Dora</h2>
      <div class="chart-content">
        <LineChart
          name="Dora"
          :data="getPersonData('Dora').data"
          :goal="getPersonData('Dora').goal"
        />
      </div>
      <div class="chart-content">
        <HeatMap name="Dora" :data="getWeightChanges('Dora')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWeightStore } from '@/stores/weight';
import LineChart from '@/views/components/LineChart.vue';
import HeatMap from '@/views/components/HeatMap.vue';
import Table from '@/views/components/Table.vue';
import Carousel from '@/views/components/Carousel.vue';
// import Activity from '@/views/components/Activity.vue';
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus';

import html2pdf from 'html2pdf.js';

const weightStore = useWeightStore();

const getPersonData = (name) => {
  return weightStore.getPersonData(name);
};

const getWeightChanges = (name) => {
  return weightStore.getWeightChanges(name);
};

const exportPDF = async () => {
  const element = document.getElementById('exportArea');

  // PDF 配置
  const opt = {
    margin: 0,
    filename: 'report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      useCORS: true, // 允许跨域图片加载
      scale: 2, // 提高分辨率
      logging: false,
    },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' },
    // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }, // 避免切断表格、图表
  };

  // 为确保图表（如 ECharts）完全渲染，可延迟一点执行
  setTimeout(() => {
    html2pdf().set(opt).from(element).save();
  }, 300);
};
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  max-width: 1040px;
  margin: 0 auto;
}

.header {
  position: relative;
  margin-bottom: 20px;
}

.export-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.progress-container {
  margin: 20px 0;
}

.progress-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.chart-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-card h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5em;
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
