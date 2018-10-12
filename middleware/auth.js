const isAuthenticated = ({ getters }) => getters['isLoggedIn']
const hasProfile = ({ getters }) => getters['hasProfile']

export default async function ({ store, redirect, route }) {
  if (!isAuthenticated(store) || !hasProfile) {
    redirect('/login')
  }
}
