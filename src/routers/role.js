const RoleController = require('../apps/controllers/role');
const router = require('express').Router();

router.get('/', RoleController.index);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;