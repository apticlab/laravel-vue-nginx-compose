import filters from '@/utils/filters';

export default {
  namespaced: true,
  state: {
    start_time: null,
    stop_time: null,
    post_num: null,
    story_num: null,
    last_updated: null,
    updated_at: null,
  },
  mutations: {
    set_post_num(state, post_num) {
      state.post_num = post_num;
    },
    set_story_num(state, story_num) {
      state.story_num = story_num;
    },
    set_interval(state, { start_time, stop_time }) {
      state.start_time = start_time;
      state.stop_time = stop_time;
    },
    set_last_updated(state, last_updated) {
      state.last_updated = last_updated;
    },
    reset_state(state) {
      Object.keys(state).forEach((value) => {
        state[value] = null;
      });
    },
    set_page_info(state, info) {
      state.start_time = info.start_time || null;
      state.stop_time = info.stop_time || null;
      state.updated_at = info.updated_at || null;
      state.post_num = info.post_num || null;
      state.story_num = info.story_num || null;
      state.last_updated = info.last_updated || null;
    },
  },
  actions: {},
  getters: {
    reference_period: (state) => {
      if (!state.stop_time || !state.start_time) {
        return null;
      }

      let start = filters.date_unix(state.start_time);
      let end = filters.date_unix(state.stop_time);
      return end.diff(start, 'days');
    },
  },
};
