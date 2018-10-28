<template>
  <div class="w-full bg-white h-28 fixed pin-t z-10">
    <div class="flex justify-between items-center h-12 mx-8 py-2 mt-12">
      <nuxt-link
        to="/"
        class="h-12 py-2 text-blue">
        <arrow-left />
      </nuxt-link>

      <h1 class="heading">Profile</h1>

      <div class="flex items-center">
        <img
          :src="user.photoURL"
          :alt="user.displayName"
          class="h-12 rounded-full">
      </div>
    </div>
  </div>
</template>

<script>
import ArrowLeft from '~/components/icons/ArrowLeft.vue'

import { mapState } from 'vuex'

export default {

  components: {
    ArrowLeft
  },

  computed: {
    ...mapState(['user'])
  }

}
</script>
