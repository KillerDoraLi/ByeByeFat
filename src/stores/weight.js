import { defineStore } from 'pinia';

export const useWeightStore = defineStore('weight', {
  state: () => ({
    aiving: {
      name: 'Aiving',
      goal: 110,
      data: [
        { date: '05-06', name: 'Aiving', weight: 58.1 * 2 },
        { date: '05-07', name: 'Aiving', weight: 57.9 * 2 },
        { date: '05-08', name: 'Aiving', weight: 57.8 * 2 },
        { date: '05-09', name: 'Aiving', weight: 57.8 * 2 },
        { date: '05-10', name: 'Aiving', weight: 57.8 * 2 },
        { date: '05-11', name: 'Aiving', weight: 57.9 * 2 },
        { date: '05-12', name: 'Aiving', weight: 57.6 * 2 },
        { date: '05-13', name: 'Aiving', weight: 57.1 * 2 },
        { date: '05-14', name: 'Aiving', weight: 56.3 * 2 },
        { date: '05-15', name: 'Aiving', weight: 56.7 * 2 },
        { date: '05-16', name: 'Aiving', weight: 57.1 * 2 },
        { date: '05-17', name: 'Aiving', weight: 56.4 * 2 },
        { date: '05-18', name: 'Aiving', weight: 56.7 * 2 },
        { date: '05-19', name: 'Aiving', weight: 56.4 * 2 },
        { date: '05-20', name: 'Aiving', weight: 56.7 * 2 },
        { date: '05-21', name: 'Aiving', weight: 56.5 * 2 },
        { date: '05-22', name: 'Aiving', weight: 56.2 * 2 },
        { date: '05-23', name: 'Aiving', weight: 55.8 * 2 },
      ],
    },
    dora: {
      name: 'Dora',
      goal: 98,
      data: [
        { date: '05-06', name: 'Dora', weight: 52.0 * 2 },
        { date: '05-07', name: 'Dora', weight: 52.2 * 2 },
        { date: '05-08', name: 'Dora', weight: 51.4 * 2 },
        { date: '05-09', name: 'Dora', weight: 51.4 * 2 },
        { date: '05-10', name: 'Dora', weight: 51.8 * 2 },
        { date: '05-11', name: 'Dora', weight: 51.3 * 2 },
        { date: '05-12', name: 'Dora', weight: 51.0 * 2 },
        { date: '05-13', name: 'Dora', weight: 51.1 * 2 },
        { date: '05-14', name: 'Dora', weight: 50.8 * 2 },
        { date: '05-15', name: 'Dora', weight: 50.9 * 2 },
        { date: '05-16', name: 'Dora', weight: 51.0 * 2 },
        { date: '05-17', name: 'Dora', weight: 50.6 * 2 },
        { date: '05-18', name: 'Dora', weight: 50.6 * 2 },
        { date: '05-19', name: 'Dora', weight: 50.9 * 2 },
        { date: '05-20', name: 'Dora', weight: 50.9 * 2 },
        { date: '05-21', name: 'Dora', weight: 50.8 * 2 },
        { date: '05-22', name: 'Dora', weight: 50.6 * 2 },
        { date: '05-23', name: 'Dora', weight: 50.9 * 2 },
      ],
    },
    shawee: {
      name: 'Shawee',
      goal: 96,
      data: [
        { date: '05-06', name: 'Shawee', weight: 54.9 * 2 },
        { date: '05-07', name: 'Shawee', weight: 54.3 * 2 },
        { date: '05-08', name: 'Shawee', weight: 54.1 * 2 },
        { date: '05-09', name: 'Shawee', weight: 54.7 * 2 },
        { date: '05-10', name: 'Shawee', weight: 54.3 * 2 },
        { date: '05-11', name: 'Shawee', weight: 54.2 * 2 },
        { date: '05-12', name: 'Shawee', weight: 54.4 * 2 },
        { date: '05-13', name: 'Shawee', weight: 54.1 * 2 },
        { date: '05-14', name: 'Shawee', weight: 54.2 * 2 },
        { date: '05-15', name: 'Shawee', weight: 54.8 * 2 },
        { date: '05-16', name: 'Shawee', weight: 54.4 * 2 },
        { date: '05-17', name: 'Shawee', weight: 53.8 * 2 },
        { date: '05-18', name: 'Shawee', weight: 53.9 * 2 },
        { date: '05-19', name: 'Shawee', weight: 53.7 * 2 },
        { date: '05-20', name: 'Shawee', weight: 53.7 * 2 },
        { date: '05-21', name: 'Shawee', weight: 53.7 * 2 },
        { date: '05-22', name: 'Shawee', weight: 53.8 * 2 },
        { date: '05-23', name: 'Shawee', weight: 53.3 * 2 },
      ],
    },
  }),

  getters: {
    // 获取某个人的所有数据
    getPersonData: (state) => (name) => {
      return state[name.toLowerCase()];
    },

    // 获取某个人的最新体重
    getLatestWeight: (state) => (name) => {
      const data = state[name.toLowerCase()].data;
      return data[data.length - 1].weight;
    },

    // 获取某个人的目标体重
    getGoal: (state) => (name) => {
      return state[name.toLowerCase()].goal;
    },

    // 获取某个人的体重变化数据（用于热力图）
    getWeightChanges: (state) => (name) => {
      const data = state[name.toLowerCase()].data;
      return data.map((item, index) => {
        if (index === 0) return { ...item, value: 0 };
        const change = item.weight - data[index - 1].weight;
        return {
          date: item.date,
          type: '体重变化',
          value: change,
        };
      });
    },
  },

  actions: {
    // 添加新的体重记录
    addWeightRecord(name, date, weight) {
      const person = this[name.toLowerCase()];
      if (person) {
        person.data.push({ date, name, weight });
      }
    },

    // 更新目标体重
    updateGoal(name, newGoal) {
      const person = this[name.toLowerCase()];
      if (person) {
        person.goal = newGoal;
      }
    },
  },
});
