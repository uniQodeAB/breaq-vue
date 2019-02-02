<template>
  <ul
    :class="active ? 'sm:block' : 'sm:hidden'"
    class="main-nav hidden md:flex">
    <li
      v-for="path in paths"
      :key="path.name">

      <nav-link
        :path="path.path"
        @navigate="$emit('navigate')">
        {{ path.name }}
      </nav-link>

    </li>
  </ul>
</template>

<script>
import NavLink from '~/components/navbar/NavLink.vue'

export default {
  components: {
    NavLink
  },

  props: {
    active: {
      type: Boolean,
      required: true
    },
    paths: {
      type: Array,
      required: true
    }
  }
}
</script>
