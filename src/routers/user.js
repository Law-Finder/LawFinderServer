const router = require('express').Router();
const upload = require('../apps/middlewares/upload');
const UserController = require('../apps/controllers/user');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.update);
router.put('/role/:id', upload.single('avatar'), UserController.updateRole);
router.delete('/:id', UserController.delete);

module.exports = router;