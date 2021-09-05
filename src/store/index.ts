import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const baseURL = 'http://localhost:3000';

const loadingContainer = (state) => async (Func, ...args) => {
  try {
    state.commit('setLoadingStatus', true);
    await Func(...args);
  } catch (e) {
    console.error(e);
  } finally {
    state.commit('setLoadingStatus', false);
  }
};

export default new Vuex.Store({
  state: {
    scoreboard: {},
    loadingStatus: false,
    subsmissions: {},
  },
  mutations: {
    setScoreboard(state, payload) {
      state.scoreboard = payload;
    },
    setSubmission(state, payload) {
      console.log(payload);
      const { id } = payload;
      Vue.set(state.subsmissions, id, payload);
    },
    setLoadingStatus(state, payload) {
      state.loadingStatus = payload;
      console.log('loadingStatus', state.loadingStatus);
    },
  },
  actions: {
    async setScoreboard(state) {
      loadingContainer(state)(async () => {
        const res = await fetch(`${baseURL}/scoreboard`);
        const scoreboard = await res.json();
        state.commit('setScoreboard', scoreboard);
      });
    },
    async setSubmission(state, { id }) {
      loadingContainer(state)(async () => {
        const res = await fetch(`${baseURL}/submissions/${id}`);
        const submission = await res.json();
        state.commit('setSubmission', submission);
      });
    },
  },
  getters: {
    getScoreboard: (state) => state.scoreboard,
    getLoadingStatus: (state) => state.loadingStatus,
    getSubmission: (state) => (id: string | number) => state.subsmissions[id],
  },
  modules: {},
});
