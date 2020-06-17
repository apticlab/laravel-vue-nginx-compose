<template>
  <div>
    <section-title title="Classifica Engagers"></section-title>
    <loading v-if="loading"></loading>
    <div class="rounded bg-white shadow" v-if="!loading">
      <div class="flex justify-between border-b border-gray-200 px-8 bg-indigo-100">
        <div class="rounded px-4 py-5" :key="accountType.label" v-for="accountType in accountTypes">
          <div
            :class="{
              ['text-' + accountType.color]: true,
              ['border-' + accountType.color]: true
            }"
            class="uppercase tracking-wider text-white rounded font-medium flex items-center"
          >
            <span
              :class="{
                ['bg-' + accountType.color]: true
              }"
              class="w-3 h-3 rounded-full mr-2 leading-6"
            ></span>
            <span class="leading-6">{{ accountType.label }}</span>
          </div>
          <div class="flex mt-2">
            <div class="flex items-center">
              <i
                :class="{
                  ['text-' + accountType.color]: true
                }"
                class="hi-view mr-3 leading-5 text-xl"
              ></i>
              <div
                class="text-gray-700 text-xl leading-5"
              >{{ year_insigths[accountType.field].view }}</div>
            </div>
            <div class="flex items-center ml-8">
              <i
                :class="{
                  ['text-' + accountType.color]: true
                }"
                class="zi-thumbs-up text-xl mr-3"
              ></i>
              <span class="text-gray-700 text-xl">
                {{
                year_insigths[accountType.field].like
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex px-5">
          <div class="flex-grow-2">
            <chart
              class="mt-8 h-64"
              type="stacked_bar"
              :datasets="datasets[currentChoice.code]"
              :labels="labels.line"
            ></chart>
          </div>
          <div class="flex-grow">
            <chart
              class="mt-8 h-64"
              type="doughnut"
              :datasets="getSum(datasets[currentChoice.code])"
              :labels="labels.doughnut"
              :grid='false'
            ></chart>
          </div>
        </div>
        <div class="flex items-center border-t border-gray-200 px-5 mt-12">
          <p
            class="text-gray-600 mr-20 text-lg"
          >Selezionare quale KPI si vuole visualizzare sul grafico:</p>
          <div class="grid grid-cols-3 py-6 flex-grow">
            <div
              @click="viewSelected = index"
              class="flex items-center cursor-pointer"
              :key="choice.code"
              v-for="(choice, index) in viewChoices"
            >
              <i
                :class="{
                  'bg-gray-500': choice.code != currentChoice.code,
                  ['bg-' + choice.color]: choice.code == currentChoice.code,
                  [choice.icon]: true
                }"
                class="mr-4 w-10 h-10 rounded-full text-white leading-10 block text-center"
              ></i>
              <span
                :class="{
                  'text-gray-700': choice.code == currentChoice.code,
                  'text-gray-400': choice.code != currentChoice.code
                }"
                class="text-lg select-none"
              >{{ choice.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { helpers } from "@/utils/helpers.js";
import filters from "@/utils/filters.js";

export default {
  data() {
    return {
      year_selected: 2020,
      labels: {
        line: [
          "Gen",
          "Feb",
          "Mar",
          "Apr",
          "Mag",
          "Giu",
          "Lug",
          "Ago",
          "Set",
          "Ott",
          "Nov",
          "Dic"
        ],
        doughnut: ["Big Account", "Influencer", "Small Account"]
      },
      accountTypes: [
        {
          label: "Big Account",
          field: "big",
          icon: "",
          visible: true,
          color: "indigo-600"
        },
        {
          label: "Influencer",
          field: "medium",
          icon: "",
          visible: true,
          color: "green-600"
        },
        {
          label: "Small Account",
          field: "small",
          icon: "",
          visible: true,
          color: "orange-600"
        }
      ],
      viewSelected: 0,
      viewChoices: [
        {
          label: "Like",
          icon: "zi-thumbs-up",
          code: "like",
          color: "indigo-500"
        },
        {
          label: "View",
          icon: "hi-view",
          code: "view",
          color: "green-500"
        },
        {
          label: "Like + View",
          icon: "hi-plus",
          code: "like-view",
          color: "purple-500"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    getSum(datasets) {
      let bigAccountTotal = datasets[0].data.reduce((a, b) => a + b);
      let influencerTotal = datasets[1].data.reduce((a, b) => a + b);
      let smallAccountTotal = datasets[2].data.reduce((a, b) => a + b);

      return [
        {
          visible: true,
          data: [bigAccountTotal, influencerTotal, smallAccountTotal],
          colors: [
            this.getColor(datasets[0].color),
            this.getColor(datasets[1].color),
            this.getColor(datasets[2].color)
          ]
        }
      ];
    },
    getMonthByNumber(month_number) {
      return this.year.months.find(month => {
        return month.month === month_number;
      });
    },
    isMultipleActions(action) {
      return action.indexOf("-");
    },
    getMultipleActions(actions) {
      return actions.split("-");
    }
  },
  computed: {
    ...mapState("activities", {
      loading: state => state.loading,
      engagers: state => {
        const years = {};

        state.engagers.forEach(data => {
          const year = data._id.year;
          console.log(year);
          const month = data._id.month;
          console.log(month);
          
          const insights = helpers.clone(data);
          console.log(insights);
          delete insights._id;

          if (!year) {
            return 0;
          }

          if (!years[year]) {
            years[year] = {
              year,
              months: []
            };
          }

          years[year].months.push({
            month,
            insights
          });
        });

        return years;
      }
    }),
    datasets() {
      const dataset = {};
      this.viewChoices.map(({ code: action }) => {
        dataset[action] = this.accountTypes.map(influence => {
          // itero sui mesi dell'anno
          const month_data = this.labels.line.map((month_name, index) => {
            const month_data = this.getMonthByNumber(index);
            if (!month_data) {
              return 0;
            }

            const month_insights = month_data.insights;
            if (!month_insights) {
              return 0;
            }

            const insight = month_insights[influence.field];
            if (!insight) {
              return 0;
            }

            if (this.isMultipleActions(action)) {
              let actions = this.getMultipleActions(action);
              let multiple_insights = 0;
              actions.forEach(action => {
                multiple_insights += insight[action];
              });
              return multiple_insights;
            }

            return insight[action] || 0;
          });

          return {
            ...influence,
            data: month_data
          };
        });
      });
      return dataset;
    },
    currentChoice() {
      return this.viewChoices[this.viewSelected];
    },
    year() {
      return this.engagers[this.year_selected];
    },
    year_insigths() {
      const big_account = {
        like: 0,
        view: 0
      };
      const influencer = {
        like: 0,
        view: 0
      };
      const small_account = {
        like: 0,
        view: 0
      };

          this.year.months.forEach(({ insights }) => {
            big_account.like += insights.big.like;
            big_account.view += insights.big.view;

            influencer.view += insights.medium.view;
            influencer.like += insights.medium.like;

            small_account.like += insights.small.like;
            small_account.view += insights.small.view;
          });


      return {
        big: big_account,
        medium: influencer,
        small: small_account
      };
    }
  }
};
</script>
