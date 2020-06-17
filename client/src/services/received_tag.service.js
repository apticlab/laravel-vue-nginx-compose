import { api } from "../utils/api";

const received_tag_service = {
  async get_received_tag() {
    return await api.list("received_tag");
  }
};

export { received_tag_service };
