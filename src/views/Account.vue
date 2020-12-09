<template>
  <div class="about">
    <h1>This is the Account Page</h1>
    <p>Name: {{ this.user.displayName }}</p>
    <p>Email: {{ this.user.email }}</p>
    <button @click="logout">Sign Out</button>

  </div>
</template>

<script>

//import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Account",
  data() {
    return {
      user: {},
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(function() {
        console.log('Sign-out successful.')
      }).catch(function(error) {
        console.log(error);
      });
    }
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
