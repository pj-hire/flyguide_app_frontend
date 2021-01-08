<template>
  <div class="about">
    <b-card>
      <div>{{ tripType }} - {{ trips[0].date }}</div>
      <div>{{ trips[0].guideTripNumberInParty }} Clients - {{ guideTripType }}</div>
      <hr>
      <div v-if="trips[0].guideOrPersonalTrip === 'guideTrip'">
        <div>Clients:</div>
        <b-card v-for="client in clients" :key="client.clientId">
          <div>{{client.clientFirstName}} {{ client.clientLastName }}</div>
          <div>{{client.clientEmail}}</div>
          <div>{{client.clientPhone}}</div>
          <div>{{client.clientNotes}}</div>
        </b-card>
      </div>
      <div>
        <div>Reports:</div>
        <b-card v-for="report in reports" :key="report.reportId">

          <div>{{ report.notes }}</div>

        </b-card>
      </div>
    </b-card>
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
      clients: {},
      reports: {},
      tripType: '',
      guideTripType: '',

    }
  },
  methods: {
    pageLoad() {

      //bring in trip by tripId param
      axios.get('http://localhost:3000/viewtrip/' + this.$route.params.id)
        .then((response) => {
          this.trips = response.data;

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
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring reports in by tripId param
      axios.get('http://localhost:3000/viewtripreports/' + this.$route.params.id)
        .then((response) => {
          this.reports = response.data;
        })
        .then(() => {
          //'in' bring back the index of the report
          for (let report in this.reports) {
            axios.get('http://localhost:3000/hotflies/' + this.reports[report].reportId)
              .then((response) => {
                //creates hotflies array into report object
                this.reports[report].hotFlies = response.data;
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
