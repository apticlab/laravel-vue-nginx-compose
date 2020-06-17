import { users_service } from "../services/users.service.js";
import { api } from "../utils/api.js";

export default {
  namespaced: true,
  state: {
    users: null,
    roles: null,
    accounts: null
  },
  mutations: {
    set_users(state, users) {
      state.users = users;
    },
    set_roles(state, roles) {
      state.roles = roles;
    },
    set_accounts(state, accounts) {
      state.accounts = accounts;
    }
  },
  actions: {
    async get_users({ commit }) {
      commit("set_users", await users_service.get_users());
    },
    async get_roles({ commit }) {
      commit("set_roles", await users_service.get_roles());
    },
    async get_accounts({ commit }) {
      commit("set_accounts", await api.list("accounts"));
    },
    async get_user(context, user_id) {
      return await users_service.get_user(user_id);
    }
  },
  getters: {}
};
