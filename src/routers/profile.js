const router = require('express').Router();
const ProfileController = require('../apps/controllers/profile');
const AuthMiddleware = require('../apps/middlewares/auth');

router.get('', AuthMiddleware.authentication, ProfileController.profile );

module.exports = router;