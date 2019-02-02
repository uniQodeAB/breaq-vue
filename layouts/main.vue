<template>
  <div class="font-sans antialiased leading-tight h-full">
    <breaq-navbar class="fixed w-full pin-t z-10"/>
    <nuxt class="pt-10 md:pt-20"/>
    <portal-target
      name="modals"
      multiple>
    </portal-target>
  </div>
</template>

<script>
import { PortalTarget } from 'portal-vue'
import BreaqNavbar from '~/components/navbar/Navbar.vue'

export default {

  components: {
    PortalTarget,
    BreaqNavbar
  }
}
</script>
