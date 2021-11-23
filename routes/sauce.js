const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');

router.get('/', auth, sauceController.getAllSauces);
router.get('/:id', auth, sauceController.getOneSauce);

module.exports = router;