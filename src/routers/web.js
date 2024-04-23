const express = require('express');
const router = express.Router();

const AuthRouter = require('./auth');
const RoleRouter = require('./role');


router.use('/auth',AuthRouter);
router.use('/role',RoleRouter);

module.exports = router;