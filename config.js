import firebaseAdmin from 'firebase-admin'
global.Promise = require('bluebird')

const serviceAccount = require('./serviceAccount.json')

export const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://ticketlynx-5a17f.firebaseio.com"

})

export const artistRef = firebase.database().ref('artists')
export const queryRef = firebase.database().ref('queries')