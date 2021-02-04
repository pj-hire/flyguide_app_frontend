<template>
  <div class="about">
    <h1>Add Spot</h1>
    <b-card class="center">
      <div class="pattern">
        <span><h4>Body of Water: <input v-model="newSpot.locationName"></h4></span>
        <span><h4>Section/Area: <input v-model="newSpot.subLocationName"></h4></span>
      </div>
      <div>
        <b-button @click="addSpot">Add Spot</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

export default {
  name: "Addspot",
  data() {
    return {
      user: {},
      newSpot: {
        locationName: '',
        subLocationName: '',
        uid: ''
      }
    }
  },
  methods: {
    addSpot() {
      this.newSpot.locationName = jsStringEscape(this.newSpot.locationName);
      this.newSpot.subLocationName = jsStringEscape(this.newSpot.subLocationName);
      axios.post('http://localhost:3000/addspot', this.newSpot)
        .then((response) => {
          console.log(response);
          this.$router.push('/myspots');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        this.user = user;
        this.newSpot.uid = user.uid;
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
