<template>
  <div>
    <transition name="slide-fade">
      <div v-if="!isLoading">
        <div class="flex flex-row items-baseline">
          <button
            @click="$router.back()"
            type="button"
            class="text-gray-600 rounded outline-none hover:text-indigo-600 mr-auto"
          >
            <i class="hi-arrow-left mr-1 text-xs"></i>
            Indietro
          </button>
          <aw-datepicker
            @update="reloadLogs"
            v-model="logDate"
            :maxDate="new Date()"
            opens="left"
          >
            <template v-slot:input="date" style="min-width: 350px;">
              {{ date.startDate | date("LL") }} -
              {{ date.endDate | date("LL") }}
            </template>
          </aw-datepicker>
        </div>
        <hr class="mt-2 mb-4" />
        <div class="flex flex-col">
          <div class="">
            <div v-for="entry in log">
              {{ entry }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>
<script>
import { api } from "../utils/api";

export default {
  name: "ViewLogs",
  props: {},
  data() {
    return {
      isLoading: false,
      log: null,
      logDate: {
        startDate: new Date(),
        endDate: new Date()
      }
    };
  },
  async mounted() {
    await this.getLog();
  },
  methods: {
    async getLog() {
      this.isLoading = true;

      this.log = await api.get("logs", this.log_slug, {
        log_date: this.logDate.startDate
      });

      this.isLoading = false;
    },
    async reloadLogs() {
      await this.getLog();
    }
  },
  computed: {
    log_slug() {
      return this.$route.params.log_slug;
    }
  }
};
</script>
