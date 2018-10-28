<template>
  <div v-if="client">
    <h2>Select an address for {{ client.name }} </h2>
    <ul class="list-reset">
      <li
        v-for="address in addresses"
        :key="address.id"
        class="p-2 cursor-pointer hover:bg-blue hover:text-white"
        @click="addressSelected(address)">
        {{ address.formattedAddress }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['client', 'addresses'],

  methods: {
    addressSelected (address) {
      this.$emit('address-selected', address)
    }
  }
}
</script>
