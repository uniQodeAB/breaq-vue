<template>
  <form
    class="w-full">
    <div class="flex flex-wrap mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="client-name">
          Client name
        </label>
        <input
          id="client-name"
          v-model="client.name"
          :class="{ 'border-red': errors.name }"
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type="text"
          placeholder="Client name">
        <p
          v-if="errors.name"
          class="text-red text-xs italic">Please fill out this field.</p>
      </div>
      <div class="w-full px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="client-address">
          Client Address
        </label>
        <places-auto-complete
          id="client-address"
          @input="addAddress" />
        <div/>
        <div
          v-if="addresses.length"
          class="border-t border-grey-light">
          <div
            v-for="(address, index) in addresses"
            :key="address.id"
            class="text-sm w-full flex justify-between border-b border-grey-light pb-2 pt-2">
            <span class="leading-loose">{{ address.formattedAddress }}</span>

            <button
              class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              @click.prevent="removeAddress(index)">
              <delete-icon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>

</template>

<script>
import PlacesAutoComplete from '~/components/PlacesAutoComplete.vue'
import DeleteIcon from '~/components/DeleteIcon.vue'

export default {
  components: {
    PlacesAutoComplete,
    DeleteIcon
  },

  props: ['client', 'addresses', 'errors'],

  methods: {
    addAddress (newAddress) {
      if (!this.addresses.find(address => address.id === newAddress.id)) {
        this.addresses.push(newAddress)
      }
    },
    removeAddress (index) {
      this.addresses.splice(index, 1)
    }
  }
}
</script>
