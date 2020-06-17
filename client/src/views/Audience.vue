<template>
  <div>
    <loading v-if="isLoading"></loading>
    <template v-if="!isLoading">
      <audience-stats></audience-stats>
      <age-distribution></age-distribution>
      <gender-distribution></gender-distribution>
      <geo-distribution></geo-distribution>
    </template>
  </div>
</template>
<script>
import AudienceStats from "@/components/Audience/AudienceStats";
import AgeDistribution from "@/components/Audience/AgeDistribution";
import GenderDistribution from "@/components/Audience/GenderDistribution";
import GeoDistribution from "@/components/Audience/GeoDistribution";
import AccountChange from "@/mixin/account-change.mixin.js";
import { mapState, mapActions } from "vuex";
import filters from "@/utils/filters";

export default {
  components: {
    "audience-stats": AudienceStats,
    "age-distribution": AgeDistribution,
    "gender-distribution": GenderDistribution,
    "geo-distribution": GeoDistribution
  },
  mixins: [AccountChange],
  data() {
    return {
      isLoading: true,
      diff: null
    };
  },
  async beforeMount() {
    this.isLoading = true;

    await this.get_audience();
    this.listenForAccountChange(async () => {
      this.isLoading = true;
      await this.get_audience();
      this.isLoading = false;
    });

    this.isLoading = false;
  },
  beforeDestroy() {
    // this.destroyEvent(this.get_audience);
  },
  mounted() {},
  methods: {
    ...mapActions("audience", ["get_audience"])
  },
  computed: {}
};
</script>
