<template>
  <div class="about">
    <h1>Home</h1>
    <!-- <p>uid: {{ this.user.uid }}</p>
    <p>display name: {{ this.user.displayName }}</p> -->
    <div><router-link to="/mytrips/addtrip"><button>Add a Trip</button></router-link></div>
    <div><router-link to="/mytrips"><button>My Trips</button></router-link></div>
    <div><router-link to="/myspots"><button>My Spots</button></router-link></div>
    <div><router-link to="/flybox"><button>Flybox</button></router-link></div>
    <div><router-link to="/targetspecies"><button>Target Species</button></router-link></div>
    <div><router-link to="/conditions"><button>Conditions</button></router-link></div>
    <div><router-link to="/stats"><button>Stats</button></router-link></div>
    <div><router-link to="/account"><button>Account</button></router-link></div>

    <div class="horizontal-menu">
    </div>

    <nav>
      <ul>
        <li><router-link to="/mytrips">MY TRIPS</router-link></li>
        <li><router-link to="/myspots">MY SPOTS</router-link></li>
        <li><router-link to="/flybox">Flybox</router-link></li>
        <li><router-link to="/targetspecies">Target Species</router-link></li>
        <li><router-link to="/conditions">Conditions</router-link></li>
        <li><router-link to="/stats">Stats</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
      </ul>
    </nav>

    <div>
      <h1>hello</h1>
    </div>



  </div>
</template>

<script>

//import axios from 'axios';
import firebase from 'firebase';

export default {
  name: "Home",
  data() {
    return {
      user: {},
    }
  },
  methods: {
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        this.user = user;
      } else {
        console.log('no user signed in')
        window.location.href = "http://127.0.0.1:8080/";
      }
    })
  }
}

</script>
