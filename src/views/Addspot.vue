<template>
  <div class="about">
    <h1>Add a Spot</h1>

    <div>
      Body of Water: <input v-model="newSpot.locationName">
      Section/Area: <input v-model="newSpot.subLocationName">
    </div>

    <div>
      <button @click="addSpot">Add Spot</button>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

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
      axios.post('http://localhost:3000/addspot', this.newSpot)
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/myspots";
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
