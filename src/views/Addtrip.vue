<template>
  <div class="about">
    <h1>Add Trip (temporary name)</h1>
    <div class="box">

      <div>
        <b-form-datepicker v-model="newTrip.date" class="mb-2"></b-form-datepicker>
      </div>

      <!-- <div class="btn-group btn-group-toggle">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" value="guideTrip" id="option1"  v-model="newTrip.tripType" autocomplete="off" checked> Guide Trip
        </label>
        <label class="btn btn-secondary active">
         <input type="radio" name="options"  value="personalTrip" id="option2"  v-model="newTrip.tripType" autocomplete="off"> Personal
        </label>
      </div> -->


      <!-- <div class="btn-group btn-group-toggle">

        <label class="btn btn-secondary active" v-b-toggle.collapse-1>
          <input type="radio" name="options" value="guideTrip" id="option1"  v-model="newTrip.tripType" autocomplete="off" checked> Guide Trip
        </label>

        <label class="btn btn-secondary active">
         <input type="radio" name="options"  value="personalTrip" id="option2"  v-model="newTrip.tripType" autocomplete="off"> Personal
        </label>

      </div> -->


      <b-button @click="newTrip.tripType = 'guideTrip'" v-b-toggle.collapse-1 variant="primary">Guide Trip</b-button>
      <b-button @click="newTrip.tripType = 'personalTrip'" v-b-toggle.collapse-1 variant="primary">Personal Trip</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card v-if="newTrip.tripType = 'guideTrip'">

          <b-form-select v-model="newTrip.guideTripType" id="dropdown-left" text="Trip Type" variant="primary" class="mb-3">
            <b-form-select-option disabled value="">Trip Type</b-form-select-option>
            <b-form-select-option value="halfDayWade">Half-Day Wade</b-form-select-option>
            <b-form-select-option value="fullDayWade">Full-Day Wade</b-form-select-option>
            <b-form-select-option value="halfDayFloat">Half-Day Float</b-form-select-option>
            <b-form-select-option value="fullDayFloat">Full-Day Float</b-form-select-option>
          </b-form-select>

          <b-form-select v-model="newTrip.numberInParty" id="dropdown-left" text="# In Party" variant="primary" class="mb-3">
            <b-form-select-option disabled value=""># in Party</b-form-select-option>
            <b-form-select-option type="number" value="1">1</b-form-select-option>
            <b-form-select-option type="number" value="2">2</b-form-select-option>
            <b-form-select-option type="number" value="3">3</b-form-select-option>
            <b-form-select-option type="number" value="4">4</b-form-select-option>
            <b-form-select-option type="number" value="5">5</b-form-select-option>
          </b-form-select>

            <div>
              Client Info:
              <b-card>

                <div>
                  <b-button variant="success" v-b-modal.modal-1>Add a Client +</b-button>
                  <b-modal id="modal-1" title="Add Client" ok-only ok-title="Save Client" @ok="addClient">
                    <p class="my-4">First Name: <input v-model="newTrip.newClient.firstName"></p>
                    <p class="my-4">Last Name: <input v-model="newTrip.newClient.lastName"></p>
                    <p class="my-4">Email: <input v-model="newTrip.newClient.email"></p>
                    <p class="my-4">Phone: <input v-model="newTrip.newClient.phone"></p>
                    <p class="my-4">Notes: <b-form-textarea v-model="newTrip.newClient.notes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea></p>
                  </b-modal>
                </div>

                <div v-for="(client, index) in newTrip.clients" :key="client.clientId">
                    <div @click="selectClient(index)" v-b-modal.modal-2 title="Edit Client">
                      {{ client.clientFirstName }} {{ client.clientLastName }}
                    </div>
                </div>

                <b-modal id="modal-2" title="Edit Client" ok-title="Save Changes" cancel-title="Delete Client" @cancel="deleteClient" @ok="saveChanges">
                  <p class="my-4">First Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientFirstName"></p>
                  <p class="my-4">Last Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientLastName"></p>
                  <p class="my-4">Email: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientEmail"></p>
                  <p class="my-4">Phone: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientPhone"></p>
                  <p class="my-4">Notes: <b-form-textarea v-model="newTrip.clients[newTrip.selectedClientIndex].clientNotes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea></p>
                </b-modal>

              </b-card>

            </div>

        </b-card>
      </b-collapse>

      <div>
        Reports:
        <div class="box">

          <div>
            <b-button variant="success" v-b-modal.modal-3>Add a Report +</b-button>

            <b-modal id="modal-3" title="Add Report" ok-only ok-title="Save Report" @ok="saveReport">

              <div><b>Location:</b></div>
              <select v-model="newTrip.reports.location.spotId">
                <option disabled value="">Choose a Location</option>
                <option v-for="spot in newTrip.reports.mySpots" :key="spot.spotId" :value="spot.spotId">
                    {{ spot.locationName }} at {{ spot.subLocationName }}
                </option>
              </select>

              <!-- <div><b>Location:</b></div>
              <select v-model="newTrip.reports.location.name" @change="selectLocation(index)">
                <option disabled value="">Choose a Location</option>
                <option v-for="(spot, index) in newTrip.reports.mySpots" :key="spot.spotId">
                    {{ spot.locationName }} at {{ spot.subLocationName }} {{ index }}
                </option>
              </select> -->

              <div><b>Hot Flies:</b></div>
              <div class="box">

                <select v-model="newTrip.reports.newHotFly.size">
                  <option disabled value="">Size</option>
                  <option value="2">#2</option>
                  <option value="4">#4</option>
                  <option value="6">#6</option>
                  <option value="8">#8</option>
                  <option value="10">#10</option>
                  <option value="12">#12</option>
                  <option value="14">#14</option>
                  <option value="16">#16</option>
                  <option value="18">#18</option>
                  <option value="20">#20</option>
                  <option value="22">#22</option>
                  <option value="24">#24</option>
                </select>

                <select v-model="newTrip.reports.newHotFly.pattern">
                  <option disabled value="">Pattern</option>
                  <option v-for="fly in newTrip.flybox" :key="fly.flyId">{{ fly.flyPattern }}</option>
                </select>

                <select v-model="newTrip.reports.newHotFly.color">
                  <option disabled value="">Color</option>
                  <option value="rust">Rust</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="cream">Cream</option>
                  <option value="natural">Natural</option>
                  <option value="olive">Olive</option>
                </select>

                <b-button @click="addHotFly">Add</b-button>

                <div v-for="(fly, index) in newTrip.reports.hotFlies" :key="fly.hotFliesId">
                  <div>#{{fly.size}} {{ fly.pattern }} ({{ fly.color }}) <button @click="deleteHotFly(index)">Delete</button></div>
                </div>

              </div>

              <div><b>Fish Caught:</b></div>
              <div class="box">

                <!-- dropdown with species from fishSpecies table. -->
                <select v-model="newTrip.reports.newFishCaught.species">
                  <option disabled value="">Species</option>
                  <option v-for="species in newTrip.reports.fishSpecies" :key="species.fishSpeciesId">{{ species.fishSpeciesName }}</option>
                </select>

                <b-button @click="addFishSpeciesCaught">Add</b-button>

                <div v-for="(species, index) in newTrip.reports.fishCaught" :key="species.fishCaughtId">
                  <label for="sb-inline">{{ species.speciesCaught }}{{ index }}</label>
                  <b-form-spinbutton @change="updateFishSpeciesCaught" id="sb-inline" v-model="species.qtyCaught" inline></b-form-spinbutton>
                </div>

              </div>

              <div><b>Notes:</b></div>
              <div class="box">
                This is a note about this trip.
              </div>

            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';

