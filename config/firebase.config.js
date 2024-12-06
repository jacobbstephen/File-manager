const Firebase = require('firebase-admin');
const  serviceAccount = require('../drive-775c2-firebase-adminsdk-x00v3-a2f550aaf0.json')

const firebase =  Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-775c2.firebasestorage.app'
})

module.exports = Firebase;