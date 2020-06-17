<template>
  <div class="mx-4">
    <section-title title="Top last post" />
    <div
      v-if="top_last_posts"
      class="grid lg:grid-cols-5 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:grid-cols-5"
    >
      <ig-post v-for="post in top_last_posts" :key="post.id" :post="post">
      </ig-post>
    </div>
    <p class="tracking-wider text-gray-600 text-center" v-else>
      Nessun post trovato per l'intervallo temporale scelto
    </p>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import IgPost from "@/components/Post.vue";

export default {
  name: "top-last-posts",
  components: {
    "ig-post": IgPost
  },
  data: () => ({}),
  methods: {},
  computed: {
    ...mapState("dashboard", {
      top_last_posts: state => state.top_last_posts
    })
  }
};
</script>
