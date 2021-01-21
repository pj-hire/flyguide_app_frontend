<template>
  <div class="about">
    <h1>Add Trip (temporary name)</h1>
    <div class="box">

      <div>
        <b-form-datepicker v-model="newTrip.date" class="mb-2"></b-form-datepicker>
      </div>

      <div>
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Guide Trip" active @click="newTrip.tripType = 'guideTrip'">
              <b-card-text>

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

                    <!-- add client -->
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

                    <!-- display clients added -->
                    <div v-for="(client, index) in newTrip.clients" :key="client.clientId">
                        <div @click="selectClient(index)" v-b-modal.modal-2 title="Edit Client">
                          {{ client.clientFirstName }} {{ client.clientLastName }}
                        </div>
                    </div>

                    <!-- edit client -->
                    <b-modal v-if="newTrip.clients[newTrip.selectedClientIndex]" id="modal-2" title="Edit Client" ok-title="Save Changes" cancel-title="Delete Client" @cancel="deleteClient" @ok="saveClientChanges">
                      <p class="my-4">First Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientFirstName"></p>
                      <p class="my-4">Last Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientLastName"></p>
                      <p class="my-4">Email: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientEmail"></p>
                      <p class="my-4">Phone: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientPhone"></p>
                      <p class="my-4">Notes: <b-form-textarea v-model="newTrip.clients[newTrip.selectedClientIndex].clientNotes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea></p>
                    </b-modal>

                  </b-card>
                </div>
              </b-card-text></b-tab>
            <b-tab @click="newTrip.tripType = 'personalTrip'" title="Personal Trip"><b-card-text></b-card-text></b-tab>
          </b-tabs>
        </b-card>
      </div>


      <!-- OLD COLLAPSE TOGGLE - DELETE AFTER CONFIRM NO BUGS COME UP-->

      <!-- <b-button @click="newTrip.tripType = 'guideTrip'" v-b-toggle.collapse-1 variant="primary">Guide Trip</b-button>
      <b-button @click="newTrip.tripType = 'personalTrip'" v-b-toggle.collapse-1 variant="primary">Personal Trip</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card v-if="newTrip.tripType = 'guideTrip'"> -->

          <!-- <b-form-select v-model="newTrip.guideTripType" id="dropdown-left" text="Trip Type" variant="primary" class="mb-3">
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

              <b-modal v-if="newTrip.clients[newTrip.selectedClientIndex]" id="modal-2" title="Edit Client" ok-title="Save Changes" cancel-title="Delete Client" @cancel="deleteClient" @ok="saveClientChanges">
                <p class="my-4">First Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientFirstName"></p>
                <p class="my-4">Last Name: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientLastName"></p>
                <p class="my-4">Email: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientEmail"></p>
                <p class="my-4">Phone: <input v-model="newTrip.clients[newTrip.selectedClientIndex].clientPhone"></p>
                <p class="my-4">Notes: <b-form-textarea v-model="newTrip.clients[newTrip.selectedClientIndex].clientNotes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea></p>
              </b-modal>

            </b-card>
          </div> -->
        <!-- </b-card>
      </b-collapse> -->

      <div>
        Reports:
        <div class="box">

          <div>
            <b-button variant="success" v-b-modal.modal-3>Add a Report +</b-button>

            <b-modal id="modal-3" title="Add Report" ok-only ok-title="Save Report" @ok="saveReport">

              <!-- add location -->
              <div><b>Location:</b></div>
              <select v-model="newTrip.newReport.spotId">
                <option disabled :value="0">Choose a Location</option>
                <option v-for="spot in newTrip.mySpots" :key="spot.spotId" :value="spot.spotId">
                    {{ spot.locationName }} at {{ spot.subLocationName }}
                </option>
              </select>

              <!-- add hot flies -->
              <div><b>Hot Flies:</b></div>
              <div class="box">

                <select v-model="newTrip.newReport.newHotFly.size">
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

                <select v-model="newTrip.newReport.newHotFly.pattern">
                  <option disabled value="">Pattern</option>
                  <option v-for="fly in newTrip.flybox" :key="fly.flyId">{{ fly.flyPattern }}</option>
                </select>

                <select v-model="newTrip.newReport.newHotFly.color">
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

                <div v-for="(fly, index) in newTrip.newReport.hotFlies" :key="fly.hotFliesId">
                  <div>#{{fly.size}} {{ fly.pattern }} ({{ fly.color }}) <button @click="deleteHotFly(index)">Delete</button></div>
                </div>

              </div>

              <!-- add fish caught -->
              <div><b>Fish Caught:</b></div>
              <div class="box">

                <select v-model="newTrip.newReport.newFishCaught.speciesName">
                  <option disabled value="">Species</option>
                  <option v-for="species in newTrip.targetSpecies" :key="species.fishSpeciesId">{{ species.speciesName }}</option>
                </select>

                <b-button @click="addFishCaught">Add</b-button>

                <div v-for="(species, index) in newTrip.newReport.fishCaught" :key="species.fishCaughtId">
                  <div>
                    {{ species.speciesName }}
                    <b-form-spinbutton id="sb-inline" v-model="newTrip.newReport.fishCaught[index].qtyCaught" min='0' inline @change="changeFishCaughtQty(index)"></b-form-spinbutton>
                    <button @click="deleteFishCaught(index)">Delete</button>
                  </div>
                </div>

              </div>

              <!-- add notes -->
              <div><b>Notes:</b></div>
              <div class="box">
                <b-form-textarea id="textarea" v-model="newTrip.newReport.notes" placeholder="Additional trip notes..." rows="3" max-rows="6"></b-form-textarea>
              </div>

            </b-modal>

            <!-- click to bring up modal to edit a report -->
            <div v-for="(report, index) in newTrip.reports" :key="report.reportId">
              <div v-for="spot in newTrip.mySpots" :key="spot.spotId">
                <div v-if="report.spotId === spot.spotId" @click="editReport(index)" v-b-modal.modal-4>
                  {{ spot.locationName}} at {{ spot.subLocationName }}
                </div>
              </div>
            </div>

            <b-modal v-if="newTrip.reports[newTrip.selectedReportIndex]" id="modal-4" title="Edit Report" ok-title="Save Changes" cancel-title="Delete Report" @cancel="deleteReport" @ok="saveReportChanges">

              <!-- edit location -->
              <div><b>Location:</b></div>
              <select v-model="newTrip.editReport.spotId">
                <option disabled :value="0">Choose a Location</option>
                <option v-for="spot in newTrip.mySpots" :key="spot.spotId" :value="spot.spotId">
                    {{ spot.locationName }} at {{ spot.subLocationName }}
                </option>
              </select>

              <!-- edit hot flies -->
              <div><b>Hot Flies:</b></div>
              <div class="box">

                <select v-model="newTrip.editReport.newHotFly.size">
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

                <select v-model="newTrip.editReport.newHotFly.pattern">
                  <option disabled value="">Pattern</option>
                  <option v-for="fly in newTrip.flybox" :key="fly.flyId">{{ fly.flyPattern }}</option>
                </select>

                <select v-model="newTrip.editReport.newHotFly.color">
                  <option disabled value="">Color</option>
                  <option value="rust">Rust</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="cream">Cream</option>
                  <option value="natural">Natural</option>
                  <option value="olive">Olive</option>
                </select>

                <b-button @click="editReportAddHotFly">Add</b-button>

                <div v-for="(fly, index) in newTrip.editReport.hotFlies" :key="fly.hotFliesId">
                  <div>#{{fly.size}} {{ fly.pattern }} ({{ fly.color }}) <button @click="editReportDeleteHotFly(index)">Delete</button></div>
                </div>

              </div>

              <!-- edit fish caught -->
              <div><b>Fish Caught:</b></div>
              <div class="box">

                <select v-model="newTrip.editReport.newFishCaught.speciesName">
                  <option disabled value="">Species</option>
                  <option v-for="species in newTrip.targetSpecies" :key="species.fishSpeciesId">{{ species.speciesName }}</option>
                </select>

                <b-button @click="editReportAddFishCaught">Add</b-button>

                <div v-for="(species, index) in newTrip.editReport.fishCaught" :key="species.fishCaughtId">
                  <div>
                    {{ species.speciesName }}
                    <b-form-spinbutton id="sb-inline" v-model="newTrip.editReport.fishCaught[index].qtyCaught" min='0' inline @change="editReportChangeFishCaughtQty(index)"></b-form-spinbutton>
                    <button @click="editReportDeleteFishCaught(index)">Delete</button>
                  </div>
                </div>

              </div>

              <!-- edit notes -->
              <div><b>Notes:</b></div>
              <div class="box">
                <b-form-textarea id="textarea" v-model="newTrip.editReport.notes" placeholder="Additional report notes..." rows="3" max-rows="6"></b-form-textarea>
              </div>

            </b-modal>


          </div>
        </div>
      </div>

      <div>
        Notes:
        <div class="box">
          <b-form-textarea id="textarea" v-model="newTrip.tripNotes" placeholder="Additional trip notes..." rows="3" max-rows="6"></b-form-textarea>
        </div>
      </div>

      <b-button @click="saveTrip">Save Trip</b-button>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
