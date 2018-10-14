<template>
  <div class="w-full flex">
    <div class="flex flex-col w-full mt-4 mx-16 mb-24">
      <div class="flex flex-row">
        <div class="flex flex-col flex-1 mx-2">
          <label
            for="name"
            class="label">Name</label>
          <input
            v-model="form.name"
            type="text"
            name="name"
            class="input mb-2"
            disabled="disabled">
        </div>

        <div class="flex flex-col flex-1 mx-2">
          <label
            for="email"
            class="label">Email</label>
          <input
            v-model="form.email"
            class="input mb-2"
            type="text"
            name="email"
            disabled="disabled">
        </div>
      </div>

      <div class="flex flex-row">
        <div class="flex flex-col flex-1 mx-2">
          <label
            for="title"
            class="label">Professional Title</label>
          <input
            v-model="form.title"
            type="text"
            name="title"
            class="input mb-2"
            placeholder="Professional title">
        </div>

        <div class="flex flex-col flex-1 mx-2">
          <label
            for="phoneNumber"
            class="label">Phone Number*</label>
          <input
            v-model="form.phoneNumber"
            type="tel"
            name="phoneNumber"
            class="input mb-2"
            placeholder="Phone number">
        </div>
      </div>

      <div class="mx-2">
        <label
          for="clients"
          class="label">Current Client
        </label>
        <multiselect
          v-model="selectedClient"
          :options="clients"
          :close-on-select="true"
          name="clients"
          placeholder="Select one"
          label="name"
          track-by="name"
          class="input mb-2"
          @input="onClientSelect" />

        <label
          for="address"
          class="label">Address</label>
        <places-auto-complete
          v-model="selectedAddress"
          :disabled="!selectedClient"
          name="address"
          class="w-full mb-4"/>
      </div>

      <div class="mx-2">
        <breaq-map
          v-if="selectedAddress"
          :location="selectedAddress.location"
          style="height: 20em;"
          class="border border-grey-light rounded-sm" />
      </div>
    </div>

    <div class="fixed w-full pin-b bg-grey-lightest border-t border-grey-light h-16">
      <div class="flex justify-end items-center h-full">
        <button class="border border-green-dark bg-green-lighter shadow-md p-2 mr-8 rounded-sm">
          Complete profile
        </button>
      </div>
    </div>

    <portal to="modals">
      <modal
        :open="openSelectAddressModal"
        @close="openSelectAddressModal = false">

        <ul>
          <li
            v-for="address in clientAddresses"
            :key="address.id">
            {{ address.formattedAddress }}
          </li>
        </ul>
      </modal>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '~/plugins/vuefire'
import Multiselect from 'vue-multiselect'
import { Portal } from 'portal-vue'
import PlacesAutoComplete from '~/components/PlacesAutoComplete.vue'
import Modal from '~/components/Modal.vue'
import BreaqMap from '~/components/Map.vue'

export default {
  name: 'Registration',

  components: {
    Multiselect,
    PlacesAutoComplete,
    Portal,
    Modal,
    BreaqMap
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
    ...mapState(['profile'])
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

      await this.fetchClientAddresses()

      if (this.clientAddresses.length === 1) {
        this.selectedAddress = this.clientAddresses[0]
      } else if (this.clientAddresses.length > 1) {
        this.openSelectAddressModal = true
      }
    },

    async fetchClientAddresses () {
      const snapshots = await db.collection('clients').doc(this.selectedClient.id).collection('addresses').get()
      snapshots.forEach(doc => this.clientAddresses.push(doc.data()))
    }
  }
}
</script>
