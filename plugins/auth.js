import firebase from 'firebase'

export default function ({store}) {
  firebase.auth().onAuthStateChanged((user) => {
    store.commit('auth/SET_USER', user)
  })
}
