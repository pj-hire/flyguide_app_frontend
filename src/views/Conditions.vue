<template>
  <div class="about">
    <h1>Conditions</h1>
    <p>Name: {{ this.user.displayName }}</p>
    <p>Email: {{ this.user.email }}</p>

  </div>
</template>

<script>

//import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Conditions",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    // pageLoad() {
    //   axios.get(process.env.VUE_APP_REQUEST_BASE + 'created/' + this.user.uid)
    //     .then((response) => {
    //       this.veggies = response.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
        //this.pageLoad();
      } else {
        console.log('no user signed in')
        this.$router.push('/')
      }
    })
  }
}

</script>
