<template>
  <div class="px-4 py-3">
    <transition name="slide-fade">
      <div v-if="!isLoading">
        <div class="flex flex-row items-baseline">
          <button
            @click="goToList()"
            type="button"
            class="text-gray-600 rounded outline-none hover:text-indigo-600 mr-auto"
          >
            <i class="hi-arrow-left mr-1 text-xs"></i>
            Indietro
          </button>
          <button
            @click="changePassword()"
            type="button"
            class="text-gray-600 px-3 rounded outline-none hover:text-indigo-600"
          >
            <i class="hi-lock-closed mr-1"></i>
            Cambia Password
          </button>
          <button
            @click="editUser()"
            type="button"
            class="text-gray-600 px-3 rounded outline-none hover:text-indigo-600"
          >
            <i class="hi-edit mr-1"></i>
            Modifica
          </button>
          <button
            @click="deleteUser()"
            type="button"
            class="text-gray-600 px-3 rounded outline-none hover:text-red-600"
          >
            <i class="hi-trash mr-1"></i>
            Elimina
          </button>
        </div>
        <hr class="mt-2 mb-4" />
        <user-detail :user="userToShow"> </user-detail>
        <user-sync-manager
          :user="userToShow"
          v-if="userToShow.accounts.length"
        ></user-sync-manager>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { api } from "../utils/api.js";

export default {
  data() {
    return {
      isLoading: true,
      userToShow: {}
    };
  },
  async mounted() {
    this.isLoading = true;

    this.userToShow = await this.get_user(this.$route.params.user_id);

    this.isLoading = false;
  },
  methods: {
    ...mapActions("users", ["get_user", "get_roles"]),
    cancel() {
      this.$router.back();
    },
    changePassword() {
      const params = {
        type: "change_password",
        title: "Cambio Password",
        user_id: this.$route.params.user_id,
        onConfirm: result => {
          console.log(result);
        }
      };

      this.$dialog.show(params);
    },
    deleteUser() {
      const params = {
        type: "confirm",
        title: "Cancella Utente",
        text: "Vuoi davvero cancellare questo utente?",
        confirmText: "Cancella",
        onConfirm: async result => {
          if (result) {
            await api.delete("users", this.userToShow._id);
            this.$router.push({ name: "users_list" });
          }
        }
      };

      this.$dialog.show(params);
    },
    editUser() {
      this.$router.push("../edit/" + this.$route.params.user_id);
    },
    goToList() {
      this.$router.push({ name: "users_list" });
    }
  },
  computed: {}
};
</script>
