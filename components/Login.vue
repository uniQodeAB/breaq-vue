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
        <google-sign-in-button
          v-if="!user"
          @click="signInWithGoogle" />

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
// import { mapGetters } from 'vuex'

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

  // computed: {
  //   ...mapGetters({
  //     user: 'auth/getUser'
  //   })
  // },

  methods: {
    async signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      try {
        const response = await firebase.auth().signInWithPopup(provider)
        this.user = response.user
        this.redirect()
      } catch (err) {
        console.log(err)
      }
    },
    async redirect () {
      setTimeout(() => {
        this.$router.push('/')
      }, 5000)
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
