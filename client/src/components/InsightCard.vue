<template>
  <div class="h-full min-h-14">
    <template v-if='!graph'>
      <div class="p-3 rounded h-full" :class="_theming.bg">
        <div class="flex items-center">
          <i class="hi-view" :class="_theming.icon"></i>
          <div class="pl-2 uppercase font-semibold text-xs" :class="_theming.name">
            {{ insight.key | translate | on_empty(insight.name) }}
          </div>
        </div>
        <div class="pl-6 text-white font-semibold text-3xl">
          {{ insight.value | size_number }}
        </div>
        <div
          v-if="insight.delta"
          :class="[_theming.trend.text, _theming.trend.bg]"
          class="flex flex-row float-right items-center px-2  rounded-full"
        >
          <i
            :class="is_trending_up ? 'hi-trending-up' : 'hi-trending-down'"
            class="mr-1"
          ></i>
          {{ insight.delta }}%
        </div>
      </div>
    </template>
    <template v-else>
      <div
        :class="!has_no_history ? 'justify-between' : ''"
        class="h-full rounded shadow bg-white flex flex-col"
      >
        <div class="p-2 pb-0 flex flex-row items-center">
          <span 
            :class='_theming.name'
            class=" uppercase font-semibold text-xs text-white bg-transparent">
            {{ insight.key | translate | on_empty(insight.name) }}
          </span>
          <i class="hi-help ml-auto text-gray-500 cursor-pointer" />
        </div>
        <div class="flex flex-row">
          <div class="px-2 text-gray-700 font-semibold text-2xl">
            {{ last_insight | size_number }}
          </div>
          <div
            :class="[_theming.trend.text]"
            class="flex flex-row float-right items-center text-xs"
          >
            <i
              :class="increment > 0 ? 'hi-trending-up' : 'hi-trending-down'"
              class="mr-1"
            ></i>
            {{ increment }}%
          </div>
        </div>
        <chart
          v-if='!has_no_history'
          class='h-16 w-full'
          :labels='datasets[0].data.map(() => "")'
          :datasets="datasets"
          :grid='false'
          :fill='true'
          type="line"
        ></chart>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "insight-card",
  props: {
    insight: { required: true, default: null },
    theme: { required: false, default: "indigo" },
    theming: { required: false, default: null },
  },
  data() {
    return {
      graph: false,
      history: null,
      has_no_history: false
    }
  },
  beforeMount() {
    
    // for backward compatibility
    if(!Array.isArray(this.insight.value)) {
      this.history = [this.insight.value, this.insight.value];
      if(this.insight.value == 0) {
        this.has_no_history = true;
      }

      this.insight.value = this.history;
    }

    if(Array.isArray(this.insight.value)) {
      this.graph = true;

      if(this.insight.value.length > 0) {
        this.history = this.insight.value;
      } else {
        this.has_no_history = true;
        this.history = [0, 0]; 
      }
    }

    if(this.graph && this.history) {
      if(this.graph && this.history.length < 2) {
      }
    }

  },
  methods: {},
  computed: {
    is_trending_up() {
      return parseFloat(this.insight.delta) >= 0;
    },
    base_theme() {
      return this.theming.bg.split('-')[1];
    },
    last_insight() {
      return this.history[this.history.length - 1]
    },
    _theming() {
      return this.theming;

      if (!this.theming  && !this.graph) {
        return {
          name: `text-${this.theme}-100`,
          icon: `text-${this.theme}-200`,
          trend: {
            text: `${this.is_trending_up ? "text-green-600" : "text-red-600"}`,
            bg: `${this.is_trending_up ? "bg-green-200" : "bg-red-200"}`
          },
          bg: `bg-${this.theme}-800`
        };
      }

      return {
        name: `text-${this.theme}-600`,
        icon: `text-${this.theme}-500`,
        trend: {
          text: `${this.increment > 0 ? "text-green-600" : "text-red-600"}`,
          bg: `${this.increment > 0 ? "bg-green-200" : "bg-red-200"}`
        },
        bg: `bg-white`
      };
    },
    increment() {
      let len = this.history.length;
      let last = this.history[len - 1];
      let second_last = this.history[len - 2];

      if(last == 0 || second_last == 0) {
        return 0;
      }

      let result = Number(((last - second_last) / second_last) * 100).toFixed(1);
      if( result === '0.0') {
        result = Number.parseFloat(result).toPrecision(1);
      }
      return result;
    },
    datasets() {
      return [
        {
          visible: true,
          label: '',
          color: this._theming.theme ? this._theming.theme : this.theme + '-400',
          data: this.history
        }
      ]
    }
  }
};
</script>

<style></style>
