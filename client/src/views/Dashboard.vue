<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import filters from "@/utils/filters";
import AccountChange from "@/mixin/account-change.mixin.js";

export default {
  name: "dashboard",
  mixins: [AccountChange],
  data() {
    return {
      error: null,
      isLoading: true
    };
  },
  async beforeMount() {},
  beforeDestroy() {},
  methods: {
    ...mapActions("dashboard", ["get_dashboard"])
  },
  computed: {}
};
</script>

<style></style>
