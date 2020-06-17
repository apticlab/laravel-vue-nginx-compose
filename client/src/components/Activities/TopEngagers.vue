<template>
  <div v-if="!loading">
    <section-title title="Top Engagers" />
    <awesome-table
      :rows="top_engagers"
      :headers="headers"
      :actions="actions"
      title="Top Engagers"
    ></awesome-table>
  </div>
</template>

<script>
import { activities as headers } from "@/services/headers";

import { mapState, mapActions } from "vuex";
export default {
  methods: {},
  computed: {
    headers() {
      return headers.top_engagers.headers;
    },
    actions() {
      return headers.top_engagers.actions;
    },
    ...mapState("activities", {
      loading: state => state.loading,
      top_engagers: state => state.rankings.total
    })
  }
};
</script>

<style></style>
