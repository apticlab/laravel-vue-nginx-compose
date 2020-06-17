<template>
  <div class="bg-white shadow rounded overflow-hidden">
    <div class="w-full h-48 rounded-t object-cover bg-gray-300">
      <blr-image
        :src="post_image ? post_image : ''"
        :src-placeholder="post_image_placeholder"
      />
    </div>

    <div class="p-2 pl-4 text-gray-400 text-xs">
      {{ post.inserted_at | time_ago | on_empty(".") }}
    </div>

    <div class="grid grid-cols-2 col-gap-10 pb-2 flex items-center">
      <div
        v-for="info in filtered_info"
        :key="info.id"
        class="flex flex-row mx-3 my-1"
      >
        <div
          class="flex flex-row items-center justify-center px-2"
          :title="info.title"
        >
          <i :class="info.icon" class="text-center text-indigo-400"></i>
          <span class="pl-2 text-gray-700">
            {{ deepPick(post, info.field) | size_number }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex bg-indigo-100 h-10 items-center justify-center text-indigo-500"
    >
      <a
        :href="post.ig_link ? ig_url + post.ig_link.url : '#'"
        target="_blank"
        class="hover:underline cursor-pointer"
        >{{ post.ig_link.name | translate }}</a
      >
      <i class="hi hi-cheveron-right"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "post",
  props: {
    post_info: { required: false, default: null },
    post: { required: true, default: null }
  },
  data() {
    return {
      default_info: [
        {
          id: "like",
          field: "counts.likes",
          icon: "hi hi-heart",
          title: "Like"
        },
        {
          id: "comment",
          field: "insights.impressions.comments",
          icon: "hi hi-comment",
          title: "Commenti"
        },
        {
          id: "post_share",
          field: "insights.share_count",
          icon: "hi hi-group",
          title: "Condivisioni"
        },
        {
          id: "link_share",
          field: "insights.link_count",
          icon: "hi hi-announcement",
          title: "Condivisioni Link"
        },
        {
          id: "profile_views",
          field: "insights.profile_views",
          icon: "hi hi-view",
          title: "Visite Profilo"
        },
        {
          id: "impressions",
          field: "insights.impressions.count",
          icon: "hi hi-external-link",
          title: "Impression"
        },
        {
          id: "reach",
          field: "insights.reach.count",
          icon: "hi hi-mobile",
          title: "Reach"
        },
        {
          id: "hashtag",
          field: "insights.impressions.hashtag",
          icon: "hi hi-bookmark",
          title: "Hashtag"
        }
      ],
      ig_url: "https://instagram.com/p/"
    };
  },
  methods: {},
  computed: {
    post_image() {
      return `${this.ig_url}${this.post.ig_link.url}/media/?size=m`;
    },
    post_image_placeholder() {
      return `${this.ig_url}${this.post.ig_link.url}/media/?size=t`;
    },
    filtered_info() {
      if (!this.post_info) return this.default_info;

      const default_keys = this.default_info.map(info => info.id);

      return this.default_info.filter(d_info => {
        return this.post_info.some(p_info => p_info == d_info.id);
      });
    }
  }
};
</script>

<style></style>
