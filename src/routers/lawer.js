const router = require('express').Router();
const upload = require('../apps/middlewares/upload');
const LawerController = require('../apps/controllers/lawer');

router.get('/', LawerController.getAllLawers);
router.get('/:id', LawerController.getLawerById);
router.put('/:id', upload.single('avatar'), LawerController.update);
router.delete('/:id', LawerController.delete);

module.exports = router;