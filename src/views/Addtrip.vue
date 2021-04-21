<template>
  <div class="about">
    <h1>Add Trip</h1>

    <b-card no-body>
      <b-tabs pills card>

        <!-- Tab for Guide Trip -->
        <b-tab title="Guide Trip" active @click="newTrip.tripType = 'guideTrip'">
          <b-card-text>

            <h3>Date:</h3>
            <div>
              <b-form-datepicker v-model="newTrip.date" class="mb-2"></b-form-datepicker>
            </div>

            <h3 class="pt-20">Trip Info:</h3>

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

            <h3 class="pt-10">Clients:</h3>
            <div class="center">

              <!-- add client modal -->
              <div>
                <b-button variant="success" v-b-modal.modal-1>Add Client +</b-button>
                <b-modal id="modal-1" title="Add Client" ok-only ok-title="Save Client" @ok="addClient">
                  <b-container fluid>
                    <div class="row">
                      <div class="modal-addclient-left"><p class="my-4">First Name:</p></div>
                      <div class="modal-addclient-right"><input v-model="newTrip.newClient.firstName"></div>
                    </div>
                    <div class="row">
                      <div class="modal-addclient-left"><p class="my-4">Last Name:</p></div>
                      <div class="modal-addclient-right"><input v-model="newTrip.newClient.lastName"></div>
                    </div>
                    <div class="row">
                      <div class="modal-addclient-left"><p class="my-4">Email:</p></div>
                      <div class="modal-addclient-right"><input v-model="newTrip.newClient.email"></div>
                    </div>
                    <div class="row">
                      <div class="modal-addclient-left"><p class="my-4">Phone:</p></div>
                      <div class="modal-addclient-right"><input v-model="newTrip.newClient.phone"></div>
                    </div>
                    <div class="text-area">
                      <b-form-textarea v-model="newTrip.newClient.notes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea>
                    </div>
                  </b-container>
                </b-modal>
              </div>

              <!-- display clients added -->
              <div v-for="(client, index) in newTrip.clients" :key="client.clientId">
                <div class="card-list-container" @click="selectClient(index)" v-b-modal.modal-2 title="Edit Client">
                  {{ client.clientFirstName }} {{ client.clientLastName }}
                </div>
              </div>

              <!-- edit client -->
              <b-modal v-if="newTrip.clients[newTrip.selectedClientIndex]" id="modal-2" title="Edit Client" ok-title="Save Changes" cancel-title="Delete Client" @cancel="deleteClient" @ok="saveClientChanges">
                <b-container fluid>
                  <div class="row">
                    <div class="modal-addclient-left"><p class="my-4">First Name:</p></div>
                    <div class="modal-addclient-right"><input v-model="newTrip.clients[newTrip.selectedClientIndex].clientFirstName"></div>
                  </div>
                  <div class="row">
                    <div class="modal-addclient-left"><p class="my-4">Last Name:</p></div>
                    <div class="modal-addclient-right"><input v-model="newTrip.clients[newTrip.selectedClientIndex].clientLastName"></div>
                  </div>
                  <div class="row">
                    <div class="modal-addclient-left"><p class="my-4">Email:</p></div>
                    <div class="modal-addclient-right"><input v-model="newTrip.clients[newTrip.selectedClientIndex].clientEmail"></div>
                  </div>
                  <div class="row">
                    <div class="modal-addclient-left"><p class="my-4">Phone:</p></div>
                    <div class="modal-addclient-right"><input v-model="newTrip.clients[newTrip.selectedClientIndex].clientPhone"></div>
                  </div>
                  <div class="text-area">
                    <b-form-textarea v-model="newTrip.clients[newTrip.selectedClientIndex].clientNotes" placeholder="Client notes..." rows="3" max-rows="6"></b-form-textarea>
                  </div>
                </b-container>
              </b-modal>
            </div>

            <!-- If we wanted to bring REPORTS and TRIP NOTES into this tab. Would probably just want to create a sererate component  -->

          </b-card-text>
        </b-tab>

        <!-- Tab for personal trip -->
        <b-tab @click="newTrip.tripType = 'personalTrip'" title="Personal Trip">
          <b-card-text>
            <h3>Date:</h3>
            <div>
              <b-form-datepicker v-model="newTrip.date" class="mb-2"></b-form-datepicker>
            </div>
          </b-card-text>
        </b-tab>

      </b-tabs>
    </b-card>

    <b-card>
      <h3>Reports:</h3>
      <div class="center">

        <b-button variant="success" v-b-modal.modal-3>Add Report +</b-button>

        <!-- Modal - add report -->
        <b-modal id="modal-3" title="Add Report" ok-only ok-title="Save Report" @ok="saveReport">
          <b-container fluid>

            <!-- add location -->
            <div class="reports-input-container">
              <h5>Location:</h5>
              <b-form-select v-model="newTrip.newReport.spotId">
                <option disabled :value="0">Choose a Location</option>
                <option v-for="spot in newTrip.mySpots" :key="spot.spotId" :value="spot.spotId">
                    {{ spot.locationName }} at {{ spot.subLocationName }}
                </option>
              </b-form-select>
            </div>

            <!-- add hot flies -->
            <div class="reports-input-container">
              <h5 class="report-heading">Hot Flies:</h5>
              <b-container fluid>
                <div class="row">
                  <div class="flex-2 mr-2">
                    <b-form-select v-model="newTrip.newReport.newHotFly.size">
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
                    </b-form-select>
                  </div>
                  <div class="flex-2 mr-2">
                    <b-form-select v-model="newTrip.newReport.newHotFly.pattern">
                      <option disabled value="">Pattern</option>
                      <option v-for="fly in newTrip.flybox" :key="fly.flyId">{{ fly.flyPattern }}</option>
                    </b-form-select>
                  </div>
                  <div class="flex-2 mr-2">
                    <b-form-select v-model="newTrip.newReport.newHotFly.color">
                      <option disabled value="">Color</option>
                      <option value="rust">Rust</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="purple">Purple</option>
                      <option value="cream">Cream</option>
                      <option value="natural">Natural</option>
                      <option value="olive">Olive</option>
                    </b-form-select>
                  </div>
                  <div class="flex-1">
                    <b-button @click="addHotFly">Add</b-button>
                  </div>
                </div>
              </b-container>
            </div>

            <!-- display hot flies -->
            <div class="reports-list-container" v-for="(fly, index) in newTrip.newReport.hotFlies" :key="fly.hotFliesId">
              <div class="flex-6 reports-hotfly-left">
                #{{fly.size}} {{ fly.pattern }} ({{ fly.color }})
              </div>
              <div class="flex-2 reports-hotfly-right">
                <b-button pill variant="outline-danger" size="sm" @click="deleteHotFly(index)">Delete</b-button>
              </div>
            </div>

            <!-- add fish caught -->
            <div class="reports-input-container">
              <h5 class="report-heading">Fish Caught:</h5>
              <b-container fluid>
                <div class="row">
                  <div class="flex-6 mr-2">
                    <b-form-select v-model="newTrip.newReport.newFishCaught.speciesName">
                      <option disabled value="">Species</option>
                      <option v-for="species in newTrip.targetSpecies" :key="species.fishSpeciesId">{{ species.speciesName }}</option>
                    </b-form-select>
                  </div>
                  <div class="flex-1">
                    <b-button @click="addFishCaught">Add</b-button>
                  </div>
                </div>
              </b-container>
            </div>

            <!-- display fish caught -->
            <div class="reports-list-container" v-for="(species, index) in newTrip.newReport.fishCaught" :key="species.fishCaughtId">
              <div class="flex-2 reports-fishcaught-left">
                {{ species.speciesName }}
              </div>
              <div class="flex-2 reports-fishcaught-middle">
                <b-form-spinbutton size="sm" id="sb-inline" v-model="newTrip.newReport.fishCaught[index].qtyCaught" min='0' inline @change="changeFishCaughtQty(index)"></b-form-spinbutton>
              </div>
              <div class="flex-1 reports-fishcaught-right">
                <b-button pill variant="outline-danger" size="sm" @click="deleteFishCaught(index)">Delete</b-button>
              </div>
            </div>

            <!-- add notes -->
            <div>
              <h5 class="report-heading">Notes:</h5>
              <b-form-textarea id="textarea" v-model="newTrip.newReport.notes" placeholder="Additional report notes..." rows="3" max-rows="6"></b-form-textarea>
            </div>

          </b-container>
        </b-modal>

        <!-- List of reports - click to bring up modal to edit a report -->
        <div v-for="(report, index) in newTrip.reports" :key="report.reportId">
          <div v-for="spot in newTrip.mySpots" :key="spot.spotId">
            <div class="card-list-container" v-if="report.spotId === spot.spotId" @click="editReport(index)" v-b-modal.modal-4>
              {{ spot.locationName}} at {{ spot.subLocationName }}
            </div>
          </div>
        </div>

        <!-- Edit report Modal -->
        <b-modal v-if="newTrip.reports[newTrip.selectedReportIndex]" id="modal-4" title="Edit Report" ok-title="Save Changes" cancel-title="Delete Report" @cancel="deleteReport" @ok="saveReportChanges">

          <!-- edit report - location -->
          <div class="reports-input-container">
            <h5>Location:</h5>
            <b-form-select v-model="newTrip.editReport.spotId">
              <option disabled :value="0">Choose a Location</option>
              <option v-for="spot in newTrip.mySpots" :key="spot.spotId" :value="spot.spotId">
                  {{ spot.locationName }} at {{ spot.subLocationName }}
              </option>
            </b-form-select>
          </div>

          <!-- edit report - hot flies -->
          <div class="reports-input-container">
            <h5 class="report-heading">Hot Flies:</h5>
            <b-container fluid>
              <div class="row">
                <div class="flex-2 mr-2">
                  <b-form-select v-model="newTrip.editReport.newHotFly.size">
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
                  </b-form-select>
                </div>
                <div class="flex-2 mr-2">
                  <b-form-select v-model="newTrip.editReport.newHotFly.pattern">
                    <option disabled value="">Pattern</option>
                    <option v-for="fly in newTrip.flybox" :key="fly.flyId">{{ fly.flyPattern }}</option>
                  </b-form-select>
                </div>
                <div class="flex-2 mr-2">
                  <b-form-select v-model="newTrip.editReport.newHotFly.color">
                    <option disabled value="">Color</option>
                    <option value="rust">Rust</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="cream">Cream</option>
                    <option value="natural">Natural</option>
                    <option value="olive">Olive</option>
                  </b-form-select>
                </div>
                <div class="flex-1">
                  <b-button @click="editReportAddHotFly">Add</b-button>
                </div>
              </div>
            </b-container>
          </div>

          <!-- edit report - display hot flies -->
          <div class="reports-list-container" v-for="(fly, index) in newTrip.editReport.hotFlies" :key="fly.hotFliesId">
            <div class="flex-6 reports-hotfly-left">
              #{{fly.size}} {{ fly.pattern }} ({{ fly.color }})
            </div>
            <div class="flex-2 reports-hotfly-right">
              <b-button pill variant="outline-danger" size="sm" @click="editReportDeleteHotFly(index)">Delete</b-button>
            </div>
          </div>

          <!-- edit report - fish caught -->
          <div class="reports-input-container">
            <h5 class="report-heading">Fish Caught:</h5>
            <b-container fluid>
              <div class="row">
                <div class="flex-6 mr-2">
                  <b-form-select v-model="newTrip.editReport.newFishCaught.speciesName">
                    <option disabled value="">Species</option>
                    <option v-for="species in newTrip.targetSpecies" :key="species.fishSpeciesId">{{ species.speciesName }}</option>
                  </b-form-select>
                </div>
                <div class="flex-1">
                  <b-button @click="editReportAddFishCaught">Add</b-button>
                </div>
              </div>
            </b-container>
          </div>

          <!-- edit report - display fish caught -->
          <div class="reports-list-container" v-for="(species, index) in newTrip.editReport.fishCaught" :key="species.fishCaughtId">
            <div class="flex-2 reports-fishcaught-left">
              {{ species.speciesName }}
            </div>
            <div class="flex-2 reports-fishcaught-middle">
              <b-form-spinbutton size="sm" id="sb-inline" v-model="newTrip.editReport.fishCaught[index].qtyCaught" min='0' inline @change="editReportChangeFishCaughtQty(index)"></b-form-spinbutton>
            </div>
            <div class="flex-1 reports-fishcaught-right">
              <b-button pill variant="outline-danger" size="sm" @click="editReportDeleteFishCaught(index)">Delete</b-button>
            </div>
          </div>

          <!-- edit report - report notes -->
          <div>
            <h5 class="report-heading">Notes:</h5>
            <b-form-textarea id="textarea" v-model="newTrip.editReport.notes" placeholder="Additional report notes..." rows="3" max-rows="6"></b-form-textarea>
          </div>

        </b-modal>
      </div>
    </b-card>

    <b-card>
      <h3 class="notes-heading">Notes:</h3>
      <b-form-textarea id="textarea" v-model="newTrip.tripNotes" placeholder="Additional trip notes..." rows="3" max-rows="6"></b-form-textarea>

      <div class="center">
        <b-button class="button-savetrip" @click="saveTrip">Save Trip</b-button>
      </div>
    </b-card>

  </div>
