import createPersistedState from 'vuex-persistedstate'
import { db } from '~/plugins/vuefire'

export const plugins = [createPersistedState()]

export const state = () => ({
  user: null,
  profile: null
})

export const actions = {
  async fetchProfile ({ getters, commit }) {
    const user = getters['getUser']

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

export const getters = {
  isLoggedIn (state) {
    return !!state.user
  },

  getUser (state) {
    return state.user
  },

  hasProfile (state) {
    return !!state.profile
  }
}

export const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
  },
  SET_USER: (state, user) => {
    state.user = user ? JSON.parse(JSON.stringify(user)) : null
  }
}
