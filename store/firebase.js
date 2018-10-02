import { db } from '~/plugins/vuefire'
import { firestore } from 'firebase'

export const state = () => ({
  creatingClient: false
})

export const actions = {
  async createClient ({ commit }, payload) {
    commit('CREATING_CLIENT', true)

    const newClientRef = db.collection('clients').doc()
    await newClientRef.set({
      ...payload.client,
      id: newClientRef.id,
      createdAt: firestore.FieldValue.serverTimestamp()
    })

    payload.addresses.forEach(address => newClientRef.collection('addresses').add(address))

    commit('CREATING_CLIENT', false)
  },

  async updateClient ({ commit }, payload) {
    commit('CREATING_CLIENT', true)

    const clientRef = db.collection('clients').doc(payload.client.id)
    await clientRef.update({
      ...payload.client
    })

    // TODO update sub-collection

    commit('CREATING_CLIENT', false)
  }
}

export const mutations = {
  CREATING_CLIENT (state, fetching) {
    state.fetchingClients = fetching
  }
}