// import jsStringEscape from 'js-string-escape';

export default {
  name: "Addtrip",
  data() {
    return {
      user: {},
      newTrip: {
        uid: '',
        tripId: undefined,
        date: '',
        tripType: 'guideTrip',
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
        reports: {},
        selectedReportIndex: 0,
        mySpots: {},
        flybox: {},
        targetSpecies: {},

        // new report
        newReport: {
          reportId: 0,
          tripId: 0,
          uid: '',
          spotId: 0,
          newHotFly: {
            size: '',
            pattern: '',
            color: '',
            uid: '',
            reportId: 0,
          },
          hotFlies: {},
          newFishCaught: {
            uid: '',
            reportId: 0,
            fishSpeciesId: 0,
            speciesName: '',
            qtyCaught: 0,
          },
          fishCaught: {},
          notes: '',
        },

        // edit report
        editReport: {
          reportId: 0,
          tripId: 0,
          uid: '',
          spotId: 0,
          newHotFly: {
            size: '',
            pattern: '',
            color: '',
            uid: '',
            reportId: 0,
          },
          hotFlies: {},
          newFishCaught: {
            uid: '',
            reportId: 0,
            fishSpeciesId: 0,
            speciesName: '',
            qtyCaught: 0,
          },
          fishCaught: {},
          notes: '',
        },
        tripNotes: '',
      }
    }
  },
  methods: {
    changeFishCaughtQty(index) {
      axios.post('http://localhost:3000/addfishcaughtqty', this.newTrip.newReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.newReport.reportId)
            .then((response) => {
              this.newTrip.newReport.fishCaught = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectClient(index) {
      this.newTrip.selectedClientIndex = index;
    },
    addClient() {
      axios.post('http://localhost:3000/addclient', this.newTrip.newClient)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/clients/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.clients = response.data;
              this.newTrip.newClient.firstName = '';
              this.newTrip.newClient.lastName = '';
              this.newTrip.newClient.email = '';
              this.newTrip.newClient.phone = '';
              this.newTrip.newClient.notes = '';
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveClientChanges() {
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
      axios.post('http://localhost:3000/addhotfly', this.newTrip.newReport.newHotFly)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.newReport.reportId)
            .then((response) => {
              this.newTrip.newReport.hotFlies = response.data;
              this.newTrip.newReport.newHotFly.size = '';
              this.newTrip.newReport.newHotFly.pattern = '';
              this.newTrip.newReport.newHotFly.color = '';
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
      axios.post('http://localhost:3000/deletehotfly', this.newTrip.newReport.hotFlies[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.newReport.reportId)
            .then((response) => {
              this.newTrip.newReport.hotFlies = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addFishCaught() {
      axios.post('http://localhost:3000/addfishCaught', this.newTrip.newReport.newFishCaught)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.newReport.newFishCaught.reportId)
            .then((response) => {
              this.newTrip.newReport.fishCaught = response.data;
              this.newTrip.newReport.newFishCaught.speciesName = '';
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteFishCaught(index) {
      axios.post('http://localhost:3000/deletefishcaught', this.newTrip.newReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.newReport.reportId)
            .then((response) => {
              this.newTrip.newReport.fishCaught = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editReport(index) {
      this.newTrip.selectedReportIndex = index;
      // main data:
      this.newTrip.editReport.uid = this.newTrip.reports[index].uid;
      this.newTrip.editReport.tripId = this.newTrip.reports[index].tripId;
      this.newTrip.editReport.reportId = this.newTrip.reports[index].reportId;
      this.newTrip.editReport.spotId = this.newTrip.reports[index].spotId;
      this.newTrip.editReport.notes = this.newTrip.reports[index].notes;
      // hotFlies:
      this.newTrip.editReport.newHotFly.uid = this.newTrip.reports[index].uid;
      this.newTrip.editReport.newHotFly.reportId = this.newTrip.reports[index].reportId;
      //fishCaught
      this.newTrip.editReport.newFishCaught.uid = this.newTrip.reports[index].uid;
      this.newTrip.editReport.newFishCaught.reportId = this.newTrip.reports[index].reportId;
      // load in existing hotFlies:
      axios.get('http://localhost:3000/hotflies/' + this.newTrip.reports[index].reportId)
        .then((response) => {
          console.log(response.data);
          this.newTrip.editReport.hotFlies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      // load in fishCaught
      axios.get('http://localhost:3000/fishcaught/' + this.newTrip.reports[index].reportId)
        .then((response) => {
          console.log(response.data);
          this.newTrip.editReport.fishCaught = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    editReportAddHotFly() {
      axios.post('http://localhost:3000/addhotfly', this.newTrip.editReport.newHotFly)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.editReport.reportId)
            .then((response) => {
              this.newTrip.editReport.hotFlies = response.data;
              this.newTrip.editReport.newHotFly.size = '';
              this.newTrip.editReport.newHotFly.pattern = '';
              this.newTrip.editReport.newHotFly.color = '';
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editReportDeleteHotFly(index) {
      axios.post('http://localhost:3000/deletehotfly', this.newTrip.editReport.hotFlies[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/hotflies/' + this.newTrip.editReport.reportId)
            .then((response) => {
              this.newTrip.editReport.hotFlies = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editReportAddFishCaught() {
      axios.post('http://localhost:3000/addfishcaught', this.newTrip.editReport.newFishCaught)
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.editReport.reportId)
            .then((response) => {
              this.newTrip.editReport.fishCaught = response.data;
              this.newTrip.editReport.newFishCaught.speciesName = '';
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editReportChangeFishCaughtQty(index) {
      axios.post('http://localhost:3000/addfishcaughtqty', this.newTrip.editReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.editReport.reportId)
            .then((response) => {
              this.newTrip.editReport.fishCaught = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    editReportDeleteFishCaught(index) {
      axios.post('http://localhost:3000/deletefishcaught', this.newTrip.editReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get('http://localhost:3000/fishcaught/' + this.newTrip.editReport.reportId)
            .then((response) => {
              this.newTrip.editReport.fishCaught = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveReport() {
      axios.post('http://localhost:3000/savereport', this.newTrip.newReport)
        .then((response) => {
          console.log(response);
          this.pageLoad();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteReport() {
      //delete hotFlies associated with report
      axios.post('http://localhost:3000/deletereporthotflies', this.newTrip.reports[this.newTrip.selectedReportIndex])
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //delete fishCaught associated with report
      axios.post('http://localhost:3000/deletereportfishcaught', this.newTrip.reports[this.newTrip.selectedReportIndex])
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //delete report
      axios.post('http://localhost:3000/deletereport', this.newTrip.reports[this.newTrip.selectedReportIndex])
        .then((response) => {
          console.log(response);
          this.newTrip.selectedReportIndex = 0;
          //reload trips
          axios.get('http://localhost:3000/reports/' + this.newTrip.tripId)
            .then((response) => {
              this.newTrip.reports = response.data;
              this.pageLoad();
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveReportChanges() {
      axios.put('http://localhost:3000/savereportchanges', this.newTrip.editReport)
        .then((response) => {
          console.log(response);
          this.pageLoad()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveTrip() {
      axios.post('http://localhost:3000/savetrip', this.newTrip)
        .then((response) => {
          console.log(response);
          window.location.href = "http://127.0.0.1:8080/mytrips";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    pageLoad() {

      //bring tripId in
      axios.get('http://localhost:3000/aaidtrip')
        .then((response) => {
          this.newTrip.tripId = response.data[0].tripId + 1;
          this.newTrip.newClient.tripId = response.data[0].tripId + 1;
          this.newTrip.newReport.tripId = response.data[0].tripId + 1;
          //select all clients from current trip throught tripId
          axios.get('http://localhost:3000/clients/' + (response.data[0].tripId + 1))
            .then((response) => {
              this.newTrip.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
          //select all reports from current trip throught tripId
          axios.get('http://localhost:3000/reports/' + (response.data[0].tripId + 1))
            .then((response) => {
              this.newTrip.reports = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
        })
        .catch((error) => {
          console.log(error);
        });

      //bring reportId in
      axios.get('http://localhost:3000/aaidreport')
        .then((response) => {
          this.newTrip.newReport.reportId = response.data[0].reportId + 1;
          this.newTrip.newReport.newHotFly.reportId = response.data[0].reportId + 1;
          this.newTrip.newReport.newFishCaught.reportId = response.data[0].reportId + 1;
        })
        .catch((error) => {
          console.log(error);
        });

      //bring mySpots in
      axios.get('http://localhost:3000/myspots/' + this.user.uid)
        .then((response) => {
          this.newTrip.mySpots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring flies from flybox in
      axios.get('http://localhost:3000/flybox/' + this.user.uid)
        .then((response) => {
          this.newTrip.flybox = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring targetSpecies in
      axios.get('http://localhost:3000/targetspecies/' + this.user.uid)
        .then((response) => {
          this.newTrip.targetSpecies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //reset everything for next report
      this.newTrip.newReport.spotId = 0;
      this.newTrip.newReport.hotFlies = {};
      this.newTrip.newReport.fishCaught = {};
      this.newTrip.newReport.notes = '';

    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.newTrip.uid = user.uid;
        this.newTrip.newClient.uid = user.uid;
        this.newTrip.newReport.uid = user.uid;
        this.newTrip.newReport.newHotFly.uid = user.uid;
        this.newTrip.newReport.newFishCaught.uid = user.uid;
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

body {
  background-color: #a3b4a2;
}

</style>
