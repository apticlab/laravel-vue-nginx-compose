<template>
  <div class="px-4 py-3">
    <transition name="slide-fade">
      <div v-if="!isLoading">
        <div class="flex flex-row items-baseline">
          <button
            @click="goBack()"
            type="button"
            class="tx-gray-600 rounded outline-none hover:text-indigo-600 mr-auto"
          >
            <i class="hi-arrow-left mr-1 text-xs"></i>
            Indietro
          </button>
        </div>
        <hr class="mt-2 mb-4" />
        <form>
          <div class="grid grid-cols-3">
            <div class="flex-grow flex flex-col justify-start">
              <h3 class="text-gray-700 text-xl">Informazioni Personali</h3>
            </div>
            <div class="flex-grow-2">
              <div
                :key="field.name"
                v-for="field in formFields"
                class="flex flex-col mb-3"
              >
                <label :for="field.name" class="text-gray-500 text-xs mb-1">
                  {{ field.label }}
                </label>
                <input
                  v-if="field.type != 'select'"
                  :type="field.type"
                  :id="field.name"
                  v-model="userToEdit[field.name]"
                  class="rounded bg-indigo-100  text-base text-gray-600 px-3 py-3 outline-none border-b border-indigo-200"
                />
                <select
                  v-else=""
                  v-model="userToEdit[field.name]"
                  :name="field.name"
                  :id="field.name"
                  class="rounded-sm bg-indigo-100 text-base text-gray-600 px-3 py-3 outline-none border-b border-indigo-200"
                >
                  <option
                    :key="option.code"
                    v-for="option in field.options"
                    :value="option"
                  >
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!--
          <hr class="my-4" />
          <div class="grid grid-cols-3">
            <div class="flex-grow flex flex-col justify-start">
              <h3 class="text-gray-700 text-xl">Account Instagram</h3>
            </div>
            <div class="flex-grow-2">
              TODO
            </div>
          </div>
          <hr class="my-4" />
          <div class="grid grid-cols-3">
            <div class="flex-grow flex flex-col justify-start">
              <h3 class="text-gray-700 text-xl">Fatturazione</h3>
            </div>
            <div class="flex-grow-2">
              TODO
            </div>
          </div>
          -->
          <hr class="my-4" />
          <div class="flex flex-row my-4 mx-3">
            <button
              @click="cancel()"
              type="button"
              class="text-gray-600 px-3 py-2 mr-3 ml-auto outline-none"
            >
              Annulla
            </button>
            <button
              @click="saveUser()"
              type="button"
              class="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-2 rounded outline-none"
            >
              {{ saveBtnText }}
            </button>
          </div>
        </form>
      </div>
    </transition>
    <transition name="slide-fade">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { users_service } from "../services/users.service";

export default {
  data() {
    return {
      mode: null,
      isLoading: true,
      title: "",
      saveBtnText: "",
      userTemplate: {
        name: "",
        surname: "",
        email: ""
      },
      userToEdit: {},
      formFields: [
        {
          name: "name",
          label: "Nome",
          type: "text"
        },
        {
          name: "surname",
          label: "Cognome",
          type: "text"
        },
        {
          name: "email",
          label: "Email",
          type: "email"
        },
        {
          name: "username",
          label: "Username",
          type: "text"
        },
        {
          name: "role",
          label: "Ruolo",
          type: "select"
        }
      ]
    };
  },
  async mounted() {
    this.isLoading = true;

    await this.get_roles();

    this.userTemplate.role = this.roles.find(role => role.code == "user");
    this.formFields.find(field => field.name == "role").options = this.roles;

    this.userToEdit = JSON.parse(JSON.stringify(this.userTemplate));

    this.mode = "create";
    this.saveBtnText = "Crea Utente";

    if (this.$route.name != "users_create") {
      this.mode = "edit";
      this.userToEdit = await this.get_user(this.$route.params.user_id);
      this.saveBtnText = "Salva Modifiche";
    }

    this.isLoading = false;
  },
  methods: {
    ...mapActions("users", ["get_user", "get_roles"]),
    cancel() {
      this.$router.back();
    },
    async saveUser() {
      this.isLoading = true;

      let result = await users_service.save_user(this.userToEdit);

      if (result.error) {
        console.log("Errors: ", result.error);
        this.isLoading = false;
        return;
      }

      this.$router.push("../");
    },
    goBack() {
      this.$router.back();
    },
    goToUserDetail() {
      this.$router.push({ name: "users_view", params: this.$route.params });
    }
  },
  computed: {
    ...mapState("users", {
      roles: state => state.roles
    })
  }
};
</script>
