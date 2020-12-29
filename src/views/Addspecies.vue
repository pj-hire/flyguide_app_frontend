<template>
  <div class="about">
    <h1>Add a Species</h1>

    <div>
      Species: <input v-model="newSpecies.speciesName">
    </div>
    <!-- <div>
      <input type="radio" id="dryFly" value="dryFly" v-model="newFly.flyType">
      <label for="dryFly">Dry Fly</label>
      <input type="radio" id="nymph" value="nymph" v-model="newFly.flyType">
      <label for="nymph">Nymph</label>
      <input type="radio" id="streamer" value="streamer" v-model="newFly.flyType">
      <label for="streamer">Streamer</label>
    </div> -->
    <div class="btn-group btn-group-toggle">
      <label class="btn btn-secondary active">
        <input type="radio" name="options" value="coldWater" id="option1"  v-model="newSpecies.habitat" autocomplete="off" checked> Cold Water
      </label>

      <label class="btn btn-secondary">
       <input type="radio" name="options"  value="warmWater" id="option2"  v-model="newSpecies.habitat" autocomplete="off"> Warm Water
      </label>

      <label class="btn btn-secondary active">
        <input type="radio" name="options" value="saltWater" id="option3"  v-model="newSpecies.habitat" autocomplete="off" checked> Salt Water
      </label>
    </div>

    <div>
      <button @click="addSpecies">Add Species</button>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

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
      axios.post('http://localhost:3000/addspecies', this.newSpecies)
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/targetspecies";
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
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
