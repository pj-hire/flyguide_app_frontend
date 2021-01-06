<template>
  <div class="about">
    <h1>My Trips</h1>
    <router-link to="/mytrips/addtrip"><button>Add a Trip</button></router-link>


    <div class="box" v-for="trip in trips" :key="trip.tripId">
      <div v-for="client in clients" :key="client.clientId">
        <div v-if="trip.tripId === client.tripId">
          {{ trip.tripId }}
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Mytrips",
  data() {
    return {
      user: {},
      trips: {},
      clients: {},
    }
  },
  methods: {
    pageLoad() {
      //bring trips in by uid
      axios.get('http://localhost:3000/trips/' + this.user.uid)
        .then((response) => {
          this.trips = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      //bring clients in by uid
      axios.get('http://localhost:3000/mytripsclients/' + this.user.uid)
        .then((response) => {
          this.clients = response.data;
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
