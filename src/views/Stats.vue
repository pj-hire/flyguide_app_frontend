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
      <h3>Fish Caught - 2021</h3>
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
      finalDataOne: [],
      chartDataOne: [
        ['Pattern', 'Frequency'],
        // ['2014', 1000],
        // ['2015', 1170],
        // ['2016', 660],
        // ['2017', 1030]
      ],
      chartOptionsOne: {
        // title: 'Top Flies',
      },
      chartDataTwo: [
        ['Pattern', 'Frequency'],
        ['Brown Trout', 47],
        ['2015', 1170],
        ['2016', 660],
        ['2017', 1030]
      ],
      chartOptionsTwo: {
        // title: 'Top Flies',
      },
    }
  },
  methods: {
    pageLoad() {
      axios.get('http://localhost:3000/hotfliez/' + this.user.uid)
        .then((response) => {
          this.hotFlies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

        .then(() => {
          for (let fly of this.hotFlies) {
            this.flyPatterns.push(fly.pattern);
          }
        })
        .catch((error) => {
          console.log(error);
        })

        .then(() => {
          var counts = {};
          this.flyPatterns.forEach(function(x) {
            counts[x] = (counts[x] || 0) + 1;
          });
          this.counts = counts
          //console.log(this.counts)
        })
        .catch((error) => {
          console.log(error);
        })

        .then(() => {
          for (let name in this.counts) {
            let arr = [];
            arr.push(name);
            arr.push(this.counts[name]);
            this.finalData.push(arr);
          }
        })
        .catch((error) => {
          console.log(error);
        })

        .then(() => {
          //sort array from most to least

          this.finalDataOne = this.finalData.slice(0,5);
        })
        .catch((error) => {
          console.log(error);
        })

        .then(() => {
          for (let item of this.finalDataOne) {
            this.chartDataOne.push(item);
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
