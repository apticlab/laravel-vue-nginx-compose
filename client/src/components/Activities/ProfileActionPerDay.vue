<template>
  <div v-if="!loading">
    <section-title v-if="false" title="Profile Actions"></section-title>
    <div class="shadow">
      <div class="pb-3 bg-white w-full flex flex-col items-center">
        <div class="bg-gray-400 w-full p-3 rounded-t">
          <p class="text-gray-700 uppercase font-semibold tracking-wider">Profile Actions</p>
          <span class="text-xs text-gray-600">Confronta due intervalli di tempo selezionando le date</span>
        </div>
        <div class="px-4 pt-6 flex flex-row items-center justify-between w-full py-2">
          <div class="flex flex-col items-center">
            <aw-datepicker
              ref="picker_0"
              v-model="dateRange[0]"
              @update="updateValues"
              @toggle="checkOpen"
              :maxDate="today"
              opens="right"
            >
              <template v-slot:input="picker_0" style="min-width: 350px;">
                {{ picker_0.startDate | date("LL") }} -
                {{ picker_0.endDate | date("LL") }}
              </template>
            </aw-datepicker>
            <span class="border-2 rounded w-full my-1" :class="'border-' + this.kpi[0].color"></span>
          </div>
          <div class="w-px h-8 bg-gray-600 rounded-md"></div>

          <div class="flex flex-col items-center">
            <aw-datepicker
              ref="picker_1"
              v-model="dateRange[1]"
              @update="updateValues"
              @toggle="checkOpen"
              :maxDate="today"
              opens="left"
            >
              <template v-slot:input="picker_1" style="min-width: 350px;">
                {{ picker_1.startDate | date("LL") }} -
                {{ picker_1.endDate | date("LL") }}
              </template>
            </aw-datepicker>
            <span class="border-2 rounded w-full my-1" :class="'border-' + this.kpi[1].color"></span>
          </div>
        </div>
      </div>
      <div class="px-5 py-3 rounded-b bg-white">
        <div class="flex flex-col">
          <div class="flex py-6 justify-around" v-if="false">
            <div
              @click="set.visible = !set.visible"
              class="flex items-center cursor-pointer mr-8"
              :key="set.label"
              v-for="set in kpi"
            >
              <i
                :class="{
                  'bg-gray-500': !set.visible,
                  ['bg-' + set.color]: set.visible,
                  [set.icon]: true
                }"
                class="mr-4 w-10 h-10 rounded-full text-white leading-10 block text-center"
              ></i>
              <span
                :class="{
                  'text-gray-700': set.visible,
                  'text-gray-400': !set.visible
                }"
                class="text-lg select-none"
              >{{ set.label }}</span>
            </div>
          </div>
          <chart class="mt-8 h-64" type="bar" :datasets="datasets" :labels="labels"></chart>
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
      today: this.moment().format("YYYY-MM-DD"),
      kpi: [
        {
          color: "indigo-300",
          visible: true
        },
        {
          color: "indigo-600",
          visible: true
        }
      ],
      Labels: [
        {
          value: "profile_visits",
          field: "profile_visits",
          visible: true
        },
        {
          value: "website_visits",
          field: "website_visits",
          visible: true
        },
        {
          value: "email",
          field: "email",
          visible: true
        },
        {
          value: "direction",
          field: "direction",
          visible: true
        },
        {
          value: "call",
          field: "call",
          visible: true
        },
        {
          value: "text",
          field: "text",
          visible: true
        }
      ],
      dateRange: [
        {
          startDate: this.moment().subtract(3, "weeks"),
          endDate: this.moment()
        },
        {
          startDate: this.moment().subtract(3, "weeks"),
          endDate: this.moment()
        }
      ]
    };
  },
  methods: {
    updateValues(value) {},
    checkOpen(value) {},
    getActionsAverageInRange(startDate, endDate = false) {
      // TODO: too much n-complexity. Reduce for-loops
      // get actions between range start and end date
      const filtered_actions = this.actions.profile_actions.filter(action => {
        const day = this.moment()
          .day(action.id.day)
          .week(action.id.week)
          .year(action.id.year);

        return endDate
          ? day.isBetween(startDate, endDate)
          : day.isBefore(startDate);
      });

      // actions sum
      const action_grouped = {};
      filtered_actions.forEach(({ actions }) => {
        Object.keys(actions).forEach(key => {
          if (!action_grouped[key]) {
            action_grouped[key] = 0;
          }
          action_grouped[key] += actions[key];
        });
      });

      Object.keys(action_grouped).forEach(key => {
        action_grouped[key] = Number(
          action_grouped[key] / filtered_actions.length
        ).toFixed(0);
      });

      return Object.values(action_grouped);
    }
  },
  computed: {
    ...mapState("activities", {
      loading: state => state.loading,
      actions: state => state.profile_actions
    }),
    average() {
      return this.getActionsAverageInRange(this.dateRange.startDate);
    },
    custom_range() {
      return this.getActionsAverageInRange(
        this.dateRange.startDate,
        this.dateRange.endDate
      );
    },
    labels() {
      return this.Labels.map(label => {
        return filters.translate(label.value);
      });
    },
    datasets() {
      return this.dateRange.map((range, index) => {
        return {
          ...this.kpi[index],
          data: this.getActionsAverageInRange(range.startDate, range.endDate)
        };
      });
    }
  }
};
</script>
