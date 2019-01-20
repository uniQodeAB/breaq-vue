<template>
  <div class="mx-8">
    <h1 class="heading">
      Clients
    </h1>
    <nuxt-link
      to="/home/consultants">
      View Consultants
    </nuxt-link>
    <nuxt-link
      to="/">
      View in Map
    </nuxt-link>
    <client-list/>
  </div>
</template>

<script>
import ClientList from '~/components/ClientList.vue'

export default {
  middleware: ['auth', 'check-profile'],
  components: {
    ClientList
  }
}
</script>
