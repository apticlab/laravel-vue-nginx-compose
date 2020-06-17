import { received_tag_service } from '../services/received_tag.service.js';

export default {
  namespaced: true,
  state: {
    tag: null,
    hashtag: null,
  },
  mutations: {
    set_received_tag(state, data) {
      state.tag = data.tag;
      state.hashtag = data.hashtag;
    },
  },
  actions: {
    async get_received_tag({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      let { data, info } = await received_tag_service.get_received_tag();
      commit('set_received_tag', data);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {},
};
