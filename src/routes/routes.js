var express = require('express');
var router = express.Router();

var database = require('../data/database');
var mailAgent = require('../mail/mailAgent');

// GET
router.get('/', function (req, res) {
    database.getPage('en', '/', function (value) {
        if (!value)
            res.redirect('/404');
        else
            res.render('main', {data: value});
    })
});

router.get('/404', function (req, res) {
    database.getPage('en', '/404', function (value) {
        if (!value)
            res.render('error');
        else
            res.render('main', {data: value});
    })
});

router.get('/:page', function (req, res) {
    var page = req.params.page;
    console.log(typeof (page));

    database.getPage('en', '/' + page, function (value) {
        if (value == null)
            res.redirect('/404');
        else
            res.render('main', {data: value});
    })
});

// POST
router.post('/contact', function (req, res) {
    mailAgent.checkMail(req, function (mailOptions) {
        if (mailOptions) {
            mailAgent.sendMail(mailOptions, function (mailState) {
                if (mailState) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
        }
        else
            res.sendStatus(400);
    });
});

module.exports = router;
