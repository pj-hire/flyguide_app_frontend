<template>
  <div class="about">
    <h1>Add Species</h1>
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
        <b-button @click="addSpecies">Add Species</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

export default {
  name: "Addspecies",
  data() {
    return {
      user: {},
      newSpecies: {
        speciesName: '',
        habitat: '',
        uid: ''
      }
    }
  },
  methods: {
    addSpecies() {
      this.newSpecies.speciesName = jsStringEscape(this.newSpecies.speciesName);
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'addspecies', this.newSpecies)
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
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
