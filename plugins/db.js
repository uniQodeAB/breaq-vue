import Vue from 'vue'
import { db } from '~/plugins/vuefire'
import { firestore } from 'firebase'

export default function ({ app, store }) {
  const $db = {

    async updateProfile (data) {
      const profileRef = db.collection('users').doc(store.state.profile.uid)
      await profileRef.update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp()
      })

      const profile = await profileRef.get()
      store.commit('SET_PROFILE', profile.data())
    },

    async clientExists (client) {
      const clientRef = await db.collection('clients').where('name', '==', client.name).get()
      return !clientRef.empty
    },

    async createClient (client, address) {
      const docRef = db.collection('clients').doc()
      await docRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        id: docRef.id,
        name: client.name
      })

      client.id = docRef.id

      if (address) {
        await this.addAddress(client, address)
      }

      return docRef.id
    },

    async addressExists (client, address) {
      const addressRef = await db.collection('clients').doc(client.id).collection('addresses').doc(address.id).get()
      return addressRef.exists
    },

    async addAddress (client, address) {
      const addressCollection = db
        .collection('clients')
        .doc(client.id)
        .collection('addresses')

      const addressRef = addressCollection.doc(address.id)
      await addressRef.set(address)
    }
  }

  Vue.prototype.$db = $db
  store.$db = $db
  app.$db = $db
}
