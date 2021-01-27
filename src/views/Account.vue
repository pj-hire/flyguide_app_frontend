<template>
  <div class="about">

    <h1>Account</h1>

    <b-card>
      <h3>{{ this.user.displayName }}</h3>
      <p>{{ this.user.email }}</p>


      <div>
        <b-button v-b-modal.modal-1>Update Email</b-button>

        <b-modal id="modal-1" title="Update Email Address" ok-only ok-title="Update" @ok="updateEmail">
          <div>Enter New Email: <input v-model="newEmailOne"></div>
          <div>Re-Enter New Email: <input v-model="newEmailTwo"></div>
        </b-modal>
      </div>

      <div>
        <b-button v-b-modal.modal-2>Update Password</b-button>

        <b-modal id="modal-2" title="Update Password" ok-only ok-title="Update" @ok="updatePassword">
          <div>Enter New Password: <input type="password" v-model="newPasswordOne"></div>
          <div>Re-Enter New Password: <input type="password" v-model="newPasswordTwo"></div>
        </b-modal>
      </div>

      <b-button @click="logout">Log Out</b-button>
      
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
