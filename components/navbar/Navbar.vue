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
        <a
          href="#"
          class="nav-link">Home</a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link">Products</a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link">About Us</a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link">Contact Us</a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link">Blog</a>
      </li>
    </ul>
  </nav>

  <!-- <div class="w-full bg-white h-28 fixed pin-t z-10">
    <div class="flex justify-between items-center h-12 mx-8 py-2 mt-12">
      <nuxt-link
        to="/"
        class="h-12 py-2 text-blue">
        <arrow-left />
      </nuxt-link>

      <h1 class="heading">Profile</h1>

      <div class="flex items-center">
        <img
          :src="user.photoURL"
          :alt="user.displayName"
          class="h-12 rounded-full">
      </div>
    </div>
  </div> -->
</template>

<script>
import ArrowLeft from '~/components/icons/ArrowLeft.vue'
import NavbarToggle from '~/components/navbar/NavbarToggle.vue'
import { mapState } from 'vuex'

export default {

  components: {
    ArrowLeft,
    NavbarToggle
  },

  data () {
    return {
      active: false
    }
  },

  computed: {
    ...mapState(['user'])
  }

}
</script>
