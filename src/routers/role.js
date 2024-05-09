const RoleController = require('../apps/controllers/role');
const router = require('express').Router();
const AuthMiddleware = require('../apps/middlewares/auth');

router.get('/', RoleController.index);
router.post('/', AuthMiddleware.adminAuthorization, RoleController.create);
router.put('/:id', AuthMiddleware.adminAuthorization, RoleController.update);
router.delete('/:id', AuthMiddleware.adminAuthorization, RoleController.delete);

module.exports = router;