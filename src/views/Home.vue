<template>
  <div class="about">



    <!-- V1

    <h1>Home</h1>

    <div><router-link to="/mytrips/addtrip"><button>Add a Trip</button></router-link></div>
    <div><router-link to="/mytrips"><button>My Trips</button></router-link></div>
    <div><router-link to="/myspots"><button>My Spots</button></router-link></div>
    <div><router-link to="/flybox"><button>Flybox</button></router-link></div>
    <div><router-link to="/targetspecies"><button>Target Species</button></router-link></div>
    <div><router-link to="/conditions"><button>Conditions</button></router-link></div>
    <div><router-link to="/stats"><button>Stats</button></router-link></div>
    <div><router-link to="/account"><button>Account</button></router-link></div> -->



    <!-- V2

    <div class="horizontal-menu">
    </div>

    <nav>
      <ul>
        <li><a><router-link to="/mytrips">MY TRIPS</router-link></a></li>
        <li><a><router-link to="/myspots">MY SPOTS</router-link></a></li>
        <li><a><router-link to="/flybox">FLYBOX</router-link></a></li>
        <li><a><router-link to="/targetspecies">TARGET SPECIES</router-link></a></li>
        <li><a><router-link to="/conditions">CONDITIONS</router-link></a></li>
        <li><a><router-link to="/stats">STATS</router-link></a></li>
        <li><a><router-link to="/account">ACCOUNT</router-link></a></li>
      </ul>
    </nav>

    <div class="inline-block">
      <Flybox></Flybox>
    </div> -->


    <!-- V3 -->
    <div class="horizontal-menu-wrapper">
      <div class="horizontal-menu">
        <img class="invert" src="../assets/nymph-icon.png" alt="nymph-icon">
        <h2>FlyGuide App</h2>
      </div>
    </div>

    <div class="wrapper">
      <div class="sidebar">
        <ul>
          <li><a><router-link to="/mytrips"><i class="fas fa-calendar-alt"></i>My Trips</router-link></a></li>
          <li><a><router-link to="/myspots"><i class="fas fa-map-marker-alt"></i>My Spots</router-link></a></li>
          <li><a><router-link to="/flybox"><i class="fas fa-book-open"></i>Flybox</router-link></a></li>
          <li><a><router-link to="/targetspecies"><i class="fas fa-fish"></i>Target Species</router-link></a></li>
          <li><a><router-link to="/conditions"><i class="fas fa-cloud"></i>Conditions</router-link></a></li>
          <li><a><router-link to="/stats"><i class="fas fa-chart-bar"></i>Stats</router-link></a></li>
          <li><a><router-link to="/account"><i class="fas fa-user"></i>Account</router-link></a></li>
        </ul>
        <!-- <div class="social_media">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div> -->
      </div>
      <div class="main_content">
        <div class="header">Welcome!! Have a nice day.</div>
        <div class="info">
          <div><Flybox /></div>
      </div>
    </div>
  </div>


  </div>
</template>

<script>

//import axios from 'axios';
import firebase from 'firebase';
import Flybox from './Flybox.vue'

export default {
  name: "Home",
  components: {
    Flybox
  },
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
