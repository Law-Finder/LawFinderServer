const express = require('express');
const router = express.Router();

const AuthRouter = require('./auth');

router.get('/',AuthRouter);

module.exports = router;