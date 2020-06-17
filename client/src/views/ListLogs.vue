<template>
  <div class="flex flex-col flex-grow">
    <transition name="slide-fade">
      <div class="py-3 w-full" v-if="!isLoading">
        <div class="flex grid grid-cols-3 gap-5 flex-row items-baseline mb-3">
          <div
            :key="index"
            v-for="(log, index) in logs"
            @click="goToLog(log)"
            class="bg-white rounded border-b border-gray-200 flex flex-row items-center justify-center mb-2 px-4 py-3 cursor-pointer hover:bg-indigo-500 hover:text-white transition-all"
          >
            {{ log }}
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading" class="flex-grow w-full h-64"></loading>
    </transition>
  </div>
</template>
<script>
import { api } from "../utils/api";

export default {
  name: "ListLogs",
  props: {},
  data() {
    return {
      isLoading: true,
      logs: []
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.get_logs();
    this.isLoading = false;
  },
  methods: {
    async get_logs() {
      this.isLoading = true;
      this.logs = await api.list("logs");
      this.isLoading = false;
    },
    goToLog(log) {
      this.$router.push({
        name: "view_logs",
        params: {
          log_slug: log
        }
      });
    }
  },
  computed: {}
};
</script>
