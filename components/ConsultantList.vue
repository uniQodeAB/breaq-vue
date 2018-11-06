<template>
  <div
    class="rounded shadow-md">
    <ul
      class="list-reset">
      <li
        v-for="consultant in consultants"
        :key="consultant.id"
        class="px-4 py-2 block text-black hover:bg-grey-light">
        {{ consultant.name }}
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
