<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-if="!isLoading">
      <insights-set :insights="media_insights" theme="blue" />
      <div
        class="my-4 grid lg:grid-cols-4 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:grid-cols-4"
      >
        <ig-post
          v-for="(post, index) in popular_media"
          :key="index"
          :post="post"
        />
      </div>
      <insights-set :insights="media_engagement" theme="teal" />
      <div class="my-4">
        <section-title title="Ultimi Post" :v="0" />
        <awesome-table
          :rows="media.slice(0, 9)"
          :headers="headers.last_post"
          :actions="actions"
          theme="gray"
        ></awesome-table>
      </div>
      <div v-if="isNull" class="my-4">
        <section-title title="Dettaglio Engagment" />
        <engagement-detail
          :sets="engagementSets"
          :data="media_interaction_engagement"
        ></engagement-detail>
      </div>
      <div class="my-4">
        <section-title title="Rapporto Like/Likers" />
        <awesome-table
          :headers="headers.reports.headers"
          :rows="reports"
          theme="gray"
          :actions="[]"
        >
        </awesome-table>
      </div>
      <div class="my-4">
        <section-title title="User Tag Engagment" />
        <awesome-table
          :rows="user_tag_engagement"
          :headers="headers.user_tag_engagement"
          :actions="actions"
          theme="gray"
        ></awesome-table>
      </div>
      <div class="my-4">
        <section-title title="Hashtag Engagment" />
        <awesome-table
          :rows="hashtag_engagement"
          :headers="headers.hashtag_engagement"
          :actions="actions"
          theme="gray"
        ></awesome-table>
      </div>
    </div>
  </div>
</template>
<script>
import { post as headers } from "@/services/headers";

import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import InsightsSet from "@/components/InsightsSet.vue";
import Title from "@/components/SectionTitle.vue";
import IgPost from "@/components/Post.vue";
import AccountChange from "@/mixin/account-change.mixin.js";
import filters  from "@/utils/filters";

export default {
  name: "post",
  props: {},
  mixins: [AccountChange],
  components: {
    "insights-set": InsightsSet,
    "section-title": Title,
    "ig-post": IgPost
  },
  data() {
    return {
      isLoading: true,
      isNull: false,
      engagementSets: {
        comment: [
          {
            label: "Follower",
            color: "green-500",
            field: "comment_followers"
          },
          {
            label: "Non Follower",
            color: "blue-500",
            field: "comment_not_followers"
          }
        ],
        like: [
          {
            label: "Follower",
            color: "green-500",
            field: "likers_followers"
          },
          {
            label: "Non Follower",
            color: "blue-500",
            field: "likers_not_followers"
          }
        ]
      }
    };
  },
  async beforeMount() {
    this.isLoading = true;

    await this.get_post();
    
    this.listenForAccountChange(async () => {
      this.isLoading = true;
      await this.get_post();
      this.isLoading = false;
    });

    this.isLoading = false;
  },
  beforeDestroy() {
    this.destroyEvent(this.get_post);
  },
  mounted() {},
  methods: {
    ...mapActions("post", ["get_post"]),
    ...mapMutations("page_info", ["reset_state"]),
    engagementLabels(setName) {
      return this.engagementSets[setName].map(set => set.label);
    },
    engagementData(setName) {
      if(this.media_interaction_engagement != null) {
        this.isNull = false
      } else {
        this.isNull = true
      }
      return [
        {
          visible: true,
          colors: this.engagementSets[setName].map(set =>
            this.getColor(set.color)
          ),
          data: this.engagementSets[setName].map(
            set => this.media_interaction_engagement[set.field]
          )
        }
      ];
    }
  },
  computed: {
    ...mapGetters("post", ["splitted_insights"]),
    ...mapState("post", {
      media: state => state.media,
      popular_media: state => state.popular_media,
      media_insights: state => state.media_insights,
      media_engagement: state => state.media_engagement,
      reports: state => state.reports,
      media_interaction_engagement: state => state.media_interaction_engagement,
      user_tag_engagement: state => state.user_tag_engagement,
      hashtag_engagement: state => state.hashtag_engagement,
    }),
    headers() {
      return {
        hashtag_engagement: headers.hashtag_engagement.headers,
        last_post: headers.last_post.headers,
        user_tag_engagement: headers.user_tag_engagement.headers,
        imagetag_engagement: headers.imagetag_engagement.headers,
        reports: headers.reports
      };
    },
    actions() {
      return {
        hashtag_engagement: headers.hashtag_engagement.actions,
        imagetag_engagement: headers.imagetag_engagement.actions,
        last_post: headers.last_post.actions,
        user_tag_engagement: headers.user_tag_engagement.actions,
        reports: headers.reports.actions
      };
    }
  }
};
</script>
