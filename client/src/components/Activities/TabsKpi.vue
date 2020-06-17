<template>
  <div v-if="!loading" class="">
    <section-title title="Tabs KPI"></section-title>
    <div class="flex flex-row items-center justify-between">
      <div
        v-for="(kpi, index) in kpiSets"
        :class="index % 2 == 0 ? 'mr-1' : 'ml-1'"
        class="my-5 pb-3 shadow bg-white w-6/12 rounded mb-3 flex flex-col items-center"
      >
        <div class="bg-gray-400 w-full px-3 py-2 rounded-t">
          <div class="flex flex-row">
            <p
              v-for="(kpi_name, i) in kpi"
              class="text-gray-700 uppercase font-semibold tracking-wider"
            >
              {{ kpi_name.label }}
              <span class="mx-1 mr-2" v-if="i + 1 < kpi.length"> - </span>
            </p>
          </div>
          <span class="text-xs text-gray-600"
            >Confronta due intervalli di tempo selezionando le date</span
          >
        </div>
        <div
          class="px-4 pt-6 flex flex-row items-center justify-between w-full py-2"
        >
          <div class="flex flex-col items-center">
            <aw-datepicker
              @update="value => updateValues(value, index)"
              v-if="dateRanges[index][0]"
              :ref="'picker_' + index + '_' + 'start'"
              v-model="dateRanges[index][0]"
              :maxDate="today"
              opens="right"
            >
              <template v-slot:input="date" style="min-width: 350px;">
                {{ date.startDate | date("LL") }} -
                {{ date.endDate | date("LL") }}
              </template>
            </aw-datepicker>
            <span
              class="border-2 rounded w-full my-1"
              :class="'border-' + colors[index][0]"
            ></span>
          </div>
          <div class="w-px h-8 bg-gray-600 rounded-md"></div>

          <div class="flex flex-col items-center">
            <aw-datepicker
              @update="value => updateValues(value, index)"
              v-if="dateRanges[index][1]"
              :ref="'picker_' + index + '_' + 'end'"
              v-model="dateRanges[index][1]"
              :maxDate="today"
              opens="left"
            >
              <template v-slot:input="date" style="min-width: 350px;">
                {{ date.startDate | date("LL") }} -
                {{ date.endDate | date("LL") }}
              </template>
            </aw-datepicker>
            <span
              class="border-2 rounded w-full my-1"
              :class="'border-' + colors[index][1]"
            ></span>
          </div>
        </div>
        <div class="px-5 py-3 w-full">
          <chart
            class="mt-8 h-64"
            :labels="labels[index]"
            :datasets="dataset[index]"
            type="bar"
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import filters from "@/utils/filters";

export default {
  data() {
    return {
      force_update: new Date().getTime(),
      today: this.moment().format("YYYY-MM-DD"),
      kpiSets: [
        [
          {
            label: "Impression",
            field: "impression_count",
            icon: "hi-plus",
            visible: true,
            color: "indigo-700"
          },
          {
            label: "Reach",
            field: "reach_count",
            icon: "zi-share-alt",
            visible: true,
            color: "teal-700"
          }
        ],
        [
          {
            label: "Actions",
            field: "play_count",
            icon: "zi-swap",
            visible: true,
            color: "gray-600"
          },
          {
            label: "Viewers",
            field: "view_count",
            icon: "hi-star",
            visible: true,
            color: "blue-600"
          },
          {
            label: "Like",
            field: "like_count",
            icon: "zi-thumbs-up",
            visible: true,
            color: "green-400"
          }
        ]
      ],
      dateRanges: [],
      colors: [
        ["indigo-300", "teal-600"],
        ["green-500", "blue-500"]
      ]
    };
  },
  mounted() {},
  beforeMount() {
    this.loadKpiDataRanges(this.kpiSets);
  },
  methods: {
    loadKpiDataRanges(kpi) {
      this.kpiSets.map((group, index) => {
        this.dateRanges[index] = [
          {
            startDate: this.moment(
              this.history[this.history.length - 1].datetime
            ),
            endDate: this.moment().subtract(8, "days")
          },
          {
            startDate: this.moment().subtract(7, "days"),
            endDate: this.moment()
          }
        ];
      });
    },
    getResourceInRange(kpi_name, startDate, endDate = false) {
      // TODO: too much n-complexity. Reduce for-loops
      // get actions between range start and end date
      const filtered_actions = this.history.filter(action => {
        const day = this.moment(action.datetime);
        return endDate
          ? day.isBetween(startDate, endDate)
          : day.isBefore(startDate);
      });

      let kpi_sum = 0;
      filtered_actions.forEach(action => {
        let action_value = action[kpi_name];
        kpi_sum += action_value ? action_value : 0;
      });

      if (kpi_sum == 0) {
        return 0;
      }

      return Number(kpi_sum / filtered_actions.length).toFixed(0);
    },
    getDayFromDayname(day_name, days) {
      return days.find(day => {
        return day.time.day_name == day_name;
      });
    },
    getKpiColors(kpi) {
      let color = kpi.color.split("-")[0];
      let graduation = kpi.color.split("-")[1];
      return [`${color}-${graduation}`, `${color}-${graduation - 200}`];
    },
    updateValues() {
      this.force_update = new Date().getTime();
    }
  },
  computed: {
    ...mapState("activities", {
      loading: state => state.loading,
      history: state => Object.values(state.history)
    }),
    /**
    colors() {
      let colors = {}
      this.kpiSets.map(iter => {
        iter.map((kpi) => {
          colors[kpi.field] = this.getKpiColors(kpi);
        });
      });
      return colors;
    }, */
    labels() {
      return this.kpiSets.map(iter => {
        return iter.map(kpi => kpi.label);
      });
    },
    dataset() {
      // force update without using watch deep that in this case for the nature
      // of the object to watch won't work
      let val = this.force_update;

      const datasets = [];
      this.kpiSets.forEach((group, group_index) => {
        if (!datasets[group_index]) datasets[group_index] = [];

        let _group = {};
        let group_colors = [];
        let group_data = [];
        let date_range = this.dateRanges[group_index];

        _group.visible = true;

        let group_length = group.length;

        let first_range = {
          visible: true,
          color: [],
          backgroundColor: [],
          data: []
        };

        let second_range = {
          visible: true,
          color: [],
          backgroundColor: [],
          data: []
        };

        group.map(kpi => {
          first_range.data.push(
            this.getResourceInRange(
              kpi.field,
              date_range[0].startDate,
              date_range[0].endDate
            )
          );
          first_range.color.push(this.colors[group_index][0]);
          first_range.backgroundColor.push(this.colors[group_index][0]);

          second_range.data.push(
            this.getResourceInRange(
              kpi.field,
              date_range[1].startDate,
              date_range[1].endDate
            )
          );
          second_range.color.push(this.colors[group_index][1]);
          second_range.backgroundColor.push(this.colors[group_index][1]);
        });
        datasets[group_index] = [first_range, second_range];
      });
      return datasets;
    }
  },
  watch: {}
};
</script>
