<template>
  <div class="mx-8">
    <h1 class="heading">
      Consultants
    </h1>
    <consultant-list/>
  </div>
</template>
<script>
import ConsultantList from '~/components/ConsultantList.vue'

export default {
  layout: 'main',
  components: {
    ConsultantList
  }
}
</script>
