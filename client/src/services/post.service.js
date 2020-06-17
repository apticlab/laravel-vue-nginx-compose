import { api } from "../utils/api";

const post_service = {
  async get_posts() {
    return await api.list("posts");
  }
};

export { post_service };
