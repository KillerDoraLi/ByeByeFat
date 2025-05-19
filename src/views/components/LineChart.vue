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
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
});

const chartId = computed(() => `lineChart-${props.name.toLowerCase()}`);

const goals = computed(() => ({
  [props.name]: props.goal,
}));

onMounted(() => {
  renderLineChart();
});

function renderLineChart() {
  const chart = new Chart({
    container: chartId.value,
    autoFit: true,
    height: 300,
  });

  chart.data([
    ...props.data,
    ...Object.entries(goals.value).flatMap(([name, goal]) =>
      props.data
        .filter((d) => d.name === name)
        .map((d) => ({ ...d, weight: goal, name: name + '(目标)' })),
    ),
  ]);

  chart.scale('weight', {
    range: [0, 1],
    nice: true,
    tickInterval: 1,
    min: Math.floor(Math.min(...props.data.map((d) => d.weight), props.goal)),
    max: Math.ceil(Math.max(...props.data.map((d) => d.weight), props.goal)),
  });

  chart.axis('weight', {
    labelFormatter: (d) => d + '斤',
  });

  chart.scale('date', {
    type: 'cat',
    range: [0, 1],
    tickCount: props.data.length,
  });

  chart.line().position('date*weight').color('name').shape('smooth');
  chart.point().position('date*weight').color('name');
  chart.render();
}
</script>
