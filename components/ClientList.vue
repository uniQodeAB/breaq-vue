<template>
  <div
    class="rounded shadow-md">
    <ul
      class="list-reset">
      <li
        v-for="client in clients"
        :key="client.id"
        class="px-4 py-2 block text-black hover:bg-grey-light"
        @click="$router.push({ name: 'dashboard-client-id', params: { id: client.id } })">
        {{ client.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '~/plugins/vuefire'

export default {
  data () {
    return {
      clients: [],
      loaded: false
    }
  },

  async mounted () {
    try {
      await this.$bind('clients', db.collection('clients').orderBy('createdAt'))
      this.loaded = true
    } catch (error) {
      console.log('error in loading: ', error)
    }
  }
}
</script>
