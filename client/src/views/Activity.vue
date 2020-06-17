<template>
  <div>
    <loading v-if="isLoading"></loading>
    <template v-if="!isLoading">
      <tabs-kpi></tabs-kpi>
      <profile-action-per-day></profile-action-per-day>
      <engagers-ranking></engagers-ranking>
      <top-engagers class="my-4"></top-engagers>
      <verified-followers class="my-4" />
      <big-account-followers class="my-4" />
      <influencer-followers class="my-4"></influencer-followers>
    </template>
  </div>
</template>
<script>
import TopEngagers from "@/components/Activities/TopEngagers.vue";
import VerifiedFollowers from "@/components/Activities/VerifiedFollowers.vue";
import BigAccount from "@/components/Activities/BigAccount.vue";
import TabsKpi from "@/components/Activities/TabsKpi.vue";
import ProfileActionPerDay from "@/components/Activities/ProfileActionPerDay.vue";
import EngagersRanking from "@/components/Activities/EngagersRanking.vue";
import InfluencerFollowers from "@/components/InfluencerFollowers.vue";
import AccountChange from "@/mixin/account-change.mixin.js";
import filters from "@/utils/filters";

import { mapActions, mapState } from "vuex";

export default {
  name: "activity",
  props: {},
  mixins: [AccountChange],
  components: {
    "top-engagers": TopEngagers,
    "verified-followers": VerifiedFollowers,
    "big-account-followers": BigAccount,
    "influencer-followers": InfluencerFollowers,
    "tabs-kpi": TabsKpi,
    "profile-action-per-day": ProfileActionPerDay,
    "engagers-ranking": EngagersRanking
  },
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  async beforeMount() {
    this.isLoading = true;
    this.error = null;

    await this.get_activities();

    this.listenForAccountChange(async () => {
      this.isLoading = true;
      await this.get_activities();
      this.isLoading = false;
    });

    this.isLoading = false;
  },
  beforeDestroy() {
    // this.destroyEvent(this.get_activities);
  },
  mounted() {},
  methods: {
    ...mapActions("activities", ["get_activities"])
  },
  computed: {}
};
</script>
