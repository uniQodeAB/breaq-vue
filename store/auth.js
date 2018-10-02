import firebase from 'firebase'

export const state = () => ({
  user: null,
  userReady: false
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = JSON.parse(JSON.stringify(user))
  },
  USER_READY: (state) => {
    state.userReady = true
  }
}

export const actions = {
  async checkLogin ({ state, commit, dispatch }) {
    await dispatch('awaitUserReady')
  },

  async awaitUserReady ({ state: { userReady }, commit }) {
    if (!userReady) {
      let authReadyPromiseResolver
      const authReadyPromise = new Promise(resolve => {
        authReadyPromiseResolver = resolve
      })

      const unsubscribe = firebase.auth().onAuthStateChanged(() => {
        authReadyPromiseResolver()
        unsubscribe()
        commit('USER_READY')
      })

      return authReadyPromise
    }
  }

  // async logout ({ commit }) {
  //   try {
  //     await this.$api.logout()
  //   } catch (e) {}

  //   // commit('setAccessToken', null)
  //   commit('SET_USER', null)

  //     if(process.browser){
  //       console.log('browser')
  //       window.location.href = 'www.google.com' }
  //   // window.location = '/login' // process.env.loginUrl
  // }
}

export const getters = {
  userLoggedIn (state) {
    return !!state.user
  },

  getUser (state) {
    return state.user
  },

  userCan: state => permissionName => {
    return state.user.permissions.filter(permission => permission.name === permissionName).length
  }
}
