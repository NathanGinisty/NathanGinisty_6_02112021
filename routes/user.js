// https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/
// https://expressjs.com/fr/guide/using-middleware.html

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/login', userController.login);
router.get('/register', userController.register);

// router.get('/', cameraCtrl.getAllCameras);
// router.get('/:id', cameraCtrl.getOneCamera);
// router.post('/order', cameraCtrl.orderCameras);

module.exports = router;