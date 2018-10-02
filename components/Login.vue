<template lang="html">
  <div>
    <h1>Simple Auth Demo</h1>
    <template v-if="user">
      <img
        :src="user.photoURL"
        alt="avatar"
        style="width: 30px; height: 30px; border-radius: 50%;">
      <button @click="signOut">Sign Out</button>
    </template>
    <template v-if="!user">
      <button @click="signInWithGoogle">Sign in with Google</button>
    </template>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
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
