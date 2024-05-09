const router = require('express').Router();
const LawerController = require('../apps/controllers/lawer');

router.get('/', LawerController.getAllLawers);
router.get('/:id', LawerController.getLawerById);
router.put('/:id', LawerController.update);
router.delete('/:id', LawerController.delete);

module.exports = router;