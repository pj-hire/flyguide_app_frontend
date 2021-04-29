<template>
  <div class="about">
    <h1>My Trips</h1>
    <b-card>
      <div class="addButton">
        <router-link to="/mytrips/addtrip"><b-button variant="success" size="lg">Add Trip +</b-button></router-link>
      </div>
      <!-- render trips -->
      <div  v-for="trip in trips" :key="trip.tripId">
        <!-- Guide Trip -->
        <div v-if="trip.guideOrPersonalTrip === 'Guide Trip'">
          <router-link :to="'/mytrips/' + trip.tripId">
            <div class="card-list-container" v-if="trip.clients">
              <!-- left side -->
              <div class="flex-5">
                <div class="clientName">
                  {{ trip.clients[0] }}
                </div>
                <div class="client-number" v-if="trip.clients.length > 1">
                   + {{trip.clients.length -1}} more
                </div>
              </div>
              <!-- right side -->
              <div class="flex-3">
                <div class="trip-date">
                  {{ formatDate(trip.date) }}
                </div>
                <div class="guidetrip-type">
                  {{ trip.guideTripType }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <!-- Personal Trip -->
        <div v-if="trip.guideOrPersonalTrip === 'Personal Trip'">
          <router-link :to="'/mytrips/' + trip.tripId">
            <div class="card-list-container">
              <!-- left side -->
              <div class="flex-5">
                <div class="trip-type">
                  {{ trip.guideOrPersonalTrip }}
                </div>
              </div>
              <!-- right side -->
              <div class="flex-3">
                <div class="trip-date">
                  {{ formatDate(trip.date) }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </b-card>
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
    formatDate(date) {
      return moment(date).format('ll');
    },
    clientsToTrips() {
      for (let client of this.clients) {
        let tripIndex = this.trips.findIndex((trip) => {
          return trip.tripId === Number(client.tripId);
          //return the index of all the trips where tripId matches client Id
        })

        if (tripIndex !== -1) {
          if (this.trips[tripIndex].clients === undefined) {
            this.$set(this.trips.[tripIndex], 'clients', []);
          }
          this.trips[tripIndex].clients.push(client.clientFirstName + ' ' + client.clientLastName);
        }
      }
    },
    pageLoad() {

      // this.tripDate = moment(this.trips.date).format('ll');

      axios.get(process.env.VUE_APP_REQUEST_BASE + 'trips-uid/' + this.user.uid)
        .then((response) => {
          this.trips = response.data;
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients-uid/' + this.user.uid)
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
        this.$router.push('/')
      }
    })
  }
}

</script>
