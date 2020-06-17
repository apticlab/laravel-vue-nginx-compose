import { api } from "../utils/api";

export default {
  namespaced: true,
  state: {
    cronjobs: null,
    jobs: null
  },
  mutations: {
    set_cronjobs(state, cronjobs) {
      state.cronjobs = cronjobs;
    },
    set_jobs(state, jobs) {
      state.jobs = jobs;
    }
  },
  actions: {
    async get_cronjobs({ commit }) {
      let cronjobs = await api.list("cronjobs");
      commit("set_cronjobs", cronjobs);
    },
    async get_jobs({ commit }) {
      let jobs = await api.list("jobs");
      commit("set_jobs", jobs);
    }
  },
  getters: {}
};
