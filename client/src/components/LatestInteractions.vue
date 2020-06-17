<template>
  <div class="flex flex-col">
    <section-title title="Latest interaction" />
    <div class="flex-cont-row hf-1">
      <div class="flex-1 b-b-primary-600 b-b-width-2 hf-1"></div>
      <div class="flex-8 b-b-grey-500 b-b-width-1 hf-1"></div>
    </div>
    <latest-followers></latest-followers>
    <div class="flex flex-col md:flex-row">
      <latest-notifications></latest-notifications>
      <popular-tagged-posts></popular-tagged-posts>
    </div>
  </div>
</template>

<script>
import LatestNotifications from "@/components/LatestNotifications.vue";
import PopularTaggedPosts from "@/components/PopularTaggedPosts.vue";
import LatestFollowers from "@/components/LatestFollowers.vue";

export default {
  name: "latest-interactions",
  components: {
    "latest-notifications": LatestNotifications,
    "popular-tagged-posts": PopularTaggedPosts,
    "latest-followers": LatestFollowers
  }
};
</script>

<style>
.interaction-title {
  font-weight: bold;
  font-size: 0.85rem;
}

.justify-content-evenly {
  justify-content: space-evenly;
}
</style>
