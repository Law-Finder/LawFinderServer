const router = require('express').Router();
const UserController = require('../apps/controllers/user');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.update);
router.put('/role/:id', UserController.updateRole);
router.delete('/:id', UserController.delete);

module.exports = router;