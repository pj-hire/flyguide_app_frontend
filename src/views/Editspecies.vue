<template>
  <div class="about">
    <h1>Edit Species</h1>
    <b-card class="center">
      <div class="pattern">
        <span><h4>Species: <input v-model="newSpecies.speciesName"></h4></span>
      </div>
      <div class="fly-type">
        <div>
          <input type="radio" id="option1" value="coldWater" v-model="newSpecies.habitat">
          <label for="option1"><h5>Cold Water</h5></label>
        </div>
        <div>
          <input type="radio" id="option2" value="warmWater" v-model="newSpecies.habitat">
          <label for="option2"><h5>Warm Water</h5></label>
        </div>
        <div>
          <input type="radio" id="option3" value="saltWater" v-model="newSpecies.habitat">
          <label for="option3"><h5>Salt Water</h5></label>
        </div>
      </div>
      <div class="button-add-fly">
        <b-button @click="saveChanges">Save Changes</b-button>
        <b-button @click="deleteSpecies">Delete Species</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

export default {
  name: "Editspecies",
  data() {
    return {
      user: {},
      newSpecies: {}
    }
  },
  methods: {
    saveChanges() {
      this.newSpecies.speciesName = jsStringEscape(this.newSpecies.speciesName);
      axios.put('http://localhost:3000/editspecies', this.newSpecies)
        .then((response) => {
          console.log(response);
          this.$router.push('/targetspecies');
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteSpecies() {
      axios.post('http://localhost:3000/deletespecies', this.newSpecies)
        .then((response) => {
          console.log(response);
          this.$router.push('/targetspecies');
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
        this.newSpecies.uid = user.uid;
        //fetch current fly to edit below
        axios.get('http://localhost:3000/targetspecies/editspecies/' + this.$route.params.id)
          .then((response) => {
            this.newSpecies = response.data;
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
