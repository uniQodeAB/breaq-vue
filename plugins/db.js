import Vue from 'vue'
import { db } from '~/plugins/vuefire'
import { firestore } from 'firebase'
import _ from 'lodash'

export default function ({ app, store }) {
  const $db = {

    async updateProfile ({ phoneNumber = '', expertise = '' }, newClient = {}, currentClientAddress = {}) {
      if (!_.isEmpty(newClient)) {
        const clientExists = await app.$db.clientExists(newClient)

        if (!clientExists) {
          const id = await app.$db.createClient(newClient, currentClientAddress)
          newClient.id = id
        }
      }

      if (!_.isEmpty(currentClientAddress)) {
        const addressExists = await app.$db.addressExists(newClient, currentClientAddress)

        if (!addressExists) {
          await app.$db.addAddress(newClient, currentClientAddress)
        }
      }

      const profileRef = db.collection('users').doc(store.state.profile.uid)

      const currentProfile = await profileRef.get()
      const currentClient = currentProfile.data().currentClient

      await profileRef.update({
        phoneNumber,
        expertise,
        newClient,
        currentClientAddress,
        isComplete: true,
        updatedAt: firestore.FieldValue.serverTimestamp()
      })

      const profile = await profileRef.get()
      await app.$db.updateClient(profile.data(), currentClient, newClient)

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
    },

    async updateClient (profile, currentClient, newClient) {
      if (currentClient.id !== newClient.id) {
        await db.collection('clients')
          .doc(currentClient.id)
          .collection('consultants')
          .doc(profile.uid)
          .delete()
      }

      await db.collection('clients')
        .doc(newClient.id)
        .collection('consultants')
        .doc(profile.uid)
        .set({
          name: profile.name,
          company: profile.company,
          currentClientAddress: profile.currentClientAddress,
          uid: profile.uid
        })
    },

    async fetchClients () {
      const refs = await db.collection('clients').get()

      const clients = []
      refs.docs.forEach(async doc => {
        const addresses = []
        const consultants = []
        const client = doc.data()

        const addressesRefs = await doc.ref.collection('addresses').get()
        addressesRefs.docs.forEach(addressDoc => {
          addresses.push(addressDoc.data())
        })

        const consultantsRefs = await doc.ref.collection('consultants').get()
        consultantsRefs.docs.forEach(consultantDoc => {
          consultants.push(consultantDoc.data())
        })

        clients.push({
          ...client,
          addresses,
          consultants
        })
      })

      return clients
    }
  }

  Vue.prototype.$db = $db
  store.$db = $db
  app.$db = $db
}
