<template>
  <div :id="chartId" style="width: 100%; height: 200px"></div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { Heatmap } from '@antv/g2plot';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const chartId = computed(() => `heatmap-${props.name.toLowerCase()}`);

onMounted(() => {
  const heatmap = new Heatmap(chartId.value, {
    data: props.data,
    xField: 'date',
    yField: 'type',
    colorField: 'value',
    color: [
      '#003b23', // 最深的绿
      '#006c45', // 深绿
      '#2ba471', // 绿
      '#92dab2', // 中绿
      '#c6f3d7', // 浅绿
      '#e3f9e9', // 最浅的绿
      '#f2f3ff', // 浅蓝（-0.2到0.2之间）
      '#fff0ed', // 最浅的红
      '#ffd8d2', // 浅红
      '#ff9285', // 中红
      '#d54941', // 红
      '#ad352f', // 深红
      '#68070a', // 最深的红
    ],
    label: {
      formatter: (datum) => {
        const value = datum.value;
        return value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
      },
      style: {
        fill: '#000',
        fontSize: 12,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: '体重变化',
        value: `${datum.value > 0 ? '+' : ''}${datum.value.toFixed(2)}斤`,
      }),
    },
    xAxis: {
      title: null,
    },
    yAxis: {
      visible: false, // 只有一个 type 可隐藏
    },
    meta: {
      value: {
        type: 'linear',
        min: -2,
        max: 2,
        tickCount: 13,
        formatter: (v) => {
          if (Math.abs(v) <= 0.2) return 0;
          return v;
        },
      },
    },
  });
  heatmap.render();
});
</script>
