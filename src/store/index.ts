import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scoreboard: {},
    loadingStatus: false,
  },
  mutations: {
    setScoreboard(state, payload) {
      state.scoreboard = payload;
    },
    setLoadingStatus(state, payload) {
      state.loadingStatus = payload;
    },
  },
  actions: {
    async setScoreboard(state) {
      state.commit('setLoadingStatus', true);

      const res = await fetch('http://localhost:3000/scoreboard');
      const scoreboard = await res.json();

      state.commit('setScoreboard', scoreboard);
      state.commit('setLoadingStatus', false);
    },
  },
  getters: {
    getScoreboard: (state) => state.scoreboard,
    getLoadingStatus: (state) => state.loadingStatus,
  },
  modules: {
  },
});
