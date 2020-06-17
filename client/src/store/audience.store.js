import { audience_service } from '../services/audience.service.js';

export default {
  namespaced: true,
  state: {
    stats: null,
    ages: null,
    gender: null,
    geo_distribution: null,
  },
  mutations: {
    set_audience(state, audience_data) {
      state.stats = audience_data.stats;
      state.ages = audience_data.ages;
      state.gender = audience_data.gender;
      state.geo_distribution = audience_data.geo_distribution;
    },
  },
  actions: {
    async get_audience({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      let { data, info } = await audience_service.get_audience();
      commit('set_audience', data);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {},
};
