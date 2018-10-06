<template>
  <div class="h-full flex flex-col justify-center items-center">
    <img
      src="~/assets/logos/breaq-logo.png"
      class="p-2 w-64" />

    <google-sign-in-button class="mt-16"/>

    <!-- <a class="cursor-pointer m-32">
      <img
        src="~/assets/img/btn_google_signin_light_normal_web.png"
        alt="Sign in with Google"
        class=""/>
    </a> -->
    <!-- <template v-if="user">
      <img
        :src="user.photoURL"
        alt="avatar"
        style="width: 30px; height: 30px; border-radius: 50%;">
      <button @click="signOut">Sign Out</button>
    </template>
    <template v-if="!user">
      <button @click="signInWithGoogle">Sign in with Google</button>
    </template> -->
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

import GoogleSignInButton from '~/components/GoogleSignInButton.vue'

export default {

  components: {
    GoogleSignInButton
  },
  data () {
    return {
      error: undefined
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },

  methods: {
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        this.user = result.user
      }).catch(err => {
        this.error = err
      })
    },
    signOut () {
      firebase.auth().signOut().then(() => {
        // this.user = null
      }).catch(err => {
        this.error = err
      })
    }
  }
}
</script>
