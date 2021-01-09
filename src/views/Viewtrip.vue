<template>
  <div class="about">
    <b-card v-if="tripIsLoaded === true">
      <div>{{ tripType }} - {{ trips[0].date }}</div>
      <div>{{ trips[0].guideTripNumberInParty }} Clients - {{ guideTripType }}</div>
      <hr>
      <div v-if="clientsIsLoaded === true">
        <div v-if="trips[0].guideOrPersonalTrip === 'guideTrip'">
          <div>Clients:</div>
          <b-card v-for="client in clients" :key="client.clientId">
            <div>{{client.clientFirstName}} {{ client.clientLastName }}</div>
            <div>{{client.clientEmail}}</div>
            <div>{{client.clientPhone}}</div>
            <div>{{client.clientNotes}}</div>
          </b-card>
        </div>
      </div>
      <div v-if="reportsIsLoaded === true && hotFliesIsLoaded === true && fishCaughtIsLoaded === true && mySpotsIsLoaded === true">
        <div>Reports:</div>
        <b-card v-for="report in reports" :key="report.reportId">
          <div>{{ report.mySpots[0].locationName }} at {{ report.mySpots[0].subLocationName }}</div>
          <div>Hot Flies:</div>
          <div v-for="hotFly in report.hotFlies" :key="hotFly.hotFliesId">
            <li>#{{ hotFly.size }} {{ hotFly.pattern }} ({{ hotFly.color }})</li>
          </div>
          <div>Fish Caught:</div>
          <div v-for="fish in report.fishCaught" :key="fish.fishCaughtId">
            <li>{{ fish.speciesName }}: {{ fish.qtyCaught }}</li>
          </div>
          <div>Report Notes: {{ report.notes }}</div>
        </b-card>
      </div>
      <div>
        <div>Trip Notes:</div>
        <b-card>
          <div>{{ trips[0].tripNotes }}</div>
        </b-card>
      </div>
    </b-card>
    <b-button @click="deleteTrip">Delete Trip</b-button>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Viewtrip",
  data() {
    return {
      user: {},
      trips: {},
      tripIsLoaded: false,
      clients: {},
      clientsIsLoaded: false,
      reports: {},
      reportsIsLoaded: false,
      hotFliesIsLoaded: false,
      fishCaughtIsLoaded: false,
      mySpotsIsLoaded: false,
      tripType: '',
      guideTripType: '',

    }
  },
  methods: {
    deleteTrip() {
      console.log('delete trip');
    },
    pageLoad() {
      //bring in trip by tripId param
      axios.get('http://localhost:3000/viewtrip/' + this.$route.params.id)
        .then((response) => {
          this.trips = response.data;
          this.tripIsLoaded = true;

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
      axios.get('http://localhost:3000/viewtripclients/' + this.$route.params.id)
        .then((response) => {
          this.clientsIsLoaded = true;
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring reports in by tripId param
      axios.get('http://localhost:3000/viewtripreports/' + this.$route.params.id)
        .then((response) => {
          this.reportsIsLoaded = true;
          this.reports = response.data;
        })
        .then(() => {
          //'in' brings in the index of the report
          for (let report in this.reports) {
            //bring in hotFlies
            axios.get('http://localhost:3000/hotflies/' + this.reports[report].reportId)
              .then((response) => {
                //creates hotflies array into report object
                this.reports[report].hotFlies = response.data;
                this.hotFliesIsLoaded = true;
              })
              .catch((error) => {
                console.log(error);
              })
            //bring in fishCaught
            axios.get('http://localhost:3000/fishcaught/' + this.reports[report].reportId)
              .then((response) => {
                //creates hotflies array into report object
                this.reports[report].fishCaught = response.data;
                this.fishCaughtIsLoaded = true;
              })
              .catch((error) => {
                console.log(error);
              })
            //bring in mySpots
            axios.get('http://localhost:3000/myspotsviewtrip/' + this.reports[report].spotId)
              .then((response) => {
                //creates hotflies array into report object
                this.reports[report].mySpots = response.data;
                this.mySpotsIsLoaded = true;
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
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
