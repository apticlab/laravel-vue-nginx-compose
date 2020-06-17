<template lang="html">
  <section class="">
    <section-title title="Statistiche Pubblico"></section-title>
    <insights-set v-if="isNull" :insights="stats" theme="blue" :grid="stats.length" />
  </section>
</template>
<script>
import InsightsSet from "@/components/InsightsSet.vue";
import { mapState } from "vuex";

export default {
  name: "audience-stats",
  props: [],
  components: {
    "insights-set": InsightsSet
  },
  mounted() {
    if(this.stats == null) {
      this.isNull = false
    } else {
      this.isNull = true
    }
  },
  data() {
    return {
      isNull: false
    };
  },
  methods: {},
  computed: {
    ...mapState("audience", {
      stats: state => state.stats
    })
  }
};
</script>
