const router = require('express').Router();

router.all('/*',(req, res) => res.render('not_found'));

module.exports = router;