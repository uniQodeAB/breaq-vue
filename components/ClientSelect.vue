<template>
  <div>

    <multiselect
      v-model="selectedClient"
      :options="clients"
      :multiple="false"
      :searchable="true"
      :loading="isLoading"
      :clear-on-select="true"
      :close-on-select="true"
      :options-limit="300"
      :max-height="600"
      :show-no-results="true"
      :hide-selected="true"
      label="name"
      track-by="name"
      placeholder="Type to search"
      open-direction="bottom"
      class="input"
      @search-change="handleSearch"
      @input="$emit('input', $event)">

      <template
        slot="tag"
        slot-scope="{ option, remove }">
        <span class="custom__tag">
          <span>{{ option.name }}</span>
          <span
            class="custom__remove"
            @click="remove(option)">❌
          </span>
        </span>
      </template>

      <template
        slot="clear"
        slot-scope="props">
        <div
          v-if="selectedClient"
          class="multiselect__clear"
          @mousedown.prevent.stop="clearAll(props.search)"></div>
      </template>

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
          :client="{ name: searchQuery }"
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
      selectedClient: null,
      openForm: false,
      searchQuery: '',
      isLoading: false,
      filteredClients: []
    }
  },

  watch: {
    value: {
      handler () {
        this.selectedClient = this.value
      },
      immediate: true
    }
  },

  methods: {
    onClientSave (client) {
      this.selectedClient = client
      this.$emit('input', this.selectedClient)
    },
    handleSearch (query) {
      this.searchQuery = query
    }
  }
}
</script>
