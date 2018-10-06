<template>
  <div class="login w-full h-full bg-center bg-no-repeat bg-cover">
    <login />
  </div>
</template>

<script>
import Login from '~/components/Login.vue'

export default {
  components: {
    Login
  }
}
</script>

<style scoped>
  .login {
    background-image: url('~assets/img/background-1.jpg')
  }
</style>
