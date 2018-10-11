import createPersistedState from 'vuex-persistedstate'
import { db } from '~/plugins/vuefire'

export const plugins = [createPersistedState()]

export const state = () => ({
  profile: null
})

export const actions = {
  async fetchProfile ({ getters, commit }) {
    const user = getters['auth/getUser']

    try {
      const profileRef = await db.collection('users').doc(user.uid).get()

      if (profileRef.exists) {
        commit('SET_PROFILE', profileRef.data())
      } else {
        throw new Error('Profile does not exist')
      }
    } catch (err) {
      console.log('Error getting profile: ' + err)
      throw err
    }
  }
}

export const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
  }
}
