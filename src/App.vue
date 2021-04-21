<template>
  <div id="app">
    <div class="about">
      <div class="horizontal-menu-wrapper">
        <div class="horizontal-menu">
          <input type="checkbox" id="check">
          <label id="checkbtn" class="checkbtn" :class="{checkbtn_hide: !isNotLogin}">
            <span @click="toggleNav"><i class="fas fa-bars"></i></span>
          </label>
          <h2>Fly-Guide Log</h2>
        </div>
      </div>
      <div class="wrapper">
        <div class="sidebar" id="sidebar" v-if="isNotLogin">
          <ul>
            <li><a @click="toggleNav"><router-link to="/mytrips"><i class="fas fa-calendar-alt"></i>My Trips</router-link></a></li>
            <li><a @click="toggleNav"><router-link to="/spots"><i class="fas fa-map-marker-alt"></i>My Spots</router-link></a></li>
            <li><a @click="toggleNav"><router-link to="/flybox"><i class="fas fa-book-open"></i>Flybox</router-link></a></li>
            <li><a @click="toggleNav"><router-link to="/targetspecies"><i class="fas fa-fish"></i>Target Species</router-link></a></li>
            <!-- <li><a><router-link to="/conditions"><i class="fas fa-cloud"></i>Conditions</router-link></a></li> -->
            <li><a @click="toggleNav"><router-link to="/stats"><i class="fas fa-chart-bar"></i>Stats</router-link></a></li>
            <li><a @click="toggleNav"><router-link to="/account"><i class="fas fa-user"></i>Account</router-link></a></li>
          </ul>
        </div>
        <div class="main_content" :class="{login: !isNotLogin}">
          <div class="info">
            <div><router-view/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isNotLogin: true,
      }
    },
    methods: {
      onResize() {
        let sidebar = document.getElementById("sidebar");
        if (window.innerWidth > 768) {
          sidebar.style.display = "block";
        } else if (window.innerWidth <= 768) {
          sidebar.style.display = "none";
        }
      },
      toggleNav() {
        let sidebar = document.getElementById("sidebar");
        if (window.innerWidth <= 768) {
          if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
          } else {
            sidebar.style.display = "none";
          }
        }
      },
    },
    watch: {
      $route () {
        if (this.$router.currentRoute.name === 'Login') {
          this.isNotLogin = false
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    created() {
      console.log(process.env.VUE_APP_REQUEST_BASE);
      if (this.$router.currentRoute.name === 'Login') {
        this.isNotLogin = false;
        // let menu = document.getElementByClass("horizontal-menu-wrapper");
        // menu.style.textAlign = "center";
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>
