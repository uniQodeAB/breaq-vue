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
  components: {
    Login
  },

  data () {
    return {
      bgImageId: null
    }
  },

  computed: {
    bgImage () {
      const overlay = 'linear-gradient( rgba(0, 0, 0, 0.45),rgba(0, 0, 0, 0.45))'
      return {
        background: `${overlay}, url(backgrounds/bg-${this.bgImageId}.jpg)`
      }
    }
  },

  created () {
    this.bgImageId = this.getRandomInt(9)
  },

  methods: {
    getRandomInt (maxInclusive) {
      return Math.floor(Math.random() * (maxInclusive + 1))
    }
  }
}
</script>
