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

      <!-- <ul
      :class="active ? 'sm:block' : 'sm:hidden'"
      class="main-nav hidden md:flex"
      @navigate="active = false">
      <li>
        <nav-link path="/">
          Home
        </nav-link>

        <nuxt-link
          to="/"
          class="nav-link"
          exact
          @click.native="active = false">
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/clients"
          class="nav-link">
          Clients
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/consultants"
          class="nav-link">
          Consultants
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/dashboard"
          class="nav-link">
          Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/settings"
          class="nav-link">
          Settings
        </nuxt-link>
      </li>
    </ul> -->
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
