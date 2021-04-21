<template>
  <div class="about">
    <h1>Trip Report</h1>
    <b-card>
      <div>
        <h2>{{ tripType }}</h2>
      </div>
      <div>
        <h4 class="viewtrip-heading-h4">{{ formatDate(trips.date) }}</h4>
      </div>
      <div class="viewtrip-heading-h5" v-if="tripType === 'Guide Trip'">
        <h5>{{ guideTripType }} - {{ trips.guideTripNumberInParty }} {{ client }}</h5>
      </div>
      <hr class="hr">
      <div class="viewtrip-list-container" v-if="trips.guideOrPersonalTrip === 'guideTrip'">
        <b-card-title>{{client}}:</b-card-title>
        <b-card class="viewtrip-list-card" v-for="client in clients" :key="client.clientId">
          <div><b>{{client.clientFirstName}} {{ client.clientLastName }}</b></div>
          <div>{{client.clientEmail}}</div>
          <div>{{client.clientPhone}}</div>
          <div>{{client.clientNotes}}</div>
        </b-card>
      </div>
      <div class="viewtrip-list-container">
        <b-card-title>Reports:</b-card-title>
        <b-card class="viewtrip-list-card" v-for="report in reports" :key="report.reportId">
          <div v-if="report.mySpots">
            <h5>{{ report.mySpots[0].locationName }} at {{ report.mySpots[0].subLocationName }}</h5>
          </div>
          <div class="viewtrip-list-bullet-container">
            <b><div>Hot Flies:</div></b>
            <div v-for="hotFly in report.hotFlies" :key="hotFly.hotFliesId">
              <div class="bullet">#{{ hotFly.size }} {{ hotFly.pattern }} ({{ hotFly.color }})</div>
            </div>
          </div>
          <div class="viewtrip-list-bullet-container">
            <b><div>Fish Caught:</div></b>
            <div v-for="fish in report.fishCaught" :key="fish.fishCaughtId">
              <div class="bullet">{{ fish.speciesName }}: {{ fish.qtyCaught }}</div>
            </div>
          </div>
          <div class="viewtrip-list-bullet-container">
            <b><div>Report Notes:</div></b>
            <div class="bullet" v-if="report.notes !== ''">{{ report.notes }}</div>
          </div>
        </b-card>
      </div>
      <div class="viewtrip-list-container">
        <b-card-title>Trip Notes:</b-card-title>
        <b-card class="viewtrip-list-card">
          <div>{{ trips.tripNotes }}</div>
        </b-card>
      </div>
      <div class="center">
        <b-button @click="deleteTrip">Delete Trip</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import moment from 'moment';

export default {
  name: "Viewtrip",
  data() {
    return {
      user: {},
      trips: {},
      clients: {},
      reports: {},
      tripType: '',
      guideTripType: '',
      client: 'Client',
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('ll');
    },
    deleteTrip() {
      //delete trip
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'trips/' + this.trips.tripId)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      //delete all clients associated with trip
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'clients-trip/' + this.trips.tripId)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      //delete all reports associated with trip
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'reports-trip/' + this.trips.tripId)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })

        if (this.reports !== []) {
          for (let report in this.reports) {
            console.log(this.reports[report]);

            //delete hotFlies associated with all reports associated with trip
            axios.delete(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.reports[report].reportId)
              .then((response) => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

            //delete fishCaught associated with all report associated with trip
            axios.delete(process.env.VUE_APP_REQUEST_BASE + 'fishcaught-trip/' + this.reports[report].reportId)
              .then((response) => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }

      this.$router.push('/mytrips');

    },
    pageLoad() {

      //bring in trip by tripId param
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'trips-trip/' + this.$route.params.id)
        .then((response) => {
          this.trips = response.data[0];

          if (response.data[0].guideOrPersonalTrip === 'guideTrip') {
            this.tripType = 'Guide Trip';
          } else if (response.data[0].guideOrPersonalTrip === 'personalTrip') {
            this.tripType = 'Personal Trip';
          }

          if (response.data[0].guideTripType === 'halfDayWade') {
            this.guideTripType = 'Half-Day Wade';
          } else if (response.data[0].guideTripType === 'fullDayWade') {
            this.guideTripType = 'Full-Day Wade';
          } else if (response.data[0].guideTripType === 'halfDayFloat') {
            this.guideTripType = 'Half-Day Float';
          } else if (response.data[0].guideTripType === 'fullDayFloat') {
            this.guideTripType = 'Full-Day Float';
          }

        })
        .catch((error) => {
          console.log(error);
        })

      //bring clients in by tripId param
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients/' + this.$route.params.id)
        .then((response) => {
          this.clients = response.data;
        })
        .then (() => {
          this.trips.guideTripNumberInParty = this.clients.length;
        })
        //pluralize client to clients
        .then (() => {
          if (this.clients.length > 1) {
            this.client = "Clients";
          }
        })
        .catch((error) => {
          console.log(error);
        })

      //bring reports in by tripId param
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'reports/' + this.$route.params.id)
        .then((response) => {
          this.reports = response.data;
        })
        .then(() => {
          //'in' brings in the index of the report
          for (let report in this.reports) {
            //bring in hotFlies
            axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.reports[report].reportId)
              .then((response) => {
                //creates hotflies array into report object
                this.$set(this.reports[report], 'hotFlies', response.data)
              })
              .catch((error) => {
                console.log(error);
              })
            //bring in fishCaught
            axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.reports[report].reportId)
              .then((response) => {
                //creates hotflies array in report object
                this.$set(this.reports[report], 'fishCaught', response.data)
              })
              .catch((error) => {
                console.log(error);
              })
            //bring in mySpots
            axios.get(process.env.VUE_APP_REQUEST_BASE + 'spots/' + this.reports[report].spotId)
              .then((response) => {
                //creates mySpots array in report object
                this.$set(this.reports[report], 'mySpots', response.data)
              })
              .catch((error) => {
                console.log(error);
              })
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
  },
}

</script>
