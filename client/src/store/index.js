import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import dashboard from "./dashboard.store";
import users from "./users.store";
import user from "./user.store";
import activities from "./activities.store";
import post from "./post.store";
import stories from "./stories.store";
import received_tag from "./received_tag.store";
import audience from "./audience.store";
import jobs from "./jobs.store";
import page_info from "./page_info.store";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dashboard,
    user,
    users,
    activities,
    post,
    stories,
    received_tag,
    audience,
    jobs,
    page_info
  }
});
