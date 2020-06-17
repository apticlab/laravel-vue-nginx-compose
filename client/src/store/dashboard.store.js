import { dashboard_service } from '@/services/dashboard.service.js';

export default {
  namespaced: true,
  state: {
    insights: null,
    top_last_posts: null,
    latest_interactions: null,
    latest_notifications: null,
    popular_tagged_posts: null,
    top_engagers: null,
    last_updated: null,
    start_time: null,
    stop_time: null,
  },
  mutations: {
    set_insights(state, insights) {
      state.insights = insights;
    },
    set_top_last_posts(state, top_last_posts) {
      state.top_last_posts = top_last_posts;
    },
    set_latest_interactions(state, latest_interactions) {
      state.latest_interactions = latest_interactions;
    },
    set_latest_notifications(state, latest_notifications) {
      state.latest_notifications = latest_notifications;
    },
    set_popular_tagged_posts(state, popular_tagged_posts) {
      state.popular_tagged_posts = popular_tagged_posts;
    },
    set_top_engagers(state, top_engagers) {
      state.top_engagers = top_engagers;
    },
  },
  actions: {
    async get_dashboard({ commit }) {
      commit('page_info/reset_state', null, { root: true });

      const { data, info } = await dashboard_service.get_dashboard();
      commit('set_insights', data.insights);
      commit('set_top_last_posts', data.popular_posts);
      commit('set_latest_interactions', data.followers);
      commit('set_latest_notifications', data.inbox);
      commit('set_popular_tagged_posts', data.popular_posts_with_you);
      commit('set_top_engagers', data.ranking);

      commit('page_info/set_page_info', info, { root: true });
    },
  },
  getters: {},
};
