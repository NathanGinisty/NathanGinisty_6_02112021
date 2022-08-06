// https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/
// https://expressjs.com/fr/guide/using-middleware.html

const express = require('express')
const router = express.Router()
const max = require("../middleware/limit")

const userController = require('../controllers/user')

router.post('/signup', userController.signup)
router.post('/login', max.limiter, userController.login)

// router.get('/', cameraCtrl.getAllCameras);
// router.get('/:id', cameraCtrl.getOneCamera);
// router.post('/order', cameraCtrl.orderCameras);

module.exports = router;