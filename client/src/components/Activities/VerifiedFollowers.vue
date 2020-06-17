<template>
  <div v-if="!loading">
    <section-title title="Account Verificati" />
    <insights-set :insights="Object.values(insights)" theme="green" />
    <awesome-table
      class="my-5"
      :rows="verified_followers"
      :headers="headers"
      :actions="actions"
    ></awesome-table>
  </div>
</template>

<script>
import { activities as headers } from "@/services/headers";
import InsightsSet from "@/components/InsightsSet.vue";

import { mapState, mapActions } from "vuex";
export default {
  components: {
    "insights-set": InsightsSet
  },
  computed: {
    headers() {
      return headers.verified_followers.headers;
    },
    actions() {
      return headers.verified_followers.actions;
    },
    ...mapState("activities", {
      loading: state => state.loading,
      verified_followers: state => state.rankings.is_verified
    }),
    insights() {
      let likes = 0;
      let comment = 0;
      let view = 0;
      let play = 0;

      if (this.verified_followers) {
        this.verified_followers.forEach(user => {
          likes += user.like_count;
          comment += user.comment_count;
          view += user.view_count;
          play += user.play_count;
        });
      }

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

<style></style>
