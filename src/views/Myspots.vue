<template>
  <div class="about">

    <h1>My Spots</h1>

    <b-card>

      <div class="addButton">
        <router-link to="/myspots/addspot"><b-button class="addButton" variant="success" size="lg">Add Spot +</b-button></router-link>
      </div>

      <div v-for="spot in mySpots" :key="spot.spotId">
        <router-link class="card-list-container" :to="'/myspots/editspot/' + spot.spotId">{{ spot.locationName }} at {{ spot.subLocationName }}</router-link>
      </div>

    </b-card>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Myspots",
  data() {
    return {
      user: {},
      mySpots: {}
    }
  },
  methods: {
    pageLoad() {
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'myspots/' + this.user.uid)
        .then((response) => {
          this.mySpots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.uid);
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
