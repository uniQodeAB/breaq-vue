<template>
  <div>
    <client-form
      :client="client"
      :addresses="addresses"
      :errors="errors">
      <button
        class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
        @click.prevent="createClient">
        Create
      </button>
    </client-form>
    <button
      class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
      @click.prevent="createClient">Create</button>
  </div>
</template>
<script>

import ClientForm from '~/components/ClientForm.vue'

export default {

  components: {
    ClientForm
  },
  data () {
    return {
      client: {
        name: ''
      },
      addresses: [ ],
      errors: { }
    }
  },

  methods: {
    validate () {
      this.errors = { }

      if (!this.client.name) this.errors['name'] = true
      if (!this.addresses.length) this.errors['addresses'] = true
    },
    async createClient () {
      this.validate()

      if (!this.hasErrors(this.errors)) {
        await this.$store.dispatch('firebase/createClient', {
          client: this.client,
          addresses: this.addresses
        })

        this.$router.push('/')
      }
    },
    hasErrors (obj) {
      return !!Object.values(obj).find(value => value)
    }
  }
}
</script>
