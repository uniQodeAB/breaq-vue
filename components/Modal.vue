<template>
  <transition
    name="modal"
    appear>
    <div
      v-if="open"
      class="fixed pin z-50 flex items-center justify-center"
      style="background-color: hsla(0, 0%, 0%, .5)"
      @closeModal="close"
      @keyup.esc="close">
      <div
        class="mx-auto bg-grey-lightest rounded shadow-lg w-2/3 p-6">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all .3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>

<script>
export default {
  props: ['open'],

  created () {
    document.addEventListener('keydown', e => {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    })
  },

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
