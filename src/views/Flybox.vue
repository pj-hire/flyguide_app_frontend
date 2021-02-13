<template>
  <div class="about">

    <h1>Flybox</h1>

    <b-card>

      <div class="addButton">
        <router-link to="/flybox/addfly"><b-button class="addButton" variant="success" size="lg">Add Fly +</b-button></router-link>
      </div>

      <h3 class="card-heading-lg">Dry Flies:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'dryFly'">
          <router-link class="card-list-container" :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link>
        </div>
      </div>

      <h3 class="card-heading-lg">Nymphs:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'nymph'">
          <router-link class="card-list-container" :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link>
        </div>
      </div>

      <h3 class="card-heading-lg">Streamers:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'streamer'">
          <router-link class="card-list-container" :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link>
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
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'flybox/' + this.user.uid)
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

        axios.get(process.env.VUE_APP_REQUEST_BASE + 'flybox/editfly/' + this.$route.params.id)
          .then(response => {
            this.specificFly = response.data;
          })
          .catch(err => {
            throw err;
          })

      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
