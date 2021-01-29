<template>
  <div class="about">
    <h1>Stats</h1>
    <b-card>
      <h3>Top Flies</h3>
      <GChart
        type="ColumnChart"
        :data="chartDataOne"
        :options="chartOptionsOne"
      />
    </b-card>
    <b-card>
      <h3>Fish Caught</h3>
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
        // title: 'Top Flies',
      },
      fishCaught: {},
      fishSpecies: [],
      fishCounts: [],
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
    pageLoad() {
      axios.get('http://localhost:3000/hotfliesstats/' + this.user.uid)
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


      axios.get('http://localhost:3000/fishcaughtstats/' + this.user.uid)
        .then((response) => {
          this.fishCaught = response.data;
        })
        .then(() => {
          for (let fish of this.fishCaught) {
            let arr = [];
            arr.push(fish.speciesName);
            arr.push(fish.qtyCaught);
            this.fishCounts.push(arr);
          }
        })
        .then(() => {
          console.log(this.fishCounts);
          for (let fish of this.fishCounts) {
            console.log(fish[0]);
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
        window.location.href = "http://127.0.0.1:8080/";
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
