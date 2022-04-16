var express = require('express');
var router = express.Router();
const News = require('../models/news');

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');
        return;
    }

    next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    News.find({}, (err, data) => {
        res.render('admin/index', { title: 'Admin', data });
    });
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} });
});

router.post('/news/add', (req, res) => {
    const body = req.body;
    console.log(body)

    const newsData = new News(body);

    const errors = newsData.validateSync();
    // console.log('Mój błąd', errors)

    newsData.save(err => {
        if (err) {
            res.render('admin/news-form', { title: 'Dodaj news', errors, body });
            return;
        }

        res.redirect('/admin');
    });
});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin');
    });
});

module.exports = router;
