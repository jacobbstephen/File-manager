const multer = require('multer')
const  firebaseStorage  = require('multer-firebase-storage')
const firebase = require('./firebase.config')
const  serviceAccount = require('../drive-775c2-firebase-adminsdk-x00v3-a2f550aaf0.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-775c2.firebasestorage.app',
    unique: true,
})

const upload = multer({
    storage: storage,
})

module.exports = upload;
