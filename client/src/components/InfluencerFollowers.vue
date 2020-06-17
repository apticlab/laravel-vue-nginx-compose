<template>
  <div v-if="!loading">
    <section-title title="Influencer" />
    <insights-set :insights="Object.values(insights)" theme="green" />
    <awesome-table
      class="my-5"
      :rows="influencer_followers"
      :headers="headers"
      :actions="actions"
      title="Influencer"
    />
  </div>
</template>
<script>
import { activities as headers } from "@/services/headers";

import { mapState, mapActions } from "vuex";
export default {
  computed: {
    headers() {
      return headers.influencer_followers.headers;
    },
    actions() {
      return headers.influencer_followers.actions;
    },
    ...mapState("activities", {
      loading: state => state.loading,
      influencer_followers: state => state.rankings.is_medium || []
    }),
    insights() {
      let likes = 0;
      let comment = 0;
      let view = 0;
      let play = 0;

      this.influencer_followers.forEach(user => {
        likes += user.like_count;
        comment += user.comment_count;
        view += user.view_count;
        play += user.play_count;
      });

      return {
        like: {
          name: "Like",
          key: "like",
          value: likes
        },
        comment: {
          name: "Commenti",
          key: "comment",
          value: comment
        },
        view: {
          name: "View",
          key: "view",
          value: view
        },
        play: {
          name: "Play",
          key: "play",
          value: play
        }
      };
    }
  }
};
</script>
