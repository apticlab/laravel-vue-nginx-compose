<template>
  <div>
    <section-title title="Top engagers" translation="top_engagers" />
    <div
      class="grid lg:grid-cols-4 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4 grid-rows-4"
      v-if="top_engagers"
    >
      <div
        v-for="(engager, index) in top_engagers"
        :key="index.id"
        class="bg-white shadow-lg overflow-hidden"
      >
        <div class="flex flex-row items-center pl-2 lg:pl-4">
          <img
            :src="engager.usr.profile_pic_url"
            class="w-20 p-3 rounded-full"
          />
          <div class="flex flex-col">
            <a
              target='_blank'
              :href="ig_usr_url + '/' + engager.usr.username" 
              class="text-base mr-2 text-blue-500 hover:text-blue-600">
              {{ engager.usr.username }}
            </a>
            <div class="text-gray-500 md:text-xs lg:text-base">Utente</div>
          </div>
        </div>
        <div
          v-for="action in actions"
          :key="action.id"
          class="pl-6 md:pl-6 lg:pl-8 bg-indigo-100"
        >
          <div class="flex flex-row p-2 items-center">
            <div
              class="bg-indigo-400 rounded-full w-8 h-8 text-center text-white"
            >
              <i
                :class="action.icon"
                class="flex justify-center pt-center pt-2"
              ></i>
            </div>
            <div class="pl-2 pr-1 text-2xl text-gray-500">
              {{ engager[action.key] }}
            </div>
            <div class="text-gray-600 text-xs md:text-xs lg:text-sm">
              {{ action.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="tracking-wider text-gray-600 text-center" v-else>
      Nessun engagers al momento
    </p>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "top-engagers",
  data: () => ({
    filter: "today",
    actions: [
      {
        icon: "hi hi-view",
        key: "view_count",
        title: "storie visualizzate"
      },
      {
        icon: "hi hi-heart",
        key: "like_count",
        title: "like"
      },
      {
        icon: "hi hi-rocket",
        key: "play_count",
        title: "sticker giocati"
      },
      {
        icon: "hi hi-comment",
        key: "comment_count",
        title: "commenti"
      }
    ],
    ig_usr_url: 'https://instagram.com'
  }),
  methods: {},
  async beforeMount() {},
  computed: {
    ...mapState("dashboard", {
      top_engagers: state => state.top_engagers
    })
  }
};
</script>
