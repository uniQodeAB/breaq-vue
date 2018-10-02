import createPersistedState from 'vuex-persistedstate'

export const plugins = [createPersistedState()]

export const state = () => ({

})

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    return dispatch('auth/awaitUserReady')
  }
}
