import { api } from "../utils/api";

const stories_service = {
  async get_stories() {
    return await api.list("stories");
  }
};

export { stories_service };
