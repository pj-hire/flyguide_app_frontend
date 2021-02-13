<template>
  <div class="about">
    <h1>Edit Spot</h1>
    <b-card class="center">
      <div class="pattern">
        <span><h4>Body of Water: <input v-model="newSpot.locationName"></h4></span>
        <span><h4>Section/Area: <input v-model="newSpot.subLocationName"></h4></span>
      </div>
      <div class="button-add-fly">
        <b-button @click="saveChanges">Save Changes</b-button>
        <b-button @click="deleteSpot">Delete Spot</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

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
      this.newSpot.locationName = jsStringEscape(this.newSpot.locationName);
      this.newSpot.subLocationName = jsStringEscape(this.newSpot.subLocationName);
      axios.put(process.env.VUE_APP_REQUEST_BASE + 'editspot', this.newSpot)
        .then((response) => {
          console.log(response);
          this.$router.push('/myspots');
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteSpot() {
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'deletespot', this.newSpot)
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
        this.user = user;
        this.newSpot.uid = user.uid;
        //fetch current spot to edit below
        axios.get(process.env.VUE_APP_REQUEST_BASE + 'myspots/editspot/' + this.$route.params.id)
          .then((response) => {
            this.newSpot = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
