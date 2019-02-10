<template>
  <div class="mx-8">
    <h1 class="heading">
      Clients
    </h1>
    <client-list/>
  </div>
</template>

<script>
import ClientList from '~/components/ClientList.vue'

export default {
  layout: 'main',

  middleware: ['auth', 'check-profile'],
  components: {
    ClientList
  }
}
</script>
