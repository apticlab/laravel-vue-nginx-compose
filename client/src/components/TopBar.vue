<template>
  <div
    class="h-20 w-full bg-white fixed right-0 top-0 z-10 flex flex-row items-center duration-200 transition-all ease-in shadow-sm"
    :class="is_collapsed ? 'pl-16' : 'pl-56'"
  >
    <div class="flex flex-row ml-auto">
      <div
        class="ml-auto border-r-2 border-gray-400 py-1 px-3 mx-2 cursor-pointer flex flex-row items-center flex-initial"
      >
        <i class="hi-notification text-gray-600 text-2xl"></i>
      </div>
      <div
        class="mr-4 flex flex-row items-center flex-initial"
        ref="popperTrigger"
      >
        <popper
          :toggler="showUserMenu"
          transition="slide-down-fade"
          trigger="toggler"
          :options="{
            position: 'bottom'
          }"
          v-on:hide="showUserMenu = false"
        >
          <div
            slot="reference"
            @click="toggleUserMenu()"
            class="mx-3 p-2 flex flex-row items-center mx-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            <!-- <div class="flex flex-col items-center text-gray-700 mr-3">
              <i class="zi-cheveron-up" />
              <i class="zi-cheveron-down" />
            </div> -->
            <div class="flex flex-row items-center">
              <avatar :user="user" class="w-8 h-8 mr-5"></avatar>
              <div class="flex flex-col">
                <small class="text-gray-600">{{ fullName }}</small>
              </div>
            </div>
          </div>
          <div
            class="popper shadow-lg bg-white rounded top-9 p-0 flex flex-col justify-start"
            style="min-width: 8rem"
          >
            <p
              class="text-left text mb-1 py-2 px-2 text-indigo-700 border-t border-grey-200"
            >
              Login
            </p>
            <div
              class="w-64 cursor-pointer py-2 px-3 hover:bg-indigo-100 flex flex-row justify-start items-baseline hover:text-indigo-700"
              @click="doUserAction(action)"
              :key="action.name"
              v-for="action in actions"
            >
              <i :class="action.icon"></i>
              <span class="ml-3">{{ action.label }}</span>
            </div>
          </div>
        </popper>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from "@/utils/auth";
import Popper from "@/components/Popper";
import SideNavMixin from "@/mixin/SideNav.mixin.js";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "top-bar",
  mixins: [SideNavMixin],
  components: {
    popper: Popper
  },
  data: () => ({
    showUserMenu: false,
    userActions: [
      {
        label: "Logout",
        icon: "hi-lock-open",
        callback: "logout",
        roles: ["superadmin"]
      }
    ]
  }),
  beforeMount() {
    this.reloadUser();
    this.EventBus.$on("reload-user", this.reloadUser);
    this.listenForSideNavCollapseEvent();
  },
  methods: {
    ...mapActions("user", ["change_active_account", "set_user", "set_token"]),
    ...mapMutations("user", ["remove_logged_account"]),
    async changeAccount(user) {
      if (!this.user.account) {
        this.user.account = {};
      }

      if (user.pk === this.user.account.pk) {
        return;
      }

      let result = await this.change_active_account(user.pk);
      this.$router.push("/dashboard");

      this.showUserMenu = false;
    },
    showLastUpdate(lastUpdate) {
      this.lastUpdate = lastUpdate;
    },
    showMedia(popular_media) {
      this.popular_media = popular_media.length;
    },
    showStories(stories) {
      this.stories = stories.length;
    },
    showDate(date) {
      this.date = date;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    doUserAction(action) {
      this.showUserMenu = false;

      if (this[action.callback] != null) {
        this[action.callback]();
      }
    },
    logout() {
      this.$router.push({ name: "logout" });
    },
    logoutUser() {
      this.remove_logged_account();
      this.$router.push("/users");
    },
    async reloadUser() {
      let user = getProfile();
      this.set_user(user);
    }
  },
  computed: {
    ...mapState("user", {
      user: state => state.user
    }),
    ...mapState("page_info", {
      updated_at: state => state.updated_at || state.last_updated,
      post_num: state => state.post_num,
      story_num: state => state.story_num
    }),
    ...mapGetters("page_info", ["reference_period"]),
    routeSectionTitle() {
      this.lastUpdate = null;

      let labels = this.$route.matched
        .map(route => (route.meta ? route.meta.label : null))
        .reverse();

      // Return the first not null && not undefined label
      return labels.find(label => !!label);
    },
    fullName() {
      return this.user.name + " " + this.user.surname;
    },
    actions() {
      let role = "user";

      if (this.user.role.code == "superadmin") {
        let has_account = this.user.account;
        role = "superadmin";
        if (has_account) {
          role = "superadmin_user";
        }
      }

      return this.userActions.filter(action => {
        console.log(role);
        return action.roles.includes(role);
      });
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.05s ease;
}
.slide-fade-leave-active {
  transition: all 0.05s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(2px);
  opacity: 0;
}
</style>
