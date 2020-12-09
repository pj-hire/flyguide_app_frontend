<template>
  <div class="about">
    <h1>Add Trip (temporary name)</h1>
    <div>

      <div>Date: <input type="date" v-model="newTrip.date"></div>

      <div class="btn-group btn-group-toggle">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" value="guideTrip" id="option1"  v-model="newTrip.tripType" autocomplete="off" checked> Guide Trip
        </label>
        <label class="btn btn-secondary">
         <input type="radio" name="options"  value="personalTrip" id="option2"  v-model="newTrip.tripType" autocomplete="off"> Personal
        </label>
      </div>

      <div class="box">
        <template v-if="newTrip.tripType === 'guideTrip'">
          <div>
            <select v-model="newTrip.guideTripType">
              <option disabled value="">Trip Type</option>
              <option value="halfDayWade">Half-Day Wade</option>
              <option value="fullDayWade">Full-Day Wade</option>
              <option value="halfDayFloat">Half-Day Float</option>
              <option value="fullDayFloat">Full-Day Float</option>
            </select>
          </div>
        </template>

        <template v-if="newTrip.tripType === 'guideTrip'">
          <div>
            <select v-model="newTrip.numberInParty">
              <option disabled value=""># in Party</option>
              <option type="number" value="1">1</option>
              <option type="number" value="2">2</option>
              <option type="number" value="3">3</option>
              <option type="number" value="4">4</option>
              <option type="number" value="5+">5+</option>
            </select>
          </div>
        </template>

        <template v-if="newTrip.tripType === 'guideTrip'">
          <div>
            Client Info:
            <div class="box">
              <div><router-link to="/mytrips/addtrip/addclient"><b-button variant="success">Add Client +</b-button></router-link></div>
              <div class="box" v-for="client in newTrip.clients" :key="client.clientId">
                  <router-link :to="'/mytrips/addtrip/editclient/' + client.clientId">
                    {{ client.clientFirstName }} {{ client.clientLastName }}
                  </router-link>
              </div>
            </div>
          </div>
        </template>

        <!-- <div>
          <b-button v-b-modal.modal-1>Add a Client +</b-button>
          <b-modal id="modal-1" title="Add Client">
            <p class="my-4">email: <input v-model="this.newClient.firstName"></p>
            <p class="my-4">First Name: <input v-model="newClient.firstName"></p>
            <div>Last Name: <input v-model="newClient.lastName"></div>
            <div>Email: <input v-model="newClient.email"></div>
            <div>Phone: <input v-model="newClient.phone"></div>
          </b-modal>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Addtrip",
  data() {
    return {
      user: {},
      newTrip: {
        date: '',
        tripType: '',
        guideTripType: '',
        numberInParty: '',
        clients: {},
        newClient: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          notes: ''
        },
        reports: {}
      }
    }
  },
  methods: {
    pageLoad() {
      axios.get('http://localhost:3000/clients/' + this.user.uid)
        .then((response) => {
          this.newTrip.clients = response.data;
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
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
