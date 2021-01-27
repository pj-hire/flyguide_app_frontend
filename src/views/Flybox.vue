<template>
  <div class="about">

    <h1>Flybox</h1>

    <div class="addButton">
      <router-link to="/flybox/addfly"><b-button class="addButton" variant="success">Add a Fly +</b-button></router-link>
    </div>  

    <b-card>
      <h3>Dry Flies:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'dryFly'">
          <div class="box"><router-link :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link></div>
        </div>
      </div>
    </b-card>

    <b-card>
      <h3>Nymphs:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'nymph'">
          <div class="box"><router-link :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link></div>
        </div>
      </div>
    </b-card>

    <b-card>
      <h3>Streamers:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'streamer'">
          <div class="box"><router-link :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link></div>
        </div>
      </div>
    </b-card>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Flybox",
  data() {
    return {
      user: {},
      flybox: {}
    }
  },
  methods: {
    pageLoad() {
      axios.get('http://localhost:3000/flybox/' + this.user.uid)
        .then((response) => {
          this.flybox = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        this.user = user;
        this.pageLoad();

        axios.get('http://localhost:3000/flybox/editfly/' + this.$route.params.id)
          .then(response => {
            this.specificFly = response.data;
          })
          .catch(err => {
            throw err;
          })

      } else {
        console.log('no user signed in')
        window.location.href = "http://localhost:8080/";
      }
    })
  }
}

</script>

<style>

.box {
  border: solid 1px;
  padding: 5px;
}

</style>
