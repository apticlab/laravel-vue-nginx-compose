<template>
  <div v-if="!loading">
    <section-title title="Big Account" />
    <insights-set :insights="Object.values(insights)" theme="teal" />
    <awesome-table
      class="my-5"
      :rows="big_account_followers"
      :headers="headers"
      :actions="actions"
      title="Big Account"
    />
  </div>
</template>

<script>
import { activities as headers } from "@/services/headers";

import { mapState, mapActions } from "vuex";
export default {
  computed: {
    headers() {
      return headers.big_account_followers.headers;
    },
    actions() {
      return headers.big_account_followers.actions;
    },
    ...mapState("activities", {
      loading: state => state.loading,
      big_account_followers: state => state.rankings.is_big || []
    }),
    insights() {
      let likes = 0;
      let comment = 0;
      let view = 0;
      let play = 0;

      this.big_account_followers.forEach(user => {
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

<style></style>
