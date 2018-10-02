import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

Vue.use(VueFire)

const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseUrl,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())

export const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
