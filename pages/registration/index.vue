<template>
  <form
    class="flex flex-col flex-grow"
    @submit.prevent="onSubmit">
    <div class="flex-grow">
      <div>
        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-1/2 mb-4 px-3">
            <label
              for="name"
              class="label">Name</label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              class="input w-full"
              disabled="disabled">
          </div>

          <div class="w-full md:w-1/2 px-3">
            <label
              for="email"
              class="label">Email</label>
            <input
              v-model="form.email"
              class="input w-full"
              type="text"
              name="email"
              disabled="disabled">
          </div>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-1/2 mb-4 px-3">
            <label
              for="phoneNumber"
              class="label">Phone Number</label>
            <input
              v-model="form.phoneNumber"
              type="tel"
              name="phoneNumber"
              class="input w-full"
              placeholder="Phone number">
          </div>

          <div class="w-full md:w-1/2 px-3">
            <label
              for="title"
              class="label">Q-group company</label>
            <input
              v-model="form.title"
              type="text"
              name="title"
              class="input w-full"
              disabled="disabled">
          </div>

        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-1/2 px-3">
            <label
              for="title"
              class="label">Professional Title</label>
            <input
              v-model="form.title"
              type="text"
              name="title"
              class="input w-full"
              placeholder="Professional title">
          </div>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-1/2 px-3">
            <label
              for="clients"
              class="label">Current Client
            </label>
            <client-select
              v-model="selectedClient"
              :clients="clients"
              name="clients"
              @input="onClientSelect" />
          </div>

          <div class="w-full md:w-1/2 px-3">
            <label
              for="address"
              class="label">Address</label>
            <places-auto-complete
              v-model="selectedAddress"
              :disabled="!selectedClient"
              name="address"
              class="w-full"/>
          </div>
        </div>

        <div class="flex flex-wrap mb-32">
          <div class="w-full px-3">
            <breaq-map
              v-if="selectedAddress"
              :location="selectedAddress.location"
              style="height: 20em;"
              class="border border-grey-light rounded-lg px-3" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mb-16">
      <button class="button button--blue px-16">
        Save
      </button>
    </div>

    <portal to="modals">
      <modal
        :open="openSelectAddressModal"
        @close="openSelectAddressModal = false">
        <div v-if="selectedClient">
          <h2>Select an address for {{ selectedClient.name }} </h2>
          <ul class="list-reset">
            <li
              v-for="address in clientAddresses"
              :key="address.id"
              class="p-2 cursor-pointer hover:bg-blue-light hover:text-white"
              @click.prevent="addressSelected(address)">
              {{ address.formattedAddress }}
            </li>
          </ul>
        </div>
      </modal>
    </portal>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '~/plugins/vuefire'
import { Portal } from 'portal-vue'
import PlacesAutoComplete from '~/components/PlacesAutoComplete.vue'
import Modal from '~/components/Modal.vue'
import BreaqMap from '~/components/Map.vue'
import ClientSelect from '~/components/ClientSelect.vue'

export default {
  name: 'Registration',
  layout: 'main',

  components: {
    PlacesAutoComplete,
    Portal,
    Modal,
    BreaqMap,
    ClientSelect
  },

  data () {
    return {
      form: { },
      clients: [],
      selectedClient: null,
      selectedAddress: null,
      clientAddresses: [],
      openSelectAddressModal: false
    }
  },

  computed: {
    ...mapState(['profile']),

    isExistingClient () {
      return this.selectedClient && this.selectedClient.id
    }
  },

  firestore: {
    clients: db.collection('clients')
  },

  mounted () {
    this.form = Object.assign({ title: '' }, this.profile)
  },

  methods: {
    async onClientSelect () {
      this.clientAddresses = []

      if (this.isExistingClient) {
        await this.fetchClientAddresses()

        if (this.clientAddresses.length === 1) {
          this.selectedAddress = this.clientAddresses[0]
        } else if (this.clientAddresses.length > 1) {
          this.openSelectAddressModal = true
        }
      } else {
        this.selectedAddress = this.selectedClient.address
      }
    },

    async fetchClientAddresses () {
      const snapshots = await db.collection('clients').doc(this.selectedClient.id).collection('addresses').get()
      snapshots.forEach(doc => this.clientAddresses.push(doc.data()))
    },

    addressSelected (address) {
      this.selectedAddress = address
      this.openSelectAddressModal = false
    },

    async onSubmit () {
      try {
        await this.updateProfile()
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async updateProfile () {
      if (!this.isExistingClient) {
        await this.addClientIfNew()
      }

      await this.addAddressIfNew()

      const client = {
        name: this.selectedClient.name,
        id: this.selectedClient.id,
        addressId: this.selectedAddress.id,
        formattedAddress: this.selectedAddress.formattedAddress
      }

      await this.$db.updateProfile({
        ...this.form,
        client,
        isComplete: true
      })
    },
    async addClientIfNew () {
      if (!(await this.$db.clientExists(this.selectedClient))) {
        const id = await this.$db.createClient(this.selectedClient, this.selectedAddress)

        this.selectedClient.id = id
      }
    },

    async addAddressIfNew () {
      if (!(await this.$db.addressExists(this.selectedClient, this.selectedAddress))) {
        await this.$db.addAddress(this.selectedClient, this.selectedAddress)
      }
    }
  }
}
</script>
