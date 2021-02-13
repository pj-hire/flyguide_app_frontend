<template>
  <div class="about">
    <h1>Account</h1>
    <b-card>
      
      <h3>{{ this.user.displayName }}</h3>
      <p>{{ this.user.email }}</p>

      <div>
        <b-button v-b-modal.modal-1>Update Email</b-button>
        <b-modal id="modal-1" title="Update Email Address" ok-only ok-title="Update" @ok="updateEmail">
          <b-container fluid>
            <div class="row">
              <div class="modal-email-pswd-left"><p class="my-4">Enter New Email:</p></div>
              <div class="modal-email-pswd-right"><input v-model="newEmailOne"></div>
            </div>
            <div class="row">
              <div class="modal-email-pswd-left"><p class="my-4">Re-Enter New Email:</p></div>
              <div class="modal-email-pswd-right"><input v-model="newEmailTwo"></div>
            </div>
          </b-container>
        </b-modal>
      </div>

      <div class="pt-10">
        <b-button v-b-modal.modal-2>Update Password</b-button>
        <b-modal id="modal-2" title="Update Password" ok-only ok-title="Update" @ok="updatePassword">
          <b-container fluid>
            <div class="row">
              <div class="modal-email-pswd-left"><p class="my-4">Enter New Password:</p></div>
              <div class="modal-email-pswd-right"><input type="password" v-model="newPasswordOne"></div>
            </div>
            <div class="row">
              <div class="modal-email-pswd-left"><p class="my-4">Re-Enter New Password:</p></div>
              <div class="modal-email-pswd-right"><input type="password" v-model="newPasswordTwo"></div>
            </div>
          </b-container>
        </b-modal>
      </div>

      <hr>

      <div class="center">
        <b-button variant="primary" @click="logout">Log Out</b-button>
      </div>

    </b-card>
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
      newEmailOne: '',
      newEmailTwo: '',
      newPasswordOne: '',
      newPasswordTwo: '',
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(function() {
        console.log('Sign-out successful.')
      }).catch(function(error) {
        console.log(error);
      });
    },
    updateEmail() {
      if (this.newEmailOne === this.newEmailTwo) {
        var user = firebase.auth().currentUser;
        var newEmail = this.newEmailOne;
        user.updateEmail(newEmail).then(function() {
          location.reload();
          console.log('update sucessful')
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        alert("Emails don't match");
      }
    },
    updatePassword() {
      if (this.newPasswordOne === this.newPasswordTwo) {
        var user = firebase.auth().currentUser;
        var newPassword = this.newPasswordOne;
        user.updatePassword(newPassword).then(function() {
          location.reload();
          console.log('update sucessful')
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        alert("Passwords don't match");
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
