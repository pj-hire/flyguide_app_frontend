<template>
  <div class="about">
    <h1>Add a fly</h1>

    <b-card>

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

    <!-- <div class="btn-group btn-group-toggle">
      <label class="btn btn-secondary active">
        <input type="radio" name="options" value="dryFly" id="option1"  v-model="newFly.flyType" autocomplete="off" checked> Dry Fly
      </label>

      <label class="btn btn-secondary">
       <input type="radio" name="options"  value="nymph" id="option2"  v-model="newFly.flyType" autocomplete="off"> Nymph
      </label>

      <label class="btn btn-secondary active">
        <input type="radio" name="options" value="streamer" id="option3"  v-model="newFly.flyType" autocomplete="off" checked> Streamer
      </label>
    </div> -->

    <div>
      <button @click="addFly">Add to Box</button>
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
      axios.post('http://localhost:3000/addfly', this.newFly)
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
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
