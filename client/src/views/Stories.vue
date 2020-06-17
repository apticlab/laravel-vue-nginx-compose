<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-if="!isLoading">
      <insights-set class="my-3" :insights="insights" theme="blue" grid="5" />
      <insights-set class="my-3" :insights="engagement" theme="teal" />
      <div class="my-4">
        <section-title title="Ultime Storie" />
        <awesome-table
          :rows="stories.slice(0, 9)"
          :headers="headers.stories"
          :actions="actions"
          theme="gray"
        >
        </awesome-table>
      </div>
      <div class="my-4">
        <section-title title="Rapporto View/Viewers" />
        <awesome-table
          :headers="headers.reports.headers"
          :rows="reports"
          theme="gray"
          :actions="[]"
        >
        </awesome-table>
      </div>
      <div v-if="isNull" class="my-4">
        <section-title title="Dettaglio Engagment" />
        <engagement-detail
          :sets="engagementSets"
          :data="story_interaction_engagement"
          :grid='false'
        >
        </engagement-detail>
      </div>
      <div class="my-4">
        <section-title title="Dettaglio Engagment per Menzioni" />
        <awesome-table
          :rows="user_tag_engagement"
          :headers="headers.user_tag_engagement"
          :actions="actions"
          theme="gray"
        >
        </awesome-table>
      </div>
      <div class="my-4">
        <section-title title="Dettaglio Engagment per Hashtag" />
        <awesome-table
          :rows="hashtag_engagement"
          :headers="headers.hashtag_engagement"
          :actions="actions"
          theme="gray"
        >
        </awesome-table>
      </div>
      <div class="my-4">
        <section-title title="Dettaglio Engagment per Location" />
        <awesome-table
          :rows="location_engagement"
          :headers="headers.location_engagement"
          :actions="actions"
          theme="gray"
        >
        </awesome-table>
      </div>
    </div>
  </div>
</template>
<script>
import { stories as headers } from "@/services/headers";

import { mapActions, mapState } from "vuex";
import InsightsSet from "@/components/InsightsSet.vue";
import Title from "@/components/SectionTitle.vue";
import AccountChange from "@/mixin/account-change.mixin.js";
import filters  from "@/utils/filters";

export default {
  name: "stories",
  props: {},
  mixins:[AccountChange],
  components: {
    "insights-set": InsightsSet,
    "section-title": Title
  },
  data() {
    return {
      isLoading: true,
      isNull: false,
      diff: null,
      engagementSets: {
        view: [
          {
            label: "Follower",
            color: "green-500",
            field: "viewers_followers"
          },
          {
            label: "Non Follower",
            color: "blue-500",
            field: "viewers_not_followers"
          }
        ],
        play: [
          {
            label: "Follower",
            color: "green-500",
            field: "players_followers"
          },
          {
            label: "Non Follower",
            color: "blue-500",
            field: "players_not_followers"
          }
        ]
      }
    };
  },
  async beforeMount() {
    if(this.story_interaction_engagement != null) {
      this.isNull = true
    } else {
      this.isNull = false
    }
    this.isLoading = true;

    await this.get_stories();
    this.listenForAccountChange(async () => {
      this.isLoading = true;
      await this.get_stories();
      this.isLoading = false;
    });

    this.isLoading = false;
  },
  beforeDestroy() {
    this.destroyEvent(this.get_stories);
  },
  mounted() {},
  methods: {
    ...mapActions("stories", ["get_stories"])
  },
  computed: {
    ...mapState("stories", {
      insights: state => state.insights,
      engagement: state => state.engagement,
      stories: state => state.stories,
      reports: state => state.reports,
      story_interaction_engagement: state => state.story_interaction_engagement,
      user_tag_engagement: state => state.user_tag_engagement,
      hashtag_engagement: state => state.hashtag_engagement,
      location_engagement: state => state.location_engagement,
    }),
    headers() {
      return {
        hashtag_engagement: headers.hashtag_engagement.headers,
        location_engagement: headers.location_engagement.headers,
        user_tag_engagement: headers.user_tag_engagement.headers,
        stories: headers.stories.headers,
        reports: headers.reports
      };
    },
    actions() {
      return {
        hashtag_engagement: headers.hashtag_engagement.actions,
        location_engagement: headers.location_engagement.actions,
        user_tag_engagement: headers.user_tag_engagement.actions,
        last_stories: headers.stories.actions
      };
    }
  }
};
</script>
