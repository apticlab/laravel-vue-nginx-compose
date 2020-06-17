<template>
  <div class="bg-gray-100 flex flex-col items-center justify-center h-screen">
    <div class="mt-3 mx-auto max-w-screen-lg" v-if="!userToShow.isActive">
      <div class="flex flex-col bg-white rounded shadow overflow-hidden">
        <div
          class="flex flex-row border-b-width-1 border-gray-200 py-6 mb-5 justify-between px-8"
        >
          <div
            :key="index"
            :class="{
              selected: current_step == index
            }"
            v-for="(step, index) in steps"
            class="flex items-center px-5p progress-step"
          >
            <div
              class="w-12 h-12 rounded-full bg-gray-300 flex flex-col items-center justify-center text-white"
            >
              {{ index + 1 }}
            </div>
            <span class="text-uppercase tx-small text-gray-500 ml-3">
              {{ step.label }}
            </span>
          </div>
        </div>
        <div class="px-8 pb-2">
          <h3 class="text-gray-700 text-2xl m-0 mb-4 text-indigo-800">
            {{ steps[current_step].label }}
          </h3>
        </div>
        <div v-if="current_step == 0" class="px-8">
          <div class="flex flex-col items-top mb-8">
            <p class="text-gray-700 tx-4">
              Al fine di completare il processo di creazione dell'account, è
              necessario agganciare questo account IMSight all'account Instagram
              che si intende monitorare.
            </p>
          </div>
          <div v-if="error" class="text-red-600 text-base py-4">
            {{ errorMessages[error] || generic_error }}
          </div>
          <div class="flex-cont-col flex-1">
            <div
              :key="field.name"
              v-for="field in formFields"
              class="flex-cont-col mb-4"
            >
              <label :for="field.name" class="text-gray-500 text-sm mb-2 mr-3">
                {{ field.label }}
              </label>
              <input
                v-if="field.type != 'select'"
                :type="field.type"
                :id="field.name"
                v-model="account[field.name]"
              />
              <select
                v-else=""
                v-model="account[field.name]"
                :name="field.name"
                :id="field.name"
                class="radius-3 bg-primary-100 max-w-60 tx-4 tx-grey-600 px-3 py-3 no-outline b-width-1 b-primary-200"
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
        <div v-if="current_step == 1" class="px-8">
          <div class="flex flex-col items-top mb-8">
            <p class="text-gray-700 text-base">
              Il processo di autenticazione di Instagram
              <span class="font-bold">potrebbe</span> richiedere un ulteriore
              codice per confermare che l'accesso che stiamo effettuando
              attraverso IMSight sia lecito. Qualora fosse necessario, inserire
              nella casella di testo sottostante il codice appena ricevuto via
              mail o cellulare.
            </p>
          </div>
          <div class="mt-8 flex flex-col flex-grow">
            <div v-if="isLoading" class="flex flex-col items-center mb-3">
              <loading class="w-14 h-14 mb-6"></loading>
              <span class="text-gray-500 text-lg">{{ loadingMsg }}</span>
            </div>
            <div v-if="!isLoading">
              <div class="flex-cont-col flex-1">
                <div
                  :key="field.name"
                  v-for="field in additionalAuthFields[state]"
                  class="mb-4 grid grid-cols-5"
                >
                  <label
                    :for="field.name"
                    class="text-gray-500 text-sm mb-2 mr-3 flex items-center"
                  >
                    {{ field.label }}
                  </label>
                  <div class="col-span-2 flex items-center">
                    <input
                      class="flex-grow"
                      v-if="field.type != 'select'"
                      :type="field.type"
                      :id="field.name"
                      v-model="two_factor_data[field.name]"
                    />
                    <select
                      v-else=""
                      v-model="two_factor_data[field.name]"
                      :name="field.name"
                      :id="field.name"
                      class="flex-grow rounded-sm bg-indigo-100 text-base text-gray-600 px-3 py-3 outline-none border-b border-indigo-200"
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
            </div>
          </div>
        </div>
        <div v-if="current_step == 2" class="px-8">
          <div class="flex flex-col items-top">
            <p class="text-gray-700 text-base">
              <span class="font-medium">
                Il processo di autenticazione con Instagram è andato a buon
                fine!
              </span>
              <br />
              <br />
              Il nostro sistema di recupero dei dati sta quindi iniziando a
              collezionare tutte le statistiche relative al proprio account.
              <br />
              <br />
              I dati non saranno disponibili prima di
              <span class="font-medium">almeno 12 ore</span>. Sarete avvisati a
              mezzo mail o messaggio quando la procedura di recupero delle
              informazioni sarà completata.
            </p>
          </div>
          <div class="mt-3 flex flex-col flex-grow"></div>
        </div>
        <div class="mt-10 flex flex-row bg-gray-200 px-5 py-4">
          <button :disabled="backButtonDisabled" @click="goBackward" class="">
            Indietro
          </button>
          <button
            :disabled="forwardButtonDisabled"
            @click="goForward"
            class="bg-blue-800 rounded hover:bg-blue-900 disabled:bg-gray-400 text-white ml-auto px-3 py-2"
          >
            {{ current_step == steps.length - 1 ? "Fine" : "Avanti" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile, setProfile } from "../utils/auth.js";
import { api } from "../utils/api.js";
import { helpers } from "../utils/helpers.js";
import { mapState, mapMutations, mapActions } from "vuex";

const loadingMessages = {
  first_login: "Tentativo di login...",
  two_factor_auth_needed: "Autorizzando accesso..."
};

export default {
  data() {
    return {
      generic_error: "Si è verificato un errore, si prega di riprovare",
      error: null,
      isLoading: true,
      userToShow: {},
      current_step: 0,
      steps: [
        {
          label: "Credenziali Instagram"
        },
        {
          label: "Autenticazione"
        },
        {
          label: "Account Connesso"
        }
      ],
      formFields: [
        {
          name: "username",
          label: "Username",
          type: "text"
        },
        {
          name: "password",
          label: "Password",
          type: "password"
        }
      ],
      additionalAuthFields: {
        two_factor_auth_needed: [
          {
            name: "verification_code",
            label: "Codice di Verifica",
            type: "text"
          },
          {
            name: "verification_method",
            label: "Metodo di Verifica",
            type: "select",
            options: [
              {
                name: "SMS",
                code: "sms"
              },
              {
                name: "Codice Backup",
                code: "backup_code"
              },
              {
                name: "Autorizzazione App",
                code: "auth_app"
              }
            ]
          }
        ],
        challenge_required: [
          {
            name: "verification_code",
            label: "Codice di Verifica",
            type: "text"
          }
        ]
      },
      errorMessages: {
        login_error: "Credenziali non corrette. Riprovare",
        client_proxy_connection:
          "La procedura di login ha riscontrato un errore, riprovare",
        max_auth_attempts:
          "La procedura di login è andata in timeout. Riprovare",
        user_not_found: "Utente non trovato"
      },
      state: "first_login",
      account: {},
      two_factor_data: {}
    };
  },
  mounted() {
    this.isLoading = true;

    this.state = "first_login";
    this.userToShow = getProfile();

    if (this.userToShow.isActive) {
      this.$router.push("/");
    }

    this.isLoading = false;
  },
  methods: {
    ...mapMutations("user", ["set_user", "set_token"]),
    goForward() {
      if (!this.isStepValid()) {
        return;
      }

      if (this.current_step == this.steps.length - 1) {
        this.$router.push({ name: "dashboard" });
        return;
      }

      if (this.current_step == 1) {
        switch (this.state) {
          case "first_login":
            this.current_step = 2;
            break;

          case "two_factor_auth_needed":
            this.current_step = 1;
            this.completeTwoFactor();
            break;

          case "challenge_required":
            this.current_step = 1;
            this.completeChallenge();
            break;
        }

        return;
      }

      this.current_step++;
    },
    goBackward() {
      if (this.current_step > 0) {
        this.current_step--;
      }
    },
    async apiPoll(apiData, max_attempts = 30) {
      let result = {
        err: null,
        data: null
      };

      let response = null;

      try {
        response = await api.act(
          apiData.resource,
          apiData.id,
          apiData.action,
          apiData.data
        );
      } catch (err) {
        result.err = err;
        return result;
      }

      if (response.result.status == "err") {
        result.err = response.result.err_code;
        return result;
      }

      let jobId = response.result.job_id;
      let attempts = 0;

      while (attempts < max_attempts) {
        let job_result = null;

        try {
          job_result = await api.get("jobs", jobId);
        } catch (err) {
          result.err = err;
          return result;
        }

        switch (job_result.status) {
          case "complete":
            if (job_result.success) {
              result.data = job_result.result;
            } else {
              result.err = job_result.result.err_code
                ? job_result.result.err_code
                : "generic_error";
              result.data = job_result.args;
            }

            return result;

          case "error":
            result.err = job_result.error_type;
            return result;
        }

        await helpers.sleep(1000);
        attempts++;
      }

      result.err = "max_auth_attempts";

      return result;
    },
    async instagramLogin() {
      // TODO: port this to apiPoll API and not hardcode it
      this.error = null;
      this.isLoading = true;

      let actionData = {
        resource: "users",
        id: this.userToShow._id,
        action: "instagram_login_credentials",
        data: this.account
      };

      let result = await this.apiPoll(actionData, 60);

      console.log(result);

      if (result.err) {
        switch (result.err) {
          case "two_step_auth":
            // Sad but true
            // Though but fair
            this.account.user_id = result.data[0];

            this.state = "two_factor_auth_needed";
            break;

          case "challenge_required":
            this.state = "challenge_required";
            break;

          case "client_proxy_connection":
            this.current_step = 0;
            break;

          case "user_not_found":
          case "login_error":
            this.current_step = 0;
            break;

          case "max_auth_attempts":
            this.current_step = 0;
            break;

          default:
            this.current_step = 0;
        }

        this.error = result.err;
      } else {
        let user_found = result.data.user;
        user_found.password = this.account.password;

        await this.linkInstagramAccount(user_found);

        this.current_step = 2;
        this.state = "first_login";
      }

      this.isLoading = false;
    },
    async completeTwoFactor() {
      this.isLoading = true;

      let actionData = {
        resource: "users",
        id: this.userToShow._id,
        action: "instagram_login_two_factor",
        data: {
          verification_code: this.two_factor_data.verification_code,
          verification_method: this.two_factor_data.verification_method.code,
          username: this.account.username,
          user_id: this.account.user_id
        }
      };

      let result = await this.apiPoll(actionData);

      if (result.data) {
        await this.linkInstagramAccount(result.data.user);
        this.current_step = 2;
      }

      this.isLoading = false;
    },
    async completeChallenge() {
      this.isLoading = true;

      let actionData = {
        resource: "users",
        id: this.userToShow._id,
        action: "instagram_complete_challenge",
        data: {
          verification_code: this.two_factor_data.verification_code,
          verification_method: "sms",
          username: this.account.username,
          user_id: this.account.user_id
        }
      };

      let result = await this.apiPoll(actionData);

      if (result.data) {
        await this.linkInstagramAccount(result.data.user);
        this.current_step = 2;
      }

      this.isLoading = false;
    },
    async linkInstagramAccount(instagramUserData) {
      let response = await api.act(
        "users",
        this.userToShow._id,
        "link_instagram_account",
        instagramUserData
      );

      this.set_token(response.result.token);
      this.set_user(response.result.user);
    },
    isStepValid() {
      switch (this.current_step) {
        case 0:
          return this.account.username && this.account.password;
        case 1:
          switch (this.state) {
            case "first_login":
              return true;

            case "two_factor_auth_needed":
              return (
                this.two_factor_data.verification_code &&
                this.two_factor_data.verification_method
              );

            case "challenge_required":
              return this.two_factor_data.verification_code;
          }
          break;

        case 2:
          return true;
      }
    }
  },
  watch: {
    current_step() {
      switch (this.current_step) {
        case 0:
          break;

        case 1:
          this.instagramLogin();
          break;

        case 2:
          break;
      }
    }
  },
  computed: {
    loadingMsg() {
      return loadingMessages[this.state];
    },
    backButtonDisabled() {
      return this.current_step == 0 || this.isLoading;
    },
    forwardButtonDisabled() {
      return !this.isStepValid() || this.isLoading;
    }
  }
};
</script>
