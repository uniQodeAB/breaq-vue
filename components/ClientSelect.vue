<template>
  <div>
    <multiselect
      v-model="selectedClient"
      :options="clients"
      :close-on-select="true"
      :clear-on-select="false"
      :allow-empty="false"
      :preserve-search="true"
      name="clients"
      placeholder="Select client"
      label="name"
      track-by="id"
      class="input mb-2"
      @input="$emit('input', selectedClient)"
      @search-change="handleSearch">
      <div
        slot="noResult"
        class="p-2">
        <span class="block">No such client found.</span>

        <button
          class="m-2 border border-grey shadow-md p-2 rounded-sm bg-blue text-white"
          @click.prevent="openForm = true">
          Create new client
        </button>

      </div>
    </multiselect>
    <portal to="modals">
      <modal :open="openForm">
        <client-form
          :client="search"
          @save="onClientSave"
          @close="openForm = false" />
      </modal>
    </portal>

  </div>

</template>

<script>
import { Portal } from 'portal-vue'
import Modal from '~/components/Modal.vue'
import ClientForm from '~/components/ClientForm.vue'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Portal,
    Modal,
    ClientForm,
    Multiselect
  },

  props: ['value', 'clients'],

  data () {
    return {
      selectedClient: { },
      openForm: false,
      search: ''
    }
  },

  mounted () {
    this.selectedClient = this.value
  },

  methods: {
    handleSearch (search) {
      this.search = search
    },
    onClientSave (client) {
      this.selectedClient = client
      this.$emit('input', this.selectedClient)
    }
  }
}
</script>
