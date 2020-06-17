<template>
  <div>
    <div class="flex flex-col justify-start mb-4">
      <h3 class="text-gray-700 text-xl m-0 pb-2">
        Impostazioni Sincronizzazione Utente
      </h3>
    </div>
    <div class="grid grid-cols-4 gap-20">
      <div class="flex flex-col mt-4">
        <div
          :key="account.pk"
          @click="selectAccount(account)"
          v-for="account in user.accounts"
          :class="{
            'bg-indigo-600 text-white': selectedAccount == account,
            'bg-white text-gray-700': selectedAccount != account
          }"
          class="rounded border-b border-gray-200 flex flex-row items-center justify-center mb-2 px-3 py-2 cursor-pointer"
        >
          <avatar
            class="min-w-10 min-h-10 w-10 h-10"
            :user="account"
            field="profile_pic_url"
          ></avatar>
          <div class="ml-6 flex-grow flex flex-col">
            <span class="mb-1 text-md">@{{ account.username }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col col-span-3">
        <div class="flex flex-col justify-center mt-4">
          <div
            class="py-3 border-gray-200 border-t grid grid-cols-3 flex flex-row items-center"
            v-for="item in sync_items"
            :key="item.name"
          >
            <div>
              {{ item.name }}
            </div>
            <div class="text-xs text-green-600 text-center">
              Ultimo aggiornamento: {{ item.last_update | time_ago }}
            </div>
            <div class="flex flex-row items-center justify-center">
              <div class="flex flex-row justify-center">
                <button
                  class="first:rounded-l last:border-r last:rounded-r border-r-0 px-3 py-2 border border-indigo-800 focus:outline-none"
                  :class="
                    itemIsSelected(item, option)
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600'
                  "
                  :key="option.value"
                  @click="changeOption(item, option)"
                  v-for="option in sync_options"
                >
                  {{ option.value }} h
                </button>
              </div>
              <div class="ml-4">
                <div
                  v-if="!sync_loading[item.code]"
                  class="rounded-full w-6 h-6 text-green-600 flex flex-row items-center justify-center"
                >
                  <i title="Dati salvati con successo" class="zi-checkmark"></i>
                </div>
                <div
                  class="rounded-full w-6 h-6 text-orange-600 text-white flex flex-row items-center justify-center"
                  v-if="sync_loading[item.code]"
                >
                  <i title="Salvando..." class="zi-time"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "../utils/api.js";
import { setProfile } from "../utils/auth.js";

export default {
  name: "UserSyncManager",
  props: {
    user: {}
  },
  data() {
    return {
      selectedAccount: null,
      sync_items: [
        {
          name: "News Utente",
          last_update: new Date(),
          code: "user_news"
        },
        {
          name: "Lista Followers Utente",
          last_update: new Date(),
          code: "user_followers"
        },
        {
          name: "Ultime Interazioni ai Post",
          last_update: new Date(),
          code: "last_user_media_interactions"
        },
        {
          name: "Ultime Interazioni ai Tag",
          last_update: new Date(),
          code: "last_usertags_media_interactions"
        },
        {
          name: "Ultime Interazioni ai Story",
          last_update: new Date(),
          code: "user_story_interactions"
        },
        {
          name: "Generazione Pagine Sito",
          last_update: new Date(),
          code: "gen_site_page"
        }
      ],
      sync_options: [
        {
          value: 3
        },
        {
          value: 6
        },
        {
          value: 12
        },
        {
          value: 24
        }
      ],
      sync_loading: {
        user_news: false,
        user_story_interactions: false,
        last_usertags_media_interactions: false,
        last_user_media_interactions: false
      }
    };
  },
  beforeMount() {
    this.selectedAccount = this.user.accounts[0];

    if (!this.selectedAccount.sync_values) {
      this.selectedAccount.sync_values = {};
    }
  },
  methods: {
    selectAccount(account) {
      this.selectedAccount = account;
    },
    itemIsSelected(item, option) {
      return this.selectedAccount.sync_values[item.code] == option.value;
    },
    async changeOption(item, option) {
      if (this.sync_loading[item.code]) {
        return;
      }

      this.selectedAccount.sync_values[item.code] =
        this.selectedAccount.sync_values[item.code] == option.value
          ? -1
          : option.value;

      this.sync_loading[item.code] = true;

      try {
        let response = await api.act(
          "users",
          this.user._id,
          "update_sync_manager",
          {
            funcname: item.code,
            value: this.selectedAccount.sync_values[item.code],
            ig_pk: this.selectedAccount.pk
          }
        );
      } catch (err) {
        console.log(err);
      }

      this.sync_loading[item.code] = false;
      this.$forceUpdate();
    }
  },
  computed: {}
};
</script>
