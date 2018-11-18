<template>
  <div class="flex">
    <div class="flex pin-l pin-t">
      <img
        :src="consultant.photoURL"
        class="h-12 rounded-full">
    </div>
    <div class="flex-col pin-r pin-t mb-auto">
      <!-- Make this bigger and bold -->
      <h1>
        {{ consultant.name }}
      </h1>
      <p>Proffesion at {{ consultant.company }}</p>
      <p>Email</p>
      <p>PhoneNumber</p>
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
