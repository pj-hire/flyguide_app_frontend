<template>
  <div class="about">
    <h1>Stats</h1>
    <b-card>
      <h3 class="card-heading-lg center">Top 5 Flies</h3>
      <GChart
        type="ColumnChart"
        :data="chartDataOne"
        :options="chartOptionsOne"
      />
    </b-card>
    <b-card>
      <h3 class="card-heading-lg center">Fish Caught</h3>
      <GChart
        type="PieChart"
        :data="chartDataTwo"
        :options="chartOptionsTwo"
      />
    </b-card>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Stats",
  data() {
    return {
      user: {},
      hotFlies: {},
      flyPatterns: [],
      counts: {},
      finalData: [],
      sortedFinalData: [],
      chartDataOne: [
        ['Pattern', 'Frequency'],
      ],
      chartOptionsOne: {
        legend: {
          position: 'none'
        }
      },
      fishCaught: {},
      fishSpecies: [],
      fishCounts: [],
      newFishArray: [],
      finalDataTwo: [],
      chartDataTwo: [
        ['Species', 'Quantity'],
      ],
      chartOptionsTwo: {
        // title: 'Top Flies',
      },
    }
  },
  methods: {

    // findRainbow(fish, index) {
    //   return fish[0] === 'Brown Trout';
    //   console.log(index);
    // },

    pageLoad() {

      //Top Flies
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies-uid/' + this.user.uid)
        .then((response) => {
          this.hotFlies = response.data;
        })
        .then(() => {
          for (let fly of this.hotFlies) {
            this.flyPatterns.push(fly.pattern);
          }
        })
        .then(() => {
          var counts = {};
          this.flyPatterns.forEach(function(x) {
            counts[x] = (counts[x] || 0) + 1;
          })
          this.counts = counts;
        })
        .then(() => {
          for (let name in this.counts) {
            let arr = [];
            arr.push(name);
            arr.push(this.counts[name]);
            this.finalData.push(arr);
          }
        })
        .then(() => {
          this.finalData.sort(function(a, b){return b[1] - a[1]});
          this.sortedFinalData = this.finalData.slice(0,5);
        })
        .then(() => {
          for (let item of this.sortedFinalData) {
            this.chartDataOne.push(item);
          }
        })
        .catch((error) => {
          console.log(error);
        })

      //Fish Caught
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught-uid/' + this.user.uid)
        .then((response) => {
          this.fishCaught = response.data;
        })
        .then(() => {
          for (let fish of this.fishCaught) {
            let arr = [];

            let fishIndex = this.fishCounts.findIndex((fishCountsFish) => {
              return fish.speciesName === fishCountsFish[0];
            })

            if (fishIndex === -1) {
              arr.push(fish.speciesName);
              arr.push(fish.qtyCaught);
              this.fishCounts.push(arr);
            } else {
              this.fishCounts[fishIndex][1] += fish.qtyCaught;
            }
          }
        })
        .then(() => {
          console.log(this.fishCounts);
          for (let item of this.fishCounts) {
            this.chartDataTwo.push(item);
          }
        })
        .catch((error) => {
          console.log(error);
        })

    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
        this.pageLoad();
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>

<style>

body {
  background-color: lightgray;
}

</style>
