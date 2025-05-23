<template>
  <div>
    <div
      :id="chartId"
      style="width: 100%; height: 240px; margin-bottom: 0px"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { Chart } from '@antv/g2';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartId = computed(() => 'activity-progress');

const ratioData = computed(() => {
  const result = [];
  for (const [name, personData] of Object.entries(props.data)) {
    const currentWeight =
      personData.data[personData.data.length - 1]?.weight || 0;
    const ratio = currentWeight / personData.goal;
    result.push({
      name,
      value: ratio,
    });
  }
  return result;
});

onMounted(() => {
  renderChart();
});

function renderChart() {
  const chart = new Chart({
    container: chartId.value,
    autoFit: true,
    height: 300,
  });

  console.log(ratioData.value);
  chart.data(ratioData.value);
  chart.coordinate('theta', {
    radius: 0.75,
    innerRadius: 0.6,
  });

  chart.scale('value', {
    min: 0,
    max: 100,
  });

  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });

  chart.axis(false);

  chart
    .interval()
    .adjust('stack')
    .position('value')
    .color('name', ['#1890ff', '#52c41a', '#faad14'])
    .label('value', {
      offset: -10,
      style: {
        fontSize: 14,
        fill: '#333',
      },
      formatter: (val) => `${val.toFixed(1)}%`,
    });

  chart.annotation().text({
    position: ['50%', '50%'],
    content: '进度',
    style: {
      fontSize: 16,
      textAlign: 'center',
      fill: '#333',
    },
  });

  chart.render();
}
</script>
