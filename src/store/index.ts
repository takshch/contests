import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const baseURL = '/mockapi';

const loadingContainer = (state) => async (func, ...args) => {
  try {
    state.commit('setLoadingStatus', true);
    await func(...args);
  } catch (e) {
    console.error(e);
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
      state.errorMessage = p;
    },
  },
  actions: {
    async setScoreboard(state) {
      loadingContainer(state)(async () => {
        const scoreboard = await axios.get(`${baseURL}/scoreboard.json`);
        state.commit('setScoreboard', scoreboard.data);
      });
    },
    async setSubmission(state, { id }) {
      loadingContainer(state)(async () => {
        const submission = await axios.get(`${baseURL}/submissions/${id}.json`);
        console.log(submission);
        state.commit('setSubmission', submission.data);
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
