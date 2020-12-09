<template>
  <div class="about">
    <h1>Edit Spot</h1>
    <div>
      Body of Water: <input v-model="newSpot.locationName">
      Section/Area: <input v-model="newSpot.subLocationName">
    </div>
    <div>
      <button @click="saveChanges">Save Changes</button>
      <button @click="deleteSpot">Delete Spot</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Editspot",
  data() {
    return {
      user: {},
      newSpot: {}
    }
  },
  methods: {
    saveChanges() {
      axios.put('http://localhost:3000/editspot', this.newSpot)
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/myspots";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteSpot() {
      axios.post('http://localhost:3000/deletespot', this.newSpot)
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
        this.user = user;
        this.newSpot.uid = user.uid;
        //fetch current spot to edit below
        axios.get('http://localhost:3000/myspots/editspot/' + this.$route.params.id)
          .then((response) => {
            this.newSpot = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
