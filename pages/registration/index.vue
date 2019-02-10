<template>
  <profile-form>
    <app-footer>
      <button class="button button--blue px-16">
        Save
      </button>
    </app-footer>
  </profile-form>
</template>

<script>
import AppFooter from '~/components/Footer.vue'
import ProfileForm from '~/components/profile/ProfileForm.vue'

export default {
  layout: 'main',
  name: 'Registration',

  components: {
    AppFooter,
    ProfileForm
  }

}
</script>
