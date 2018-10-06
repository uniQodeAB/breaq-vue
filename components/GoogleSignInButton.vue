<template>
  <div
    class="m-4"
    @click="$emit('click')">
    <div class="button--google bg-white text-grey border appearance-none cursor-pointer outline-none overflow-hidden relative text-center align-middle whitespace-no-wrap">
      <a
        class="block flex items-center justify-between">
        <img
          alt="Google &quot;G&quot; Logo"
          src="~/assets/logos/g-logo.svg"
        />
        <span class="text-sm text--google px-2">Sign in with Google</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .button--google {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
    border-radius: 1px;
    box-sizing: border-box;
    transition: background-color .218s,border-color .218s,box-shadow .218s;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 0.218s, 0.218s, 0.218s;
    transition-timing-function: ease, ease, ease;
    transition-delay: 0s, 0s, 0s;
  }

  .button--google:hover {
    box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
  }

  .text--google {
    font-family: 'Roboto', sans-serif;
    opacity: 0.54;
  }

  .rounded-px {
    border-radius: 1px
  }

</style>
