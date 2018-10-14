<template>
  <multiselect
    v-model="selectedClient"
    :options="clients"
    :close-on-select="true"
    :clear-on-select="false"
    :allow-empty="false"
    :preserve-search="true"
    name="clients"
    placeholder="Select client"
    label="name"
    track-by="id"
    class="input mb-2"
    @input="$emit('input', selectedClient)">
    <div slot="noResult">
      <span>No such client found.</span>

      <button @click="handleInput">
        Create new client
      </button>

    </div>
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },

  props: ['value', 'clients'],

  data () {
    return {
      selectedClient: null
    }
  },

  mounted () {
    this.selectedClient = this.value
  },

  methods: {
    handleInput () {
      console.log('hej')
    }
  }
}
</script>
