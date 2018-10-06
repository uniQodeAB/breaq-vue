export default function ({ store, redirect, route }) {
  if (route.path !== '/login') {
    if (!store.getters['auth/userLoggedIn']) {
      redirect('/login')
    }
  }
}
