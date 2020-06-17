import { post_service } from '../services/post.service.js';

export default {
  namespaced: true,
  state: {
    media: null,
    popular_media: null,
    media_interaction_engagement: null,
    start_time: null,
    stop_time: null,
  },
  mutations: {
    set_post(state, data) {
      state.media = data.media;
      state.popular_media = data.media.slice(0, 4);
      state.media_engagement = data.engagement;
      state.media_insights = data.insights;
      state.reports = data.like_likers_ratio;
      state.media_interaction_engagement = data.post_engagement;
      state.user_tag_engagement = data.user_tag_engagement;
      state.hashtag_engagement = data.hashtag_engagement;
    },
  },
  actions: {
    async get_post({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      let { data, info } = await post_service.get_posts();
      commit('set_post', data);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {
    splitted_insights: (state) => {
      const insights_as_array = Object.values(state.insights);
      const first_half = insights_as_array.splice(0, Math.ceil(insights_as_array.length / 2));
      return [first_half, insights_as_array];
    },
  },
};
