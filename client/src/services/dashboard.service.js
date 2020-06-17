import { api } from "../utils/api";

const dashboard_service = {
  async get_dashboard() {
    return await api.list("dashboard");
  }
};

export { dashboard_service };
