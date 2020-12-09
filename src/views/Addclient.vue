<template>
  <div class="about">
    <h1>Add Client</h1>

    <div>First Name: <input v-model="client.firstName"></div>
    <div>Last Name: <input v-model="client.lastName"></div>
    <div>Email: <input v-model="client.email"></div>
    <div>Phone: <input v-model.number="client.phone"></div>
    <div>Notes: <b-form-textarea v-model="client.notes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea></div>

    <div><button @click="saveClient">Save Client</button></div>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Addclient",
  data() {
    return {
      user: {},
      client: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: '',
        uid: ''
      }
    }
  },
  methods: {
    saveClient() {
      axios.post('http://localhost:3000/addclient', this.client)
        .then((response) => {
          console.log(response);
           window.location.href = "http://localhost:8080/mytrips/addtrip";
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
        this.client.uid = user.uid;
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
