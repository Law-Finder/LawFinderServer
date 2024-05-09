const AuthController = require('../apps/controllers/auth');
const UploadMiddleware = require('../apps/middlewares/upload');
const router = require('express').Router();

router.post('/sign', AuthController.login);
router.post('/register', AuthController.register);
router.get('/active', AuthController.active);
router.get('/logout', AuthController.logout);
router.post('/forgot', AuthController.forgot);
router.put('/reset', AuthController.change);
router.post('/lawer/register', UploadMiddleware.single('certificate') , AuthController.lawerRegister);

module.exports = router;
