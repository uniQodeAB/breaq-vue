import Vue from 'vue'
import { db } from '~/plugins/vuefire'
import { firestore } from 'firebase'
import _ from 'lodash'

export default function ({ app, store }) {
  const $db = {

    async updateProfile ({ phoneNumber = '', expertise = '' }, newClient = {}, newClientAddress = {}) {
      await app.$db.createClient(newClient, newClientAddress)

      const docSnapshot = db.doc(`users/${store.state.profile.uid}`)

      await docSnapshot.update({
        phoneNumber,
        expertise,
        client: newClient,
        clientAddress: newClientAddress,
        isComplete: true,
        updatedAt: firestore.FieldValue.serverTimestamp()
      })

      const profile = await docSnapshot.get()
      store.commit('SET_PROFILE', profile.data())
    },

    async createClient (client, address) {
      const docSnapshot = await db.doc(`clients/${client.name}`).get()

      if (docSnapshot.exists) {
        await docSnapshot.ref.update({
          updatedAt: firestore.FieldValue.serverTimestamp(),
          name: client.name,
          id: client.name
        })
      } else {
        await docSnapshot.ref.set({
          createdAt: firestore.FieldValue.serverTimestamp(),
          id: client.name,
          name: client.name
        })
      }

      await this.createClientAddress(docSnapshot, address)
    },

    async createClientAddress (clientSnapshot, address) {
      if (_.isEmpty(address)) return

      const docSnapshot = await clientSnapshot.ref.collection('addresses').doc(address.id).get()

      if (docSnapshot.exists) {
        await docSnapshot.ref.update({
          ...address,
          updatedAt: firestore.FieldValue.serverTimestamp()
        })
      } else {
        await docSnapshot.ref.set({
          ...address,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
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
