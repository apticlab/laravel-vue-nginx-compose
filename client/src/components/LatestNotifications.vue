<template>
  <div
    class="flex flex-col md:w-1/3 w-full mr-5 shadow-md bg-white border-1 border-grey-300 rounded-lg overflow-hidden mt-3 md:mt-0 mb-6 md:mb-0"
  >
    <div
      class="flex flex-row flex-initial h-12 items-center text-gray-600 bg-indigo-100"
    >
      <span
        v-for="tab in tabs"
        :key="tab.title"
        class="uppercase tracking-wider text-indigo-400 border-gray-200 ml-4"
        @click="changeSelected(tab)"
        >{{ tab.code | translate }}</span
      >
    </div>

    <div
      class="h-74 overflow-y-auto"
      v-if="this[currentLink.list_name].length > 0"
    >
      <div
        v-for="(notification, index) in this[currentLink.list_name]"
        :key="index"
        class="flex flex-col bg-white py-1"
      >
        <div
          class="flex flex-row py-2 px-4 border-gray-200 border-b-1 items-center"
        >
          <div
            class="w-2/12 mr-3 flex flex-row flex-initial items-center justify-center"
          >
            <img
              class="rounded-full bg-gray-500 h-10 w-10"
              :src="notification.image.url"
              alt
            />
          </div>

          <div class="flex flex-col w-10/12">
            <div class="text-indigo-500 text-sm font-medium uppercase">
              {{ notification.title }}
            </div>
            <div class="text-gray-600 text-sm">
              {{ notification.notification }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="flex flex-row items-center justify-center py-4">
        <p class="text-gray-500 text-italic">{{ currentLink.on_empty }}</p>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "latest-notifications",
  data: () => ({
    selected_tab: 0,
    currentLink: null,
    announcements: [],
    tabs: [
      {
        code: "app_notifications",
        title: "App Notifications",
        list_name: "latest_notifications",
        on_empty: "Nessuna notifica"
      }
    ]
  }),
  methods: {
    changeSelected: function(notification) {
      this.currentLink = notification;
    }
  },
  async beforeMount() {
    this.currentLink = this.tabs[0];
  },
  computed: {
    ...mapState("dashboard", {
      latest_notifications: state => state.latest_notifications
    })
  }
};
</script>
