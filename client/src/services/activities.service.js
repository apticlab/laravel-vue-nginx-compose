import { api } from "../utils/api";

const activities_service = {
  async get_activities() {
    return await api.list("activities");
  }
};

export { activities_service };