</template>

<script>

import axios from 'axios';
import firebase from 'firebase';
import jsStringEscape from 'js-string-escape';

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
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'fishcaughtqty', this.newTrip.newReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.newReport.reportId)
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
      if (this.newTrip.newClient.firstName || this.newTrip.newClient.lastName !== '') {
        this.newTrip.newClient.firstName = jsStringEscape(this.newTrip.newClient.firstName);
        this.newTrip.newClient.lastName = jsStringEscape(this.newTrip.newClient.lastName);
        this.newTrip.newClient.email = jsStringEscape(this.newTrip.newClient.email);
        this.newTrip.newClient.phone = jsStringEscape(this.newTrip.newClient.phone);
        this.newTrip.newClient.notes = jsStringEscape(this.newTrip.newClient.notes);
        axios.post(process.env.VUE_APP_REQUEST_BASE + 'clients', this.newTrip.newClient)
          .then((response) => {
            console.log(response);
            axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients/' + this.newTrip.tripId)
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
      } else {
        alert('Enter client name')
      }
    },
    saveClientChanges() {
      if (this.newTrip.clients[this.newTrip.selectedClientIndex].clientFirstName || this.newTrip.clients[this.newTrip.selectedClientIndex].clientLastName !== '') {
        this.newTrip.clients[this.newTrip.selectedClientIndex].clientFirstName = jsStringEscape(this.newTrip.clients[this.newTrip.selectedClientIndex].clientFirstName);
        this.newTrip.clients[this.newTrip.selectedClientIndex].clientLastName = jsStringEscape(this.newTrip.clients[this.newTrip.selectedClientIndex].clientLastName);
        this.newTrip.clients[this.newTrip.selectedClientIndex].clientEmail = jsStringEscape(this.newTrip.clients[this.newTrip.selectedClientIndex].clientEmail);
        this.newTrip.clients[this.newTrip.selectedClientIndex].clientPhone = jsStringEscape(this.newTrip.clients[this.newTrip.selectedClientIndex].clientPhone);
        this.newTrip.clients[this.newTrip.selectedClientIndex].clientNotes = jsStringEscape(this.newTrip.clients[this.newTrip.selectedClientIndex].clientNotes);
        axios.put(process.env.VUE_APP_REQUEST_BASE + 'clients', this.newTrip.clients[this.newTrip.selectedClientIndex])
          .then((response) => {
            console.log(response);
            axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients/' + this.newTrip.tripId)
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
      } else {
        alert('Enter client name')
      }
    },
    deleteClient() {
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'clients/' + this.newTrip.clients[this.newTrip.selectedClientIndex].clientId)
        .then((response) => {
          console.log(response);
          this.newTrip.selectedClientIndex = 0;
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients/' + this.newTrip.tripId)
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
      this.newTrip.newReport.newHotFly.pattern = jsStringEscape(this.newTrip.newReport.newHotFly.pattern);
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'hotflies', this.newTrip.newReport.newHotFly)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.newReport.reportId)
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
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'hotflies-flyId/' + this.newTrip.newReport.hotFlies[index].hotFliesId)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.newReport.reportId)
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
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'fishcaught', this.newTrip.newReport.newFishCaught)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.newReport.newFishCaught.reportId)
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
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'fishcaught-id/' + this.newTrip.newReport.fishCaught[index].fishCaughtId)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.newReport.reportId)
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
      //set correct IDs for specified report based on index
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
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.reports[index].reportId)
        .then((response) => {
          console.log(response.data);
          this.newTrip.editReport.hotFlies = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
      // load in fishCaught
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.reports[index].reportId)
        .then((response) => {
          console.log(response.data);
          this.newTrip.editReport.fishCaught = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    editReportAddHotFly() {
      this.newTrip.editReport.newHotFly.pattern = jsStringEscape(this.newTrip.editReport.newHotFly.pattern);
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'hotflies', this.newTrip.editReport.newHotFly)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.editReport.reportId)
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
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'hotflies-flyId/' + this.newTrip.editReport.hotFlies[index].hotFliesId)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.editReport.reportId)
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
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'fishcaught', this.newTrip.editReport.newFishCaught)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.editReport.reportId)
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
      axios.post(process.env.VUE_APP_REQUEST_BASE + 'addfishcaughtqty', this.newTrip.editReport.fishCaught[index])
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.editReport.reportId)
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
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'fishcaught-id/' + this.newTrip.editReport.fishCaught[index].fishCaughtId)
        .then((response) => {
          console.log(response);
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.editReport.reportId)
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
      if (this.newTrip.newReport.spotId !== 0) {
        this.newTrip.newReport.notes = jsStringEscape(this.newTrip.newReport.notes);
        axios.post(process.env.VUE_APP_REQUEST_BASE + 'reports', this.newTrip.newReport)
          .then((response) => {
            console.log(response);
            this.pageLoad();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert('Choose a location')
      }
    },
    deleteReport() {
      //delete hotFlies associated with report
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'hotflies/' + this.newTrip.reports[this.newTrip.selectedReportIndex].reportId)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //delete fishCaught associated with report
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'fishcaught/' + this.newTrip.reports[this.newTrip.selectedReportIndex].reportId)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      //delete report
      axios.delete(process.env.VUE_APP_REQUEST_BASE + 'reports/' + this.newTrip.reports[this.newTrip.selectedReportIndex].reportId)
        .then((response) => {
          console.log(response);
          this.newTrip.selectedReportIndex = 0;
          //reload trips
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'reports/' + this.newTrip.tripId)
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
      this.newTrip.editReport.notes = jsStringEscape(this.newTrip.editReport.notes);
      axios.put(process.env.VUE_APP_REQUEST_BASE + 'reports', this.newTrip.editReport)
        .then((response) => {
          console.log(response);
          this.pageLoad()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveTrip() {
      if (this.newTrip.date !== '') {
        this.newTrip.tripNotes = jsStringEscape(this.newTrip.tripNotes);
        axios.post(process.env.VUE_APP_REQUEST_BASE + 'trips', this.newTrip)
          .then((response) => {
            console.log(response);
            this.$router.push('/mytrips');
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert('Select a date');
      }
    },
    pageLoad() {

      //bring tripId in
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'aaidtrip')
        .then((response) => {
          this.newTrip.tripId = response.data[0].tripId + 1;
          this.newTrip.newClient.tripId = response.data[0].tripId + 1;
          this.newTrip.newReport.tripId = response.data[0].tripId + 1;
          //select all clients from current trip throught tripId
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'clients/' + (response.data[0].tripId + 1))
            .then((response) => {
              this.newTrip.clients = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
          //select all reports from current trip through tripId
          axios.get(process.env.VUE_APP_REQUEST_BASE + 'reports/' + (response.data[0].tripId + 1))
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
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'aaidreport')
        .then((response) => {
          this.newTrip.newReport.reportId = response.data[0].reportId + 1;
          this.newTrip.newReport.newHotFly.reportId = response.data[0].reportId + 1;
          this.newTrip.newReport.newFishCaught.reportId = response.data[0].reportId + 1;
        })
        .catch((error) => {
          console.log(error);
        });

      //bring mySpots in
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'spots-uid/' + this.user.uid)
        .then((response) => {
          this.newTrip.mySpots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring flies from flybox in
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'flybox/' + this.user.uid)
        .then((response) => {
          this.newTrip.flybox = response.data;
        })
        .catch((error) => {
          console.log(error);
        })

      //bring targetSpecies in
      axios.get(process.env.VUE_APP_REQUEST_BASE + 'targetspecies/' + this.user.uid)
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
        this.$router.push('/')
      }
    })
  }
}

</script>
