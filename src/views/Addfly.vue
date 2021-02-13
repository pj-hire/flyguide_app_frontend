<template>
  <div class="about">
    <h1>Add Fly</h1>
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
        <b-button @click="addFly">Add to Box</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

export default {
  name: "Addfly",
  data() {
    return {
      user: {},
      newFly: {
        flyPattern: '',
        flyType: '',
        uid: ''
      }
    }
  },
  methods: {
    addFly() {
      this.newFly.flyPattern = jsStringEscape(this.newFly.flyPattern);
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'addfly', this.newFly)
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
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
