<template>
  <div class="flex flex-col flex-grow">
    <transition name="slide-fade">
      <div class="py-3 w-full" v-if="!isLoading">
        <div class="flex flex-row items-baseline mb-3">
          <button @click="goToAddUser()" class="outline-none ml-auto">
            <span
              class="tx-gray-600 hover:text-indigo-600 flex flex-row justify-center"
            >
              <i class="hi-plus mr-1 text-xl"></i>
              <span> Nuovo Utente </span>
            </span>
          </button>
        </div>
        <awesome-table
          :headers="headers"
          :actions="actions"
          :rows="users"
          @act="actOnRow"
        ></awesome-table>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading" class="flex-grow w-full h-64"></loading>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { users } from "@/services/headers";
import { api } from "../utils/api.js";

export default {
  name: "UserList",
  data() {
    return {
      isLoading: true
    };
  },
  async mounted() {
    this.isLoading = true;

    await this.get_users();

    this.isLoading = false;
  },
  methods: {
    ...mapActions("users", ["get_users"]),
    goToUserDetail(user) {
      this.$router.push("view/" + user._id);
    },
    goToAddUser() {
      this.$router.push("new");
    },
    goToUserEdit(user) {
      this.$router.push("edit/" + user._id);
    },
    deleteUser(user) {
      const params = {
        type: "confirm",
        title: "Cancella Utente",
        text: "Vuoi davvero cancellare questo utente?",
        confirmText: "Cancella",
        onConfirm: async result => {
          if (result) {
            await api.delete("users", user._id);

            this.isLoading = true;
            await this.get_users();
            this.isLoading = false;
          }
        }
      };

      this.$dialog.show(params);
    },
    actOnRow(params) {
      let action = params.action;
      let user = this.users[params.index];

      if (this[action.action]) {
        this[action.action](user);
      }
    }
  },
  computed: {
    ...mapState("users", {
      users: state => state.users
    }),
    headers() {
      return users.headers;
    },
    actions() {
      return users.actions;
    }
  }
};
</script>
<style></style>
