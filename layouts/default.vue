<template>
  <div class="font-sans antialiased leading-tight h-full">
    <div class="navbar" />
    <nuxt />
    <portal-target
      name="modals"
      multiple>
    </portal-target>
  </div>
</template>

<script>
import { PortalTarget } from 'portal-vue'

export default {

  components: {
    PortalTarget
  }
}
</script>
