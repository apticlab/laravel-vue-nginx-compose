import { activities_service } from '../services/activities.service.js';

export default {
  namespaced: true,
  state: {
    history: null,
    engagers: null,
    rankings: null,
    profile_actions: null,
  },
  mutations: {
    set_activities(state, activities) {
      state.history = activities.history;
      state.engagers = activities.engagers;
      state.profile_actions = activities.profile_actions;
      state.rankings = activities.rankings;
    },
  },
  actions: {
    async get_activities({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      let { data, info } = await activities_service.get_activities();
      commit('set_activities', data);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {},
};
