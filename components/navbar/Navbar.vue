<template>
  <nav class="navbar">
    <navbar-toggle
      class="toggle"
      @toggle="active = !active"/>

    <nuxt-link
      to="/"
      class="logo">
      <img
        src="~/assets/logos/breaq-logo.png"
        alt="Breaq"/>
    </nuxt-link>

    <main-nav
      :paths="paths"
      :active="active"
      @navigate="active = false" />
  </nav>
</template>

<script>
import NavbarToggle from '~/components/navbar/NavbarToggle.vue'
import MainNav from '~/components/navbar/MainNav.vue'

export default {

  components: {
    NavbarToggle,
    MainNav
  },

  data () {
    return {
      active: false,
      paths: [
        { name: 'Home', path: '/' },
        { name: 'Clients', path: '/clients' },
        { name: 'Consultants', path: '/consultants' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Settings', path: '/settings' }
      ]
    }
  }
}
</script>
