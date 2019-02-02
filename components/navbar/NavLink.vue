<template>
  <nuxt-link
    :to="path"
    class="nav-link"
    exact
    @click.native="$emit('navigate')">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: ['path']
}
</script>
