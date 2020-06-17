<template>
  <div
    class="grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-5 md:grid-rows-2 md:gap-3"
  >
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="flex flex-col bg-white flex-grow-3 my-4 shadow-md rounded"
      :class="{}"
    >
      <div
        :class="{
          'border-green-600 text-green-400': section.key == 'new_followers',
          'border-indigo-600 text-indigo-500': section.key == 'new_likers',
          'border-indigo-400 text-indigo-300': section.key == 'new_viewers',
          'border-red-600 text-red-400': section.key == 'lost_followers'
        }"
        class="border-t-4 py-2 px-3 uppercase tracking-wider mb-4 rounded-t"
      >
        {{ section.key | translate }}
      </div>
      <div
        v-for="(follower, index) in latest_interactions[section.field]"
        :key="index"
        class="flex flex-row justify-between flex-initial border-gray-200 border-b items-center py-2"
      >
        <div class="flex flex-row">
          <div class="h-10 w-10 mx-3">
            <img
              class="rounded-full h-full w-full flex flex-row items-center bg-gray-100"
              :src="follower.profile_pic_url"
              alt
            />
          </div>
          <div
            class="text-base text-gray-600 flex flex-row items-center"
            :title="follower.username"
          >
            <a
              class="text-blue-400 hover:text-blue-500"
              :href="ig_url + follower.username"
              target="_blank"
            >
              @{{ follower.username | truncate(20) }}
            </a>
          </div>
        </div>

        <div
          class="flex flex-row text-gray-500 items-center mr-3 font-normal justify-end"
        >
          {{ follower.counts | number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "latest-followers",
  data: () => ({
    sections: [
      {
        key: "new_followers",
        field: "followers",
        name: "New Followers"
      },
      {
        key: "new_likers",
        name: "New Likers",
        field: "media_likers"
      },
      {
        key: "new_viewers",
        name: "New Viewers",
        field: "media_comments"
      },
      {
        key: "lost_followers",
        name: "Lost Followers",
        field: "lost_followers"
      }
    ],
    ig_url: "https://instagram.com/"
  }),
  async beforeMount() {},
  methods: {
    formatSectionName(name) {
      return name.replace("_", " ");
    }
  },
  computed: {
    ...mapState("dashboard", {
      latest_interactions: state => state.latest_interactions
    })
  }
};
</script>
