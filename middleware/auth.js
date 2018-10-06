export default function ({ store, redirect }) {
  if (!store.getters['auth/userLoggedIn']) {
    redirect('/login')
  }
}
