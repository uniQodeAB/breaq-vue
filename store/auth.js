export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, user) => {
    state.user = JSON.parse(JSON.stringify(user))
  }
}

export const getters = {
  userLoggedIn (state) {
    return !!state.user
  },

  getUser (state) {
    return state.user
  }
}
