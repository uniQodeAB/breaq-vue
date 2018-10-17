<template>
  <div
    :style="bgImage"
    class="login w-full h-full bg-center bg-no-repeat bg-cover">
    <login />
  </div>
</template>

<script>
import Login from '~/components/Login.vue'

export default {
  layout: 'empty',

  components: {
    Login
  },

  computed: {
    bgImage () {
      const imageId = this.getRandomInt(9)
      const overlay = 'linear-gradient( rgba(0, 0, 0, 0.45),rgba(0, 0, 0, 0.45))'
      return {
        background: `${overlay}, url(backgrounds/bg-${imageId}.jpg)`
      }
    }
  },

  methods: {
    getRandomInt (maxInclusive) {
      return Math.floor(Math.random() * (maxInclusive + 1))
    }
  }
}
</script>
