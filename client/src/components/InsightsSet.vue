<template>
  <div
    :class="[`lg:grid-cols-${grid}`, `sm:grid-cols-${grid}`]"
    class="grid  lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4"
    v-if="insights"
  >
    <insight-card
      v-for="(insight, index) in insights"
      :key="insight.id"
      :insight="insight"
      :theme='theme'
      :theming="getInsightCardTheme(index)"
    />
  </div>
</template>

<script>
import InsightCard from "@/components/InsightCard";
export default {
  name: "insights-set",
  components: {
    "insight-card": InsightCard
  },
  props: {
    grid: { required: false, default: 4 },
    insights: { required: true, default: [] },
    theme: { required: false, default: "blue" }
  },
  methods: {
    getInsightCardTheme(index) {
      let key_color = `text-${this.theme}-${700 - 100 * index}`;
      let key_theme = `${this.theme}-${700 - 100 * index}`

      return {
        theme: key_theme,
        name: key_color,
        icon: `text-${this.theme}-200`,
        trend: {
          text: `text-green-600`,
          bg: `bg-green-200`
        },
        bg: 'bg-white'
      };
    },
  },
};
</script>

<style></style>
