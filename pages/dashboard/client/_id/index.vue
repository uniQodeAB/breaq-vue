<template>
  <div>
    <section class="container flex-col">
      <client-form
        :client="client"
        :addresses="addresses"
        :errors="errors"/>
    </section>
    <button
      class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
      @click.prevent="updateClient">
      Update
    </button>
  </div>
</template>

<script>
import { db } from '~/plugins/vuefire'
import ClientForm from '~/components/ClientForm.vue'

export default {
  layout: 'main',
  name: 'EditClient',

  async asyncData ({ route }) {
    let client = { }
    const addresses = []

    const clientDoc = db.collection('clients').doc(route.params.id)
    const clientRef = await clientDoc.get()

    if (clientRef.exists) {
      client = clientRef.data()

      const addressSnapshots = await clientDoc.collection('addresses').get()
      addressSnapshots.forEach(addressRef => {
        addresses.push(addressRef.data())
      })
    }
    return {
      client,
      addresses
    }
  },

  components: {
    ClientForm
  },

  data () {
    return {
      errors: { }
    }
  },

  methods: {
    validate () {
      this.errors = { }

      if (!this.client.name) this.errors['name'] = true
      if (!this.addresses.length) this.errors['addresses'] = true
    },
    async updateClient () {
      this.validate()

      if (!this.hasErrors(this.errors)) {
        await this.$store.dispatch('firebase/updateClient', {
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
