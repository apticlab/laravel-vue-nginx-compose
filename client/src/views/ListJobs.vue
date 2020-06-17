<template>
  <div class="flex flex-col flex-grow">
    <transition name="slide-fade">
      <div class="py-3 w-full" v-if="!isLoading">
        <awesome-table
          :headers="headers"
          :actions="actions"
          :rows="jobs"
          @act="actOnRow"
        ></awesome-table>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading" class="flex-grow w-full h-64"></loading>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { jobs } from "@/services/headers";

export default {
  name: "ListJobs",
  props: {},
  data() {
    return {
      isLoading: true,
      actions: jobs.actions,
      headers: jobs.headers
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.get_jobs();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("jobs", ["get_jobs"]),
    actOnRow(action, row) {}
  },
  computed: {
    ...mapState("jobs", {
      jobs: state => state.jobs
    })
  }
};
</script>
