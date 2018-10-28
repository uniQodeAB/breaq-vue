const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true })

exports.onUserCreate = functions.auth.user().onCreate(user => {
  const { uid, displayName, photoURL, phoneNumber, email } = user;

  return isValidDomain(email).then(value => {
    if (value && value[0]) {
      console.log(`${email} has a valid domain`)
      return db.collection('users').doc(uid).set({
        name: displayName,
        photoURL,
        uid,
        phoneNumber: phoneNumber,
        email: email
      })
    } else {
      console.log(`${email} has an invalid domain`)
      return false
    }
  }).catch(err => {
    console.log(err)
  })
})

isValidDomain = email => {
  return db.collection('allowed-domain').doc('domain').get().then(doc => {
    const domain = doc.data().value;

    const regex = new RegExp(domain)

    return email.match(regex);
  }).catch(err => {
    console.log(err)
    return false;
  })
}