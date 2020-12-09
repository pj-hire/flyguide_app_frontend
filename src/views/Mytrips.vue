<template>
  <div class="about">
    <h1>My Trips</h1>
    <p>Name: {{ this.user.displayName }}</p>
    <p>Email: {{ this.user.email }}</p>

  </div>
</template>

<script>

//import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Mytrips",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    // pageLoad() {
    //   axios.get('http://localhost:3000/created/' + this.user.uid)
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
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
