import { api } from "../utils/api";

const audience_service = {
  async get_audience() {
    return await api.list("public");
  }
};

export { audience_service };
