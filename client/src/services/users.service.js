import { api } from "../utils/api";

const users_service = {
  async get_users() {
    return await api.list("users");
  },
  async get_user(user_id) {
    return await api.get("users", user_id);
  },
  async get_roles() {
    return await api.list("roles");
  },
  async save_user(user) {
    if (user._id) {
      // edit user
      return await api.update("users", user._id, user);
    } else {
      // create user
      return await api.create("users", user);
    }
  }
};

export { users_service };
