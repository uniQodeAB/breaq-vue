import createPersistedState from 'vuex-persistedstate'

export const plugins = [createPersistedState()]

export const state = () => ({
  user: null,
  profile: null
})

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
