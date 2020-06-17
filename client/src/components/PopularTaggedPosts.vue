<template>
  <div
    class="flex flex-col md:w-2/3 w-full shadow-md bg-white border-1 border-grey-300 rounded-lg overflow-hidden"
  >
    <div class="flex flex-row h-12 items-center text-gray-600 bg-indigo-100">
      <span
        class="uppercase tracking-wider text-indigo-400 flex flex-row ml-4 items-center h-full"
      >
        {{ page_name | translate }}
      </span>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-4 bg-white flex-wrap p-3">
      <div
        v-for="(post, index) in popular_tagged_posts"
        :key="index"
        class="flex flex-row"
      >
        <div class="w-6/12">
          <a :href="post.code ? ig_url + post.code : '#'" target="_blank">
            <img :src="images[index].low" class="h-48 w-48 mr-3 rounded-md" />
          </a>
        </div>

        <div class="flex flex-col w-6/12 pl-1">
          <a
            target='_blank'
            :href="ig_usr_url + '/' + post.caption.user.username" 
            class="text-base mr-2 text-blue-500 hover:text-blue-600 p-2">
            {{ post.caption.user.username | truncate(20) }}
          </a>

          <div class="text-indigo-500 pl-2">
            {{ post.caption.created_at_utc | date_unix | time_ago }}
          </div>

          <div class="flex flex-row items-center pt-3">
            <span class="hi-heart p-2 text-red-500 text-2xl"></span>
            <span> {{ post.counts.likes }}</span>
          </div>

          <div class="flex flex-row items-center">
            <span class="hi-comment p-2 text-indigo-500 text-2xl"></span>
            <span> {{ post.counts.comments }}</span>
          </div>

          <div class="flex flex-row items-center">
            <span class="hi-video p-2 text-indigo-500 text-2xl"></span>
            <span> {{ post.counts.play || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "popular-tagged-posts",
  data() {
    return {
      page_name: "popular_tagged_post",
      ig_url: "https://instagram.com/p/",
      ig_usr_url: "https://instagram.com"
    };
  },
  async mounted() {},
  methods: {
    follower_interaction_style(followers) {
      if (followers.length > 2) return "justify-content-evenly";
      else "justify-content-start";
    },
    post_image(code) {
      return `${this.ig_url}${code}/media/?size=m`;
    },
    post_image_placeholder(code) {
      return `${this.ig_url}${code}/media/?size=t`;
    }
  },
  computed: {
    ...mapState("dashboard", {
      popular_tagged_posts: state => state.popular_tagged_posts.slice(0, 4)
    }),
    images() {
      let images = [];
      this.popular_tagged_posts.forEach(post => {
        let image = {
          low: this.post_image_placeholder(post.code),
          high: this.post_image(post.code)
        };

        images.push(image);
      });

      return images;
    }
  }
};
</script>

<style>
.grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
</style>
