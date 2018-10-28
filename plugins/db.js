import Vue from 'vue'
import { db } from '~/plugins/vuefire'
import { firestore } from 'firebase'
import _ from 'lodash'

export default function ({ app, store }) {
  const $db = {

    async updateProfile ({ phoneNumber = '', expertise = '' }, currentClient = {}, currentClientAddress = {}) {
      if (!_.isEmpty(currentClient)) {
        const clientExists = await app.$db.clientExists(currentClient)

        if (!clientExists) {
          const id = await app.$db.createClient(currentClient, currentClientAddress)
          currentClient.id = id
        }
      }

      if (!_.isEmpty(currentClientAddress)) {
        const addressExists = await app.$db.addressExists(currentClient, currentClientAddress)

        if (!addressExists) {
          await app.$db.addAddress(currentClient, currentClientAddress)
        }
      }

      const profileRef = db.collection('users').doc(store.state.profile.uid)
      await profileRef.update({
        phoneNumber,
        expertise,
        currentClient,
        currentClientAddress,
        isComplete: true,
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
    },

    async fetchProfile () {
      const user = store.getters['getUser']

      try {
        const profileRef = await db.collection('users').doc(user.uid).get()

        if (profileRef.exists) {
          store.commit('SET_PROFILE', profileRef.data())
        } else {
          throw new Error('Profile does not exist')
        }
      } catch (err) {
        console.log('Error getting profile: ' + err)
        throw err
      }
    }
  }

  Vue.prototype.$db = $db
  store.$db = $db
  app.$db = $db
}
