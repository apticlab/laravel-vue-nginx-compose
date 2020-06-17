import { stories_service } from '../services/stories.service.js';

export default {
  namespaced: true,
  state: {
    insights: null,
    last_stories: null,
    engagement_details: null,
    user_tag_engagement: null,
    hashtag_engagement: null,
    imagetag_engagement: null,
    reports: null,
    loading: null,
    start_time: null,
    stop_time: null,
  },
  mutations: {
    set_stories(state, data) {
      state.stories = data.stories;
      state.insights = data.insights;
      state.engagement = data.engagement;
      state.reports = data.view_viewers_ratio;
      state.story_interaction_engagement = data.story_engagement;
      state.user_tag_engagement = data.user_tag_engagement;
      state.hashtag_engagement = data.hashtag_engagement;
      state.location_engagement = data.location_engagement;
      state.last_updated = data.last_updated;
      state.start_time = data.start_time;
      state.stop_time = data.stop_time;
    },
  },
  actions: {
    async get_stories({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      let { data, info } = await stories_service.get_stories();
      commit('set_stories', data);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {},
};
