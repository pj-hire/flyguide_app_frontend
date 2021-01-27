<template>
  <div class="about">

    <h1>Target Species</h1>

    <div class="addButton">
      <router-link to="/targetspecies/addspecies"><b-button class="addButton" variant="success">Add Species +</b-button></router-link>
    </div>  

    <b-card>
      <h3>Cold Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'coldWater'">
          <div class="box"><router-link :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link></div>
        </div>
      </div>
    </b-card>

    <b-card>
      <h3>Warm Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'warmWater'">
          <div class="box"><router-link :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link></div>
        </div>
      </div>
    </b-card>

    <b-card>
      <h3>Salt Water:</h3>
      <div v-for="species in targetSpecies" :key="species.fishSpeciesId">
        <div v-if="species.habitat === 'saltWater'">
          <div class="box"><router-link :to="'/targetspecies/editspecies/' + species.fishSpeciesId">{{ species.speciesName }}</router-link></div>
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
      axios.get('http://localhost:3000/targetspecies/' + this.user.uid)
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
        // axios.get('http://localhost:3000/flybox/editfly/' + this.$route.params.id)
        //   .then(response => {
        //     this.specificFly = response.data;
        //   })
        //   .catch(err => {
        //     throw err;
        //   })
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
