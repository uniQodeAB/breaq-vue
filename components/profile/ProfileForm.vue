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
              v-model="profile.name"
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
              v-model="profile.email"
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
              v-model="profile.company"
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
              class="label">Area of expertise</label>
            <input
              v-model="form.expertise"
              type="text"
              name="title"
              class="input w-full"
              placeholder="Area of expertise">
          </div>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full md:w-1/2 px-3">
            <label
              for="clients"
              class="label">Current assignment
            </label>
            <client-select
              v-model="client"
              :clients="clients"
              name="clients"
              @input="onClientSelect" />
          </div>

          <div class="w-full md:w-1/2 px-3">
            <label
              for="address"
              class="label">Address</label>
            <places-auto-complete
              v-model="clientAddress"
              :disabled="!client"
              name="address"
              class="w-full"/>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full px-3">
            <breaq-map
              v-if="clientAddress"
              :markers="[{
                location: clientAddress.location,
                center: true,
                photoURL: profile.photoURL
              }]"
              style="height: 20em;"
              class="border border-grey-light rounded-lg px-3 mb-24" />
          </div>
        </div>
      </div>
    </div>

    <slot />

    <portal to="modals">
      <modal
        :open="openSelectAddressModal"
        @close="openSelectAddressModal = false"
      >
        <address-selecter
          :client="client"
          :addresses="clientAddresses"
          @address-selected="onAddressSelect" />
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
import AddressSelecter from '~/components/profile/AddressSelecter.vue'

export default {

  components: {
    Portal,
    PlacesAutoComplete,
    Modal,
    BreaqMap,
    ClientSelect,
    AddressSelecter
  },

  data () {
    return {
      form: {
        phoneNumber: null,
        expertise: null
      },
      client: null,
      clientAddress: null,
      clients: [],
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
    const { phoneNumber, expertise, client, clientAddress } = this.profile

    this.form = {
      phoneNumber,
      expertise
    }

    this.client = client
    this.clientAddress = clientAddress
  },

  methods: {
    async onClientSelect () {
      this.clientAddresses = []

      this.clientAddresses = await this.fetchClientAddresses()

      if (this.clientAddresses.length === 1) {
        this.clientAddress = this.clientAddresses[0]
      } else if (this.clientAddresses.length > 1) {
        this.openSelectAddressModal = true
      } else {
        this.clientAddress = this.client.address
      }
    },

    async fetchClientAddresses () {
      const addresses = []

      const docSnapshot = await db.doc(`clients/${this.client.name}`).get()

      if (docSnapshot.exists) {
        const snapshots = await docSnapshot.ref.collection('addresses').get()
        snapshots.forEach(doc => addresses.push(doc.data()))
      }

      return addresses
    },

    onAddressSelect (address) {
      this.clientAddress = address
      this.openSelectAddressModal = false
    },

    async onSubmit () {
      try {
        await this.$db.updateProfile(this.form, this.client, this.clientAddress)
        this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    }
  }

}
</script>
