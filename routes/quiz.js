var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('quiz', { title: 'Quiz' });
});

module.exports = router;
