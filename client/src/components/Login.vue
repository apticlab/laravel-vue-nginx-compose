<template>
  <div class="bg-gray-100 flex flex-col items-center justify-center h-screen">
    <div
      class="flex flex-col flex-grow-0 rounded max-w-sm w-full shadow bg-white overflow-hidden mt-2"
    >
      <div class="h-3 bg-indigo-500"></div>
      <form v-on:submit.prevent="login">
        <div class="py-3 px-4">
          <h3 class="text-center m-0 my-3 text-gray-700 text-xl">
            Login
          </h3>
          <div
            :class="{
              'opacity-0': errorText == '',
              'opacity-100': errorText != ''
            }"
            class="flex flex-col items-center justify-center my-5 text-center h-6 text-lg text-red-700"
          >
            {{ errorText }}
          </div>
          <div class="flex flex-col mb-4">
            <label for="username" class="text-gray-600 text-xs mb-1">
              Username
            </label>
            <input
              ref="username"
              type="text"
              id="username"
              v-model="username"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="password" class="text-gray-600 text-xs mb-1">
              Password
            </label>
            <input type="password" id="password" v-model="password" />
            <span class="ml-auto mt-3 text-xs text-gray-500 cursor-pointer"
              >Password dimenticata?</span
            >
          </div>
        </div>
        <div class="px-4 pb-4 mt-3 flex justify-center">
          <button
            :disabled="submitDisabled"
            type="submit"
            class="w-full text-white rounded py-3 px-3 text-normal outline-none"
            :class="{
              'bg-indigo-300 cursor-not-allowed': submitDisabled,
              'bg-indigo-500 cursor-pointer': !submitDisabled
            }"
          >
            {{ submitText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { login, resetPassword } from "../utils/auth";

export default {
  data() {
    return {
      email: "",
      loginStep: "login",
      username: "",
      password: "",
      isLoading: false,
      errorText: "",
      errorCodeDict: {
        user_not_found: "Matricola non appartenente a nessun utente",
        username_not_sent: "Inserisci una matricola nel campo di testo",
        password_not_insert: "Inserire la password"
      }
    };
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    async login() {
      var $route = this.$route;
      var $router = this.$router;

      this.errorText = "";

      if (this.password.length < 4) {
        this.errorText = "Inserire la password";
        return 0;
      }

      this.isLoading = true;

      let loginData = await login(this.username, this.password);

      if (loginData.error) {
        this.isLoading = false;
        this.errorText = "Credenziali non valide";
        return;
      }

      var redirect = $route.query.redirect || "";

      this.isLoading = false;
      $router.push("/" + redirect);
    },
    sendPasswordReset: function() {
      this.isLoading = true;
      this.errorText = "";

      resetPassword(this.email).then(
        data => {
          this.isLoading = false;
          this.email = "";
          this.loginStep = "success";
        },
        err => {
          this.email = "";
          this.errorText = this.errorCodeDict[err.code];
          this.isLoading = false;
        }
      );
    },
    resetPassword: function($event) {
      $event.stopPropagation();
      $event.preventDefault();

      this.errorText = "";
      this.loginStep = "passwordreset";
    },
    goBack: function() {
      this.loginStep = "login";
      this.errorText = "";
    }
  },
  computed: {
    canLogin: function() {
      this.errorText = "";
      return this.username != "" && this.password != "";
    },
    submitDisabled: function() {
      return !this.canLogin || this.isLoading;
    },
    submitText: function() {
      if (this.isLoading) {
        return "Caricamento";
      }

      return this.errorText == "" ? "Login" : "Errore";
    }
  }
};
</script>
<style></style>
