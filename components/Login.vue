<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="flex flex-1 items-center">
      <img
        src="~/assets/logos/breaq-logo.png"
        class="p-2 w-64" />
    </div>

    <div
      class="flex-1">

      <transition
        name="fade"
        mode="out-in">
        <div
          v-if="!user"
          class="flex flex-col items-center">
          <google-sign-in-button
            v-if="!user"
            @click="signInWithGoogle" />

          <div
            v-if="error"
            class="bg-red-dark border border-red-darker p-4 rounded-sm w-64 text-center">
            <span class="font-bold mb-2">
              {{ error.message }}
            </span>
            <p>Contact the site administration if you think this is an error</p>
          </div>

        </div>

        <div
          v-else
          key="2"
          class="flex flex-col items-center">
          <div
            class="flex flex-col items-center bg-white p-4 rounded shadow-lg border border-grey-light mb-8"
            style="width: fit-content;">
            <h2 class="text-center mb-4">
              Welcome,
              <span class="block">{{ user.displayName }}</span>
            </h2>

            <img
              :src="user.photoURL"
              class="w-32 rounded-full"/>
          </div>

          <span class="text-lg text-white font-semibold opacity-0 redirect-text">Redirecting...</span>

        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '~/plugins/vuefire'

import GoogleSignInButton from '~/components/GoogleSignInButton.vue'

export default {

  components: {
    GoogleSignInButton
  },
  data () {
    return {
      user: null,
      error: undefined
    }
  },

  methods: {
    async signInWithGoogle () {
      this.error = null
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      try {
        const response = await firebase.auth().signInWithPopup(provider)
        const user = response.user
        await this.isAuthorized(user)

        if (!this.error) {
          this.user = user
          this.redirect()
          this.$store.commit('SET_USER', user)
        } else {
          firebase.auth().signOut()
          this.$store.commit('SET_USER', null)
          this.$store.commit('SET_PROFILE', null)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async redirect () {
      setTimeout(async () => {
        await this.$store.dispatch('fetchProfile')
        this.$router.push('/dashboard')
      }, 5000)
    },
    async isAuthorized (user) {
      try {
        await db.collection('users').doc(user.uid).get()
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s
  }

  .fade-enter,
  .fade-leave {
    opacity: 0
  }

  .redirect-text {
    animation: show 2s forwards;
    animation-delay: 2s;
  }

  @keyframes show {
    from { opacity: 0; }
    to { opacity: 100; }
  }
</style>
