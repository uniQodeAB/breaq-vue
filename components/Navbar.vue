<template>
  <div class="w-full bg-blue-lightest border-b border-blue-lighter shadow h-20 fixed pin-t z-10">
    <div class="flex justify-between mx-8 py-2">
      <nuxt-link to="/">
        <img
          src="~/assets/logos/breaq-logo.png"
          class="h-16"/>
      </nuxt-link>

      <div class="flex items-center">
        <span class=" font-semibold text-lg text-blue-dark mx-4">
          {{ user.displayName }}
        </span>

        <img
          :src="user.photoURL"
          :alt="user.displayName"
          class="h-16 rounded-full">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  }

}
</script>
