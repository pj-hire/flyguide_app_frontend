<template>
  <!-- do I need to change the class below -->
  <div class="home">
    <div>Welcome to flyguide app</div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>

import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';


export default {
  name: 'Login',
  created() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/mytrips',
    })
  }
}
</script>