//newTrip.tripId: '', mySQL created hook LAST_INSERT_ID() potentially, just a way to grab next id that's going to be assigned. Do more reading.

export default {
  name: "Addtrip",
  data() {
    return {
      user: {},
      newTrip: {
        uid: '',
        tripId: undefined,
        date: '',
        tripType: '',
        guideTripType: '',
        numberInParty: '',
        newClient: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          notes: '',
          uid: '',
          tripId: 0,
        },
        clients: {},
        selectedClientIndex: 0,
        reports: {
          tripId: 0,
          mySpots: {},
          location: {
            name: '',
            spotId: 0,
          },
          newHotFly: {
            size: '',
            pattern: '',
            color: '',
            uid: '',
            tripId: 0,
          },
          hotFlies: {},
          fishSpecies: {},
          fishCaught: {},
          newFishCaught: {
            uid: '',
            tripId: 0,
            species: '',
            qty: 1,
          },
          notes: '',
        },
        flybox: {}
      }
    }
  },
  methods: {
    selectClient(index) {
      this.newTrip.selectedClientIndex = index;
    },
    addClient(){
      axios.post('http://localhost:3000/addclient', this.newTrip.newClient)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/clients/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveChanges() {
      axios.put('http://localhost:3000/editclient', this.newTrip.clients[this.newTrip.selectedClientIndex])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/clients/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteClient() {
      axios.post('http://localhost:3000/deleteclient', this.newTrip.clients[this.newTrip.selectedClientIndex])
        .then((response) => {
          console.log(response);
          this.newTrip.selectedClientIndex = 0;
          axios.get('http://localhost:3000/clients/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addHotFly() {
      axios.post('http://localhost:3000/addhotfly', this.newTrip.reports.newHotFly)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.reports.hotFlies = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteHotFly(index) {
      axios.post('http://localhost:3000/deletehotfly', this.newTrip.reports.hotFlies[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.reports.hotFlies = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addFishSpeciesCaught() {
      axios.post('http://localhost:3000/addfishcaught', this.newTrip.reports.newFishCaught)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.reports.fishCaught = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateFishSpeciesCaught(index) {
      console.log('updateFishSpecies ' + index);
      // axios.put('http://localhost:3000/editfishspeciescaught', this.newTrip.reports.fishCaught[index])
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    saveReport() {
      console.log('save report');
    },
    pageLoad() {

      axios.get('http://localhost:3000/aaid')
        .then((response) => {
          this.newTrip.tripId = response.data[0].AUTO_INCREMENT;
          this.newTrip.reports.newFishCaught.tripId = response.data[0].AUTO_INCREMENT;
          this.newTrip.reports.newHotFly.tripId = response.data[0].AUTO_INCREMENT;
          this.newTrip.reports.tripId = response.data[0].AUTO_INCREMENT;
          this.newTrip.newClient.tripId = response.data[0].AUTO_INCREMENT;
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://localhost:3000/myspots/' + this.user.uid)
        .then((response) => {
          this.newTrip.reports.mySpots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      axios.get('http://localhost:3000/flybox/' + this.user.uid)
        .then((response) => {
          this.newTrip.flybox = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      axios.get('http://localhost:3000/fishspecies/' + this.user.uid)
        .then((response) => {
          this.newTrip.reports.fishSpecies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //uid above, tripId below

      //left off here --> logging out '1' on backend instead of '23'

      // axios.get('http://localhost:3000/hotflies/' + this.newTrip.tripId)
      //   .then((response) => {
      //     this.newTrip.reports.hotFlies = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })

      // axios.get('http://localhost:3000/fishcaught/' + this.newTrip.tripId)
      //   .then((response) => {
      //     this.newTrip.reports.fishCaught = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.newTrip.uid = user.uid;
        this.newTrip.newClient.uid = user.uid;
        this.newTrip.reports.newHotFly.uid = user.uid;
        this.newTrip.reports.newFishCaught.uid = user.uid;
        this.pageLoad();

      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>

<style>

.block {
  display: inline-block;
}

</style>
