export default function (context) {
  return checkLogin(context)
}

async function checkLogin ({ store, redirect }) {
  // await store.dispatch('auth/checkLogin')

  // if (!store.getters['auth/userLoggedIn']) {
  //   redirect('/login')
  // }
}
