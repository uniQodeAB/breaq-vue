<template>
  <div class="w-full h-full">
    <breaq-map :markers="markers" />
  </div>
</template>

<script>
import BreaqMap from '~/components/Map.vue'
import { db } from '~/plugins/vuefire'

export default {
  components: {
    BreaqMap
  },

  data () {
    return {
      consultants: [],
      loaded: false
    }
  },

  computed: {
    markers () {
      return !this.loaded ? [] : this.consultants.map(consultant => ({
        location: consultant.clientAddress.location,
        center: true,
        photoURL: consultant.photoURL
      }))
    }
  },

  async mounted () {
    try {
      await this.$bind('consultants', db.collection('consultants'))
      this.loaded = true
    } catch (error) {
      console.error('error in loading: ', error)
    }
  }
}
</script>
