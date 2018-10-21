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
    }
  }

  Vue.prototype.$db = $db
  store.$db = $db
  app.$db = $db
}
