const getLocalStorageData = () => JSON.parse(window.localStorage.getItem('vuex') || '{}')

export default function ({ store }) {
  const { user, profile } = getLocalStorageData()

  if (user && profile) {
    store.commit('SET_USER', user)
    store.commit('SET_PROFILE', profile)
  } else {
    store.commit('SET_USER', null)
    store.commit('SET_PROFILE', null)
  }
}
