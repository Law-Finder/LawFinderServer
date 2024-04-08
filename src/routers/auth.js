const AuthController = require('../apps/controllers/auth');
const router = require('express').Router();

router.get('/', AuthController.login);

module.exports = router;
