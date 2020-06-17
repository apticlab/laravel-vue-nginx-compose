<template>
  <div class="flex flex-col flex-grow">
    <transition name="slide-fade">
      <div class="py-3 w-full" v-if="!isLoading">
        <awesome-table
          :headers="headers"
          :actions="actions"
          :rows="cronjobs"
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
import { cronjobs } from "@/services/headers";
import { api } from "@/utils/api.js";

export default {
  name: "ListCronJob",
  props: {},
  data() {
    return {
      isLoading: true,
      actions: cronjobs.actions,
      headers: cronjobs.headers
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.get_cronjobs();
    this.isLoading = false;
  },
  methods: {
    ...mapActions("jobs", ["get_cronjobs"]),
    delete(cronjob) {
      const params = {
        type: "confirm",
        title: "Cancella Cronjob",
        text: "Vuoi davvero cancellare questo cronjob?",
        confirmText: "Cancella",
        onConfirm: async result => {
          if (result) {
            this.isLoading = true;

            await api.delete("cronjobs", cronjob._id);
            await this.get_cronjobs();

            this.isLoading = false;
          }
        }
      };

      this.$dialog.show(params);
    },
    actOnRow(params) {
      let action = params.action;
      let cronjob = this.cronjobs[params.index];

      if (this[action.action]) {
        this[action.action](cronjob);
      }
    }
  },
  computed: {
    ...mapState("jobs", {
      cronjobs: state => state.cronjobs
    })
  }
};
</script>
