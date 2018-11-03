<template>
  <div class="w-full h-full">
    <breaq-map :markers="markers" />
  </div>
</template>

<script>
import BreaqMap from '~/components/Map.vue'

export default {
  components: {
    BreaqMap
  },

  async asyncData ({ app }) {
    const clients = await app.$db.fetchClients()
    return { clients }
  },

  computed: {
    markers () {
      const consultants = []

      this.clients.forEach(client => {
        client.consultants.forEach(consultant => {
          consultants.push(consultant)
        })
      })

      return consultants.map(consultant => ({
        location: consultant.currentClientAddress.location,
        center: true
      }))
    }
  }

  // async mounted () {
  //   const clients = await this.$db.fetchClients()

  //   console.log(clients)
  //   // clients.forEach(async client => {
  //   //   const consultants = await this.
  //   // })
  // }
}
</script>
