<template>
  <div class="about">
    <h1>Edit fly</h1>
    <b-card class="center">
      <div class="pattern">
        <span><h4>Pattern: <input v-model="newFly.flyPattern"></h4></span>
      </div>
      <div class="fly-type">
        <div>
          <input type="radio" id="dryFly" value="dryFly" v-model="newFly.flyType">
          <label for="dryFly"><h5>Dry Fly</h5></label>
        </div>
        <div>
          <input type="radio" id="nymph" value="nymph" v-model="newFly.flyType">
          <label for="nymph"><h5>Nymph</h5></label>
        </div>
        <div>
          <input type="radio" id="streamer" value="streamer" v-model="newFly.flyType">
          <label for="streamer"><h5>Streamer</h5></label>
        </div>
      </div>
      <div class="button-add-fly">
        <b-button @click="saveChanges">Save Changes</b-button>
        <b-button @click="deleteFly">Delete Fly</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

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
      this.newFly.flyPattern = jsStringEscape(this.newFly.flyPattern);
      axios.put('http://localhost:3000/editfly', this.newFly)
        .then((response) => {
          console.log(response);
          this.$router.push('/flybox');
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteFly() {
      axios.post('http://localhost:3000/deletefly', this.newFly)
        .then((response) => {
          console.log(response);
          this.$router.push('/flybox');
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
