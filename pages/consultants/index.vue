<template>
  <div class="mx-8">
    <h1 class="heading">
      Consultants
      <nuxt-link
        class="bg-blue hover:bg-blue-dark text-white font-bold px-4 rounded no-underline m-8"
        to="/home/clients">
        View Clients
      </nuxt-link>
      <nuxt-link
        class="bg-blue hover:bg-blue-dark text-white font-bold px-4 rounded no-underline"
        to="/">
        View in Map
      </nuxt-link>
    </h1>
    <consultant-list/>
  </div>
</template>
<script>
import ConsultantList from '~/components/ConsultantList.vue'

export default {
  layout: 'main',
  components: {
    ConsultantList
  }
}
</script>
