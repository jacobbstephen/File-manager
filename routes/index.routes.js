const express = require('express')
const router = express.Router();
const upload = require('../config/multer.config')
const fileModel = require('../models/file.models')
const authMiddleWare = require('../middlewares/auth')
const firebase = require('../config/firebase.config')


router.get('/home',authMiddleWare, async (req, res) => {

    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    res.render('home', {
        files: userFiles
    });
})

router.post('/upload', authMiddleWare, upload.single('file'), async (req, res) => {
    const newFile = await fileModel.create({
        path: req.file.path,
        originalname:req.file.originalname,
        user: req.user.userId,

    })
    res.redirect('/home');
})

router.post('/logout', authMiddleWare, (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/login')
})


router.get('/download/:path', authMiddleWare, async (req, res) => {
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path: path
    })
    if(!file){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 1000
    })

    res.redirect(signedUrl[ 0 ])

})


module.exports = router;