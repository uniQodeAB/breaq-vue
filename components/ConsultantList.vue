<template>
  <div
    class="rounded shadow-md">
    <ul
      class="list-reset">
      <li
        v-for="consultant in consultants"
        :key="consultant.id"
        class="px-4 py-2 block text-black hover:bg-grey-light">

        <!-- Refactor consultant to a component -->
        <div class="flex">
          <div class="flex pin-l pin-t">
            <img
              :src="consultant.photoURL"
              class="h-12 rounded-full">
          </div>
          <div class="flex-col pin-r pin-t mb-auto">
            <!-- Make this bigger and bold -->
            <h1>
              {{ consultant.name }}
            </h1>
            <p>Proffesion at {{ consultant.company }}</p>
            <p>Email</p>
            <p>PhoneNumber</p>
            <p>Works at {{ consultant.client.name }}</p>
            <p>{{ consultant.clientAddress.formattedAddress }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '~/plugins/vuefire'

export default {
  data () {
    return {
      consultants: [],
      loaded: false
    }
  },

  async mounted () {
    try {
      await this.$bind('consultants', db.collection('consultants').orderBy('createdAt'))
      this.loaded = true
    } catch (error) {
      console.log('error in loading: ', error)
    }
  }
}
</script>
