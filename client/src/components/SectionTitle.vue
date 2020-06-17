<template>
  <div>
    <div class="flex pb-5 pt-8" v-if="v == 0">
      <div
        class="text-lg text-indigo-800 font-medium h-8 border-b-2 border-indigo-800 pr-3 select-none"
      >
        {{ translated_title }}
      </div>
      <div class="border-b-2 h-8 border-gray-400 flex-grow"></div>
      <div
        class="flex justify-end items-center text-gray-600 h-8 border-b-2 border-gray-400 cursor-pointer select-none"
      >
        Vedi tutti
      </div>
    </div>

    <div class="flex py-3 px-3" v-if="v == 1">
      <h2 class="text-xl text-indigo-800 font-semibold  pr-3 select-none">
        {{ translated_title }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "section-title",
  props: {
    title: { required: true, default: "" },
    translation: { required: false, default: null },
    v: { required: false, default: 0 }
  },
  data: () => ({}),
  mounted() {},
  computed: {
    translated_title() {
      if (!this.translation) return this.title;
      return this.$t(this.translation);
    }
  }
};
</script>
