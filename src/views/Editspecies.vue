<template>
  <div class="about">
    <h1>Edit Species</h1>
    <div>
      Species: <input v-model="newSpecies.speciesName">
    </div>
    <div>
      <input type="radio" id="coldWater" value="coldWater" v-model="newSpecies.habitat">
      <label for="coldWater">Cold Water</label>
      <input type="radio" id="warmWater" value="warmWater" v-model="newSpecies.habitat">
      <label for="warmWater">Warm Water</label>
      <input type="radio" id="saltWater" value="saltWater" v-model="newSpecies.habitat">
      <label for="saltWater">Salt Water</label>
    </div>
    <div>
      <button @click="saveChanges">Save Changes</button>
      <button @click="deleteSpecies">Delete Species</button>
    </div>
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
