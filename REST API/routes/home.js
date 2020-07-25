const router = require('express').Router();
const controller = require('../controllers/home');
const { auth } = require('../utils');

// router.get('/', auth(), controller.get.home);

module.exports = router;