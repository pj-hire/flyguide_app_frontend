<template>
  <div class="about">
    <h1>My Trips</h1>
    <router-link to="/mytrips/addtrip"><button>Add a Trip</button></router-link>

    <div class="marginbox" v-for="trip in trips" :key="trip.tripId">
      <!-- Guide Trip -->
      <div v-if="trip.guideOrPersonalTrip === 'Guide Trip'">
        <router-link :to="'/mytrips/' + trip.tripId"><span v-if="trip.clients">{{ trip.clients[0] }}</span> - {{ tripDate }} - {{ trip.guideTripType }}</router-link>
      </div>
      <!-- Personal Trip -->
      <div v-if="trip.guideOrPersonalTrip === 'Personal Trip'">
        <router-link :to="'/mytrips/' + trip.tripId">{{ trip.guideOrPersonalTrip }} - {{ tripDate }}</router-link>
      </div>
    </div>

<!-- BELOW WONT WORK UNTIL THE ARRAY OF CLIENTS PUSHES INTO TRIPS -->

    <!-- <div class="box" v-for="trip in trips" :key="trip.tripId"
      <router-link :to="'/mytrips/' + trip.tripId">
        <div>{{ trip.clients[0].clientFirstName}} {{ trip.clients[0].clientLastName}}</div>
        <div v-if="trip.clients.length > 1">+ {{ trips.clients.length - 1}}</div>
        <div>{{ trip.date }}</div>
        <div>{{ trip.guideTripType}}</div>
      </router-link>
    </div> -->


  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment';

export default {
  name: "Mytrips",
  data() {
    return {
      user: {},
      trips: {},
      clients: {},
      tripDate: '',
    }
  },
  methods: {
    clientsToTrips() {
      for (let client of this.clients) {
        let tripIndex = this.trips.findIndex((trip) => {
          return trip.tripId === Number(client.tripId);
          //return the index of all the trips where tripId matches client Id
        })
        console.log(tripIndex);
        if (tripIndex !== -1) {
          if (this.trips[tripIndex].clients === undefined) {
            this.$set(this.trips.[tripIndex], 'clients', []);
          }
          this.trips[tripIndex].clients.push(client.clientFirstName + ' ' + client.clientLastName);
        }
      }
    },
    pageLoad() {

      this.tripDate = moment(this.trips.date).format('ll');

      axios.get('http://localhost:3000/trips/' + this.user.uid)
        .then((response) => {
          this.trips = response.data;
          axios.get('http://localhost:3000/mytripsclients/' + this.user.uid)
            .then((response) => {
              this.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              this.clientsToTrips();
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {

              for (let trip of this.trips) {
                if (trip.guideOrPersonalTrip === 'guideTrip') {
                  trip.guideOrPersonalTrip = 'Guide Trip';
                } else if (trip.guideOrPersonalTrip === 'personalTrip') {
                  trip.guideOrPersonalTrip = 'Personal Trip';
                }

                if (trip.guideTripType === 'halfDayWade') {
                  trip.guideTripType = 'Half-Day Wade';
                } else if (trip.guideTripType === 'fullDayWade') {
                  trip.guideTripType = 'Full-Day Wade';
                } else if (trip.guideTripType === 'halfDayFloat') {
                  trip.guideTripType = 'Half-Day Float';
                } else if (trip.guideTripType === 'fullDayFloat') {
                  trip.guideTripType = 'Full-Day Float';
                }
              }

            })
            .catch((error) => {
              console.log(error);
            })
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

.marginbox {
  border: solid 1px;
}

</style>
