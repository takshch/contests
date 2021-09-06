import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const baseURL = 'http://localhost:3000';

const loadingContainer = (state) => async (func, ...args) => {
  try {
    state.commit('setLoadingStatus', true);
    await func(...args);
  } catch (e) {
    state.commit('setErrorMessage', e);
  } finally {
    state.commit('setLoadingStatus', false);
  }
};

export default new Vuex.Store({
  state: {
    scoreboard: {},
    loadingStatus: false,
    subsmissions: {},
    errorMessage: '',
  },
  mutations: {
    setScoreboard(state, payload) {
      state.scoreboard = payload;
    },
    setSubmission(state, payload) {
      const { id } = payload;
      Vue.set(state.subsmissions, id, payload);
    },
    setLoadingStatus(state, payload) {
      state.loadingStatus = payload;
    },
    setErrorMessage(state, payload) {
      const p = payload.toString();
      let errorMessage;
      if (p && p.toLowerCase().includes('failed to fetch')) {
        errorMessage = 'Error: Failed to fetch';
      }
      state.errorMessage = errorMessage;
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
        const res = await fetch(`${baseURL}/submission/${id}`);
        const submission = await res.json();
        state.commit('setSubmission', submission);
      });
    },
  },
  getters: {
    getScoreboard: (state) => state.scoreboard,
    getLoadingStatus: (state) => state.loadingStatus,
    getSubmission: (state) => (id: string | number) => state.subsmissions[id],
    getErrorMessage: (state) => state.errorMessage,
  },
  modules: {},
});
