<template>
  <nav class="navbar">
    <navbar-toggle
      class="toggle"
      @toggle="active = !active"/>

    <nuxt-link
      to="/"
      class="logo">
      Logo
    </nuxt-link>

    <ul
      :class="active ? 'sm:block' : 'sm:hidden'"
      class="main-nav hidden md:flex">
      <li>
        <nuxt-link
          to="/"
          class="nav-link">
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/home/clients"
          class="nav-link">
          Clients
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/home/consultants"
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
    </ul>
  </nav>
</template>

<script>
import NavbarToggle from '~/components/navbar/NavbarToggle.vue'

export default {

  components: {
    NavbarToggle
  },

  data () {
    return {
      active: false
    }
  }
}
</script>
