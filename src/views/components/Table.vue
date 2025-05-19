<template>
  <div class="table-card">
    <h2>体重记录表格</h2>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="80" fixed />

        <el-table-column label="Aiving" align="center" min-width="400">
          <el-table-column label="体重" min-width="80">
            <template #default="{ row }">
              {{ row.aiving?.weight.toFixed(1) }}
            </template>
          </el-table-column>
          <el-table-column label="目标" min-width="70">
            <template #default="{ row }"> {{ row.aiving?.goal }} </template>
          </el-table-column>
          <el-table-column label="差值" min-width="70">
            <template #default="{ row }">
              <span
                :style="{
                  color: row.aiving?.diffFromGoal < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.aiving?.diffFromGoal < 0 ? '' : '') +
                  row.aiving?.diffFromGoal.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="日差" min-width="70">
            <template #default="{ row }">
              <span
                :style="{
                  color:
                    row.aiving?.diffFromYesterday < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.aiving?.diffFromYesterday > 0 ? '+' : '') +
                  row.aiving?.diffFromYesterday.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Dora" align="center" min-width="400">
          <el-table-column label="体重" min-width="70">
            <template #default="{ row }">
              {{ row.dora?.weight.toFixed(1) }}
            </template>
          </el-table-column>
          <el-table-column label="目标" min-width="70">
            <template #default="{ row }"> {{ row.dora?.goal }} </template>
          </el-table-column>
          <el-table-column label="差值" min-width="80">
            <template #default="{ row }">
              <span
                :style="{
                  color: row.dora?.diffFromGoal < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.dora?.diffFromGoal > 0 ? '' : '') +
                  row.dora?.diffFromGoal.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="日差" min-width="78">
            <template #default="{ row }">
              <span
                :style="{
                  color:
                    row.dora?.diffFromYesterday < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.dora?.diffFromYesterday > 0 ? '+' : '') +
                  row.dora?.diffFromYesterday.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Shawee" align="center" min-width="400">
          <el-table-column label="体重" min-width="90">
            <template #default="{ row }">
              {{ row.shawee?.weight.toFixed(1) }}
            </template>
          </el-table-column>
          <el-table-column label="目标" min-width="80">
            <template #default="{ row }"> {{ row.shawee?.goal }} </template>
          </el-table-column>
          <el-table-column label="差值" min-width="80">
            <template #default="{ row }">
              <span
                :style="{
                  color: row.shawee?.diffFromGoal < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.shawee?.diffFromGoal > 0 ? '' : '') +
                  row.shawee?.diffFromGoal.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="日差" min-width="70">
            <template #default="{ row }">
              <span
                :style="{
                  color:
                    row.shawee?.diffFromYesterday < 0 ? '#52c41a' : '#f5222d',
                }"
              >
                {{
                  (row.shawee?.diffFromYesterday > 0 ? '+' : '') +
                  row.shawee?.diffFromYesterday.toFixed(1)
                }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWeightStore } from '@/stores/weight';

const weightStore = useWeightStore();

const tableData = computed(() => {
  const dateMap = new Map();

  // 处理每个人的数据
  ['Aiving', 'Dora', 'Shawee'].forEach((name) => {
    const personData = weightStore.getPersonData(name);
    const goal = personData.goal;

    personData.data.forEach((record, index) => {
      const prevRecord = index > 0 ? personData.data[index - 1] : null;
      const date = record.date;

      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          aiving: null,
          dora: null,
          shawee: null,
        });
      }

      const rowData = dateMap.get(date);
      rowData[name.toLowerCase()] = {
        weight: record.weight,
        goal: goal,
        diffFromGoal: record.weight - goal,
        diffFromYesterday: prevRecord ? record.weight - prevRecord.weight : 0,
      };
    });
  });

  // 转换为数组并排序
  return Array.from(dateMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
});
</script>

<style scoped>
.table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.table-card h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5em;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

:deep(.el-table) {
  width: 100% !important;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table__header th) {
  background-color: #f5f7fa;
  font-weight: bold;
}
</style>
