<template lang="html">
  <section class="" v-if="!loading">
    <section-title title="Distribuzione Followers per Genere"></section-title>
    <div
      class="px-4 py-3 shadow bg-white w-full rounded mb-3 flex flex-row items-center"
    >
      <p class="mr-3 text-indigo-700">Intervallo di tempo</p>
      <select
        v-model="week_selected"
        class="border bg-white text-gray-900 rounded-md p-2 mt-1 block"
      >
        <option
          v-for="(week, index) in weeks"
          :value="index"
          class="flex flex-row text-sm text-gray-700 my-2"
        >
          <span class="mx-1 text-gray-600">
            {{ week.interval.start }}
          </span>
          -
          <span class="mx-1">
            {{ week.interval.end }}
          </span>
        </option>
      </select>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <div class="rounded bg-white px-4 py-3 shadow flex flex-col">
        <chart
          height="200"
          type="doughnut"
          :datasets="distributionData"
          :labels="distributionLabels"
          :grid='false'
        ></chart>
        <div class="flex flex-wrap justify-center mt-8">
          <div
            :key="set.label"
            v-for="set in datasetsLabels"
            class="text-gray-600 text-sm flex mr-8 mb-4"
          >
            <span
              class="block w-4 h-4 rounded-full mr-2"
              :class="'bg-' + set.color"
            ></span>
            {{ set.label }}
          </div>
        </div>
      </div>
      <div class="col-span-2 rounded bg-white px-4 py-3 shadow">
        <chart :labels="labels" :datasets="datasets" type="stacked_bar"></chart>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import filters from "@/utils/filters";

export default {
  name: "gender-distribution",
  props: [],
  mounted() {},
  data() {
    return {
      year_selected: 2020,
      week_selected: 0,
      labels: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      colors: [
        {
          label: "Uomini",
          color: "indigo-600"
        },
        {
          label: "Donne",
          color: "pink-600"
        }
      ]
    };
  },
  methods: {
    getColorByLabel(label) {
      let color = this.colors.find(color => color.label == label);
      return color.color;
    }
  },
  computed: {
    ...mapState("audience", {
      gender: state => state.gender.per_week,
      total: state => state.gender.total,
      loading: state => state.loading
    }),
    datasets() {
      const labels = {};
      const datasets = [];
      this.week.days.forEach(day => {
        this.datasetsLabels.forEach(label => {
          if (!labels[label.label]) {
            labels[label.label] = {
              ...label,
              visible: true,
              data: this.createRandomArray(0, 0, 7)
            };
          }
          const day_number = this.getDayWeekNumber(day.day);
          const label_in_day = day.value.find(dt => dt.label == label.label);

          labels[label.label].data[day_number] = label_in_day
            ? label_in_day.value
            : 0;
        });
      });

      return Object.values(labels);
    },
    datasetsLabels() {
      return this.distributionLabels.map(label => {
        return {
          label,
          color: this.getColorByLabel(label)
        };
      });
    },
    distributionLabels() {
      return this.total.map(ds => ds.label);
    },
    distributionData() {
      let colors = [];
      let data = [];

      this.total.forEach(ds => {
        colors.push(this.getColor(this.getColorByLabel(ds.label)));
        data.push(ds.value);
      });

      return [
        {
          visible: true,
          colors: colors,
          data: data
        }
      ];
    },
    years() {
      const years = [];
      this.gender.forEach(week => {
        const year = week._id.year;
        if (years.indexOf(year) == -1) {
          years.push(year);
        }
      });

      return years;
    },
    weeks() {
      return this.gender
        .filter(week => {
          return week._id.year == this.year_selected;
        })
        .map(week => {
          return {
            days: week.values,
            interval: filters.week_date(week._id.week)
          };
        });
    },
    week() {
      return this.weeks.find((week, index) => {
        return index == this.week_selected;
      });
    }
  }
};
</script>
