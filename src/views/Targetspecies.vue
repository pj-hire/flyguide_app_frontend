<template>
  <div class="about">

    <h1>Target Species</h1>

    <b-card>

      <div class="addButton">
        <router-link to="/targetspecies/addspecies"><b-button class="addButton" variant="success" size="lg">Add Species +</b-button></router-link>
      </div>

      <h3 class="card-heading-lg">Cold Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'coldWater'">
          <router-link class="card-list-container" :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link>
        </div>
      </div>

      <h3 class="card-heading-lg">Warm Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'warmWater'">
          <router-link class="card-list-container" :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link>
        </div>
      </div>

      <h3 class="card-heading-lg">Salt Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'saltWater'">
          <router-link class="card-list-container" :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link>
        </div>
      </div>

    </b-card>

    <!-- <div>
      <h3>Warm Water:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'nymph'">
          <div class="box"><router-link :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link></div>
        </div>
      </div>
    </div>

    <div>
      <h3>Salt Water:</h3>
      <div v-for="fly in flybox" :key="fly.flyId">
        <div v-if="fly.flyType === 'streamer'">
          <div class="box"><router-link :to="'/flybox/editfly/' + fly.flyId">{{ fly.flyPattern }}</router-link></div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Targetspecies",
  data() {
    return {
      user: {},
      targetSpecies: {}
    }
  },
  methods: {
    pageLoad() {
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'targetspecies/' + this.user.uid)
        .then((response) => {
          this.targetSpecies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.pageLoad();
        // axios.get(process.env.VUE_APP_REQUEST_BASE + 'flybox/editfly/' + this.$route.params.id)
        //   .then(response => {
        //     this.specificFly = response.data;
        //   })
        //   .catch(err => {
        //     throw err;
        //   })
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
