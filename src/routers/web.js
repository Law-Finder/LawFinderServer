const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/role', require('./role'));
router.use('/user', require('./user'));
router.use('/profile', require('./profile'));
router.use('/inactive', require('./account'));
router.use('/lawer', require('./lawer'));

module.exports = router;