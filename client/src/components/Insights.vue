<template>
  <insights-set :insights="insights" grid="5" />
</template>
<script>
import { mapState, mapActions } from "vuex";
import InsightsSet from "@/components/InsightsSet";
export default {
  name: "insights",
  components: {
    "insights-set": InsightsSet
  },
  async mounted() {},
  methods: {},
  computed: {
    ...mapState("dashboard", {
      insights: state => state.insights
    })
  }
};
</script>
