<template>
  <div class="flex">
    <div class="flex pin-l pin-t">
      <img
        :src="consultant.photoURL"
        class="h-12 rounded-full">
    </div>
    <div class="flex-col pin-r pin-t mb-auto">
      <h1>
        {{ consultant.name }}
      </h1>
      <p>{{ consultant.expertise || 'Consultant' }} at {{ consultant.company }}</p>
      <p>{{ consultant.email || '*email hidden*' }}</p>
      <p>{{ consultant.phoneNumber || '*phone number hidden*' }}</p>
      <p>Works at {{ consultant.client.name }}</p>
      <p>{{ consultant.clientAddress.formattedAddress }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['consultant']
}
</script>
