<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-if="!isLoading && tag">
      <div v-if="tag.posts">
        <section-title title="TAG - Post Stats" />
        <insights-set
          :insights="Object.values(tag.posts.insights)"
          theme="blue"
          :grid="Object.values(tag.posts.insights).length"
        ></insights-set>
        <div class="my-6">
          <div class="grid grid-cols-4 gap-4">
            <ig-post
              v-for="(post, index) in tag.posts.top_tagged_posts"
              :key="index"
              :post="post"
              :post_info="['like', 'comment']"
            />
          </div>
        </div>
        <div class="my-6">
          <awesome-table
            :rows="tag.posts.latest_tagged_posts"
            :headers="headers.latest_tag_posts"
            :actions="[]"
            theme="gray"
          ></awesome-table>
        </div>
      </div>
      <div v-if="tag.stories">
        <section-title title="TAG - Story Stats" />
        <div class="my-4">
          <div class="grid grid-cols-4 gap-4">
            <ig-story
              v-for="(stories, index) in tag.stories.top_tag_stories"
              :key="index"
              :story="stories"
            />
          </div>
        </div>
        <div class="my-6">
          <awesome-table
            :rows="tag.stories.latest_tag_stories"
            :headers="headers.latest_tag_stories"
            :actions="[]"
            theme="gray"
          ></awesome-table>
        </div>
      </div>
      <template v-if='hashtag'>
        <div v-if="hashtag.posts">
          <section-title title="HASHTAG - Post Stats" />
          <insights-set :insights="Object.values(hashtag.posts.insights)" theme="teal" />
          <div class="my-6">
            <div class="grid grid-cols-4 gap-4">
              <ig-post
                v-for="(post, index) in hashtag.posts.top_hashtag_posts"
                :key="index"
                :post="post"
              />
            </div>
          </div>

          <div class="my-6">
            <awesome-table
              :rows="hashtag.posts.latest_hashtag_posts"
              :headers="headers.latest_hashtag_posts"
              :actions="[]"
              theme="gray"
            ></awesome-table>
          </div>
        </div>
        <div v-if="hashtag.stories">
          <section-title title="HASHTAG - Story Stats" />
          <div class="my-4">
            <div class="grid grid-cols-4 gap-4">
              <ig-story
                v-for="(stories, index) in hashtag.stories.top_hashtag_stories"
                :key="index"
                :story="stories"
              />
            </div>
          </div>

          <div class="my-6">
            <awesome-table
              :rows="hashtag.stories.latest_hashtag_stories"
              :headers="headers.latest_hashtag_stories"
              :actions="[]"
              theme="gray"
            ></awesome-table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { received_tag as headers } from "@/services/headers";

import { mapActions, mapState } from "vuex";
import InsightsSet from "@/components/InsightsSet.vue";
import Title from "@/components/SectionTitle.vue";
import IgPost from "@/components/Post.vue";
import IgStory from "@/components/Story.vue";
import AccountChange from "@/mixin/account-change.mixin.js";
import filters from "@/utils/filters";

export default {
  name: "received_tag",
  props: {},
  mixins: [AccountChange],
  components: {
    "insights-set": InsightsSet,
    "ig-post": IgPost,
    "ig-story": IgStory,
    "section-title": Title
  },
  data() {
    return {
      isLoading: true,
      isNullTagPost: false,
      isNullTagStories: false
    };
  },
  async beforeMount() {
    this.isLoading = true;

    await this.get_received_tag();
    this.listenForAccountChange(async () => {
      this.isLoading = true;
      await this.get_received_tag();
      this.isLoading = false;
    });

    this.isLoading = false;
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    ...mapActions("received_tag", ["get_received_tag"])
  },
  computed: {
    ...mapState("received_tag", {
      tag: state => state.tag,
      hashtag: state => state.hashtag,
    }),
    headers() {
      return {
        latest_tag_posts: headers.latest_tag_posts.headers,
        latest_tag_stories: headers.latest_tag_stories.headers,
        latest_hashtag_posts: headers.latest_hashtag_posts.headers,
        latest_hashtag_stories: headers.latest_hashtag_stories.headers
      };
    },
    actions() {
      return {
        latest_tag_posts: headers.latest_tag_posts.actions,
        latest_tag_stories: headers.latest_tag_stories.actions,
        latest_hashtag_posts: headers.latest_hashtag_posts.actions,
        latest_hashtag_stories: headers.latest_hashtag_stories.actions
      };
    }
  }
};
</script>
