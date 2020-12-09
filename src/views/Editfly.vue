<template>
  <div class="about">
    <h1>Edit fly</h1>
    <div>
      Pattern: <input v-model="newFly.flyPattern">
    </div>
    <div>
      <input type="radio" id="dryFly" value="dryFly" v-model="newFly.flyType">
      <label for="dryFly">Dry Fly</label>
      <input type="radio" id="nymph" value="nymph" v-model="newFly.flyType">
      <label for="nymph">Nymph</label>
      <input type="radio" id="streamer" value="streamer" v-model="newFly.flyType">
      <label for="streamer">Streamer</label>
    </div>
    <div>
      <button @click="saveChanges">Save Changes</button>
      <button @click="deleteFly">Delete Fly</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Editfly",
  data() {
    return {
      user: {},
      newFly: {}
    }
  },
  methods: {
    saveChanges() {
      axios.put('http://localhost:3000/editfly', this.newFly)
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/flybox";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteFly() {
      axios.post('http://localhost:3000/deletefly', this.newFly)
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:8080/flybox";
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
        this.newFly.uid = user.uid;
        //fetch current fly to edit below
        axios.get('http://localhost:3000/flybox/editfly/' + this.$route.params.id)
          .then((response) => {
            this.newFly = response.data;
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
