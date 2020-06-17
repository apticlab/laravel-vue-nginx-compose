<template lang="html">
  <section v-if="!loading">
    <section-title title="Distribuzione Geografica Followers"></section-title>
    <div class="grid grid-cols-5 gap-3 card mb-8 pr-8">
      <div class="col-span-3">
        <span class="text-gray-600">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </span>
        <div class="grid grid-cols-2 justify-center">
          <div>
            <div
              :key="country.code"
              v-for="country in countryValues"
              class="my-3 flex items-center grid grid-cols-7"
            >
              <country-flag
                :country="country.code"
                size="normal"
              ></country-flag>
              <span class="col-span-4 text-gray-600">{{ country.name }}</span>
              <span class="text-lg text-indigo-600 font-bold">{{
                country.value
              }}</span>
            </div>
          </div>
          <div>
            <div
              :key="city.country.code"
              v-for="city in cityValues"
              class="my-3 flex items-center grid grid-cols-7"
            >
              <country-flag
                :country="city.country.code"
                size="normal"
              ></country-flag>
              <span class="col-span-4 text-gray-600">{{ city.name }}</span>
              <span class="text-lg text-green-600 font-bold">{{
                city.value
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-5 col-span-2">
        <svg id="my_dataviz" width="400" height="300"></svg>
      </div>
    </div>
  </section>
</template>

<script>
import * as d3 from "d3";
import json from "@/utils/world.json";
import { mapState } from "vuex";
import { getCountryCode, EXTENDED_CODE } from "@/services/countries";

export default {
  name: "audience-geo-distribution",
  props: [],
  data() {
    return {
      world: json,
      old_cityValues: [
        {
          value: 956,
          country: {
            code: "AUS",
            name: "Australia"
          },
          name: "Camberra"
        },
        {
          value: 789,
          country: {
            code: "ITA",
            name: "Italia"
          },
          name: "Verona"
        },
        {
          value: 678,
          country: {
            code: "USA",
            name: "Stati Uniti d'America"
          },
          name: "Verona (CA)"
        },
        {
          value: 500,
          country: {
            code: "BEL",
            name: "Belgio"
          },
          name: "Brussels"
        },
        {
          value: 300,
          country: {
            code: "ARE",
            name: "Emirati Arabi Uniti"
          },
          name: "Abu Dhabi"
        }
      ]
    };
  },
  mounted() {
    // Data and color scale
    this.drawMap();
  },
  methods: {
    drawMap() {
      let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

      let projection = d3
        .geoMercator()
        .scale(70)
        .center([0, 20])
        .translate([width / 2, height / 2]);

      let colorScale = d3
        .scaleThreshold()
        .domain([1, 100, 1000])
        .range(d3.schemeBlues[3]);

      // Draw the map
      svg
        .append("g")
        .selectAll("path")
        .data(this.world.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath().projection(projection))
        // set the color of each country
        .attr("fill", d => {
          d.total = this.countryValues.some(c => c.code == d.id) ? 1000 : 0;
          return colorScale(d.total);
        });
    }
  },
  computed: {
    ...mapState("audience", {
      loading: state => state.loading,
      cityValues: state => {
        return state.geo_distribution.cities.map(city => {
          return {
            name: city.label,
            value: city.value,
            country: {
              // al momento country rimane non definito
              code: "ITA",
              name: "Italia"
            }
          };
        });
      },
      countryValues: state => {
        return state.geo_distribution.countries.map(country => {
          return {
            code: getCountryCode(country.label, EXTENDED_CODE),
            name: country.label,
            value: country.value
          };
        });
      }
    })
  }
};
</script>
