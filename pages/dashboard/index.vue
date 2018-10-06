<template>
  <div class="mx-8">
    <nuxt-link
      to="dashboard/client/create">
      Create Client
    </nuxt-link>
    <client-list/>
  </div>
</template>

<script>
import ClientList from '~/components/ClientList.vue'

export default {
  components: {
    ClientList
  }
}
</script>
