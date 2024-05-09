const router = require('express').Router();
const AccountController = require('../apps/controllers/account');

router.get('/user', AccountController.getInactiveUsers);
router.get('/lawer', AccountController.getInactiveLawers);
router.put('/change/:id' , AccountController.changeActive);

module.exports = router;