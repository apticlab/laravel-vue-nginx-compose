<template>
  <div>
    <template v-if='data'>
      <div class="grid grid-cols-2 gap-5">
        <div
          :key="name"
          v-for="(setData, name) in sets"
          class="rounded bg-white shadow flex flex-col"
        >
          <div class="flex flex-col">
            <div
              class="bg-gray-200 px-4 py-3 uppercase tracking-wide text-gray-600 font-semibold"
            >
              {{ name | translate }}
              <div class="mt-3 w-16 h-1 bg-gray-400"></div>
            </div>
            <div class="px-4 pb-3 flex pt-8 items-center">
              <div class="relative">
                <chart
                  class="col-span-2 relative"
                  height="180"
                  width="180"
                  rim="80"
                  type="doughnut"
                  :grid='false'
                  :datasets="engagementData(name)"
                  :labels="engagementLabels(name)"
                >
                </chart>
                <div class="absolute top-0 bottom-0 left-0 right-0 flex">
                  <div
                    class="flex flex-col items-center justify-center flex-grow mb-3 ml-3"
                  >
                    <span class="text-3xl text-gray-600 font-semibold">
                      {{ engagementSetTotal(name) | size_number }}
                    </span>
                    <span class="uppercase tracking-wide text-gray-500 text-xs"
                    >totali</span
                  >
                  </div>
                </div>
              </div>
              <div
                class="ml-20 flex flex-col justify-center item-center mr-8 flex-grow"
              >
                <div
                  :key="set.label"
                  v-for="set in setData"
                  class="text-gray-600 text-sm flex items-center mb-6"
                >
                  <span
                    class="block w-2 h-12 mr-5"
                    :class="'bg-' + set.color"
                  ></span>
                  <span class="text-gray-600 text-lg">
                    {{ set.label }}
                  </span>
                  <span
                    :class="'text-' + set.color"
                    class="font-bold text-2xl text-right ml-auto flex flex-col"
                  >
                    {{ engagementSetPercentage(set.field, name) | percentage }}
                    <span class="font-normal text-gray-600 text-xs">
                      {{ data[set.field] }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="p-3 rounded flex flex-row items-center justify-center">
        <i class="hi-inbox text-gray-400 text-2xl mx-3" />
        <p class="text-center text-gray-400 font-bold">Nessun dato da mostrare</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "EngagementDetail",
  props: {
    data: { required: true, default: [] },
    sets: { required: true }
  },
  mounted() {},
  beforeMount() {},
  data() {
    return {};
  },
  methods: {
    engagementLabels(setName) {
      return this.sets[setName].map(set => set.label);
    },
    engagementSetPercentage(field, setName) {
      if(!this.data) {
        return 0;
      }

      let total = 0;
      let value = this.data[field];

      this.sets[setName].forEach(set => {
        total += this.data[set.field];
      });

      return value / total;
    },
    engagementSetTotal(setName) {
      if(!this.data) {
        return 0;
      }

      let total = 0;

      this.sets[setName].forEach(set => {
        total += this.data[set.field];
      });

      return total;
    },
    engagementData(setName) {
      if(!this.data) {
        return [];
      }

      return [
        {
          visible: true,
          colors: this.sets[setName].map(set => this.getColor(set.color)),
          data: this.sets[setName].map(set => this.data[set.field])
        }
      ];
    }
  },
  computed: {}
};
</script>
