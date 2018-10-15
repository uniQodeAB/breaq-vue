<template>
  <form
    class="w-full">
    <div class="flex flex-wrap mb-6">
      <div class="w-full mb-6">
        <label
          class="label"
          for="client-name">
          Client name
        </label>
        <input
          id="client-name"
          v-model="form.name"
          class="input w-full"
          type="text"
          placeholder="Client name">
      </div>
      <div class="w-full mb-2">
        <label
          class="label"
          for="client-address">
          Client Address
        </label>
        <places-auto-complete
          v-model="form.address"
          name="client-address"
          class="input w-full" />

      </div>
    </div>

    <transition-expand>
      <div v-if="form.address">
        <breaq-map
          :location="form.address.location"
          style="height: 20em;"
          class="border border-grey-light rounded-sm" />
      </div>
    </transition-expand>

    <button
      :disabled="disabled"
      class="button button--blue">
      Save client
    </button>
  </form>

</template>

<script>
import PlacesAutoComplete from '~/components/PlacesAutoComplete.vue'
import BreaqMap from '~/components/Map.vue'
import TransitionExpand from '~/components/TransitionExpand.vue'

export default {
  components: {
    PlacesAutoComplete,
    BreaqMap,
    TransitionExpand
  },

  props: ['client'],

  data () {
    return {
      form: {
        name: '',
        address: null
      }
    }
  },

  computed: {
    disabled () {
      return !(this.form.name && this.form.address)
    }
  }
}
</script>
