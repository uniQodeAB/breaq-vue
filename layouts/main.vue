<template>
  <div class="font-sans antialiased leading-tight h-full">
    <breaq-navbar />
    <nuxt class="mt-20"/>
    <portal-target
      name="modals"
      multiple>
    </portal-target>
  </div>
</template>

<script>
import { PortalTarget } from 'portal-vue'
import BreaqNavbar from '~/components/Navbar.vue'

export default {

  components: {
    PortalTarget,
    BreaqNavbar
  }
}
</script>
