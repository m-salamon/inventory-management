const express = require('express');
const router = express.Router();

const items = require('../repo/items');
const customers = require('../repo/customers');
const consigments = require('../repo/consigments');
const reservations = require('../repo/reservations');

router.use(function (req, res, next) {
    res.locals.params = {
        query: req.query,
        url: req.originalUrl
    }
    next();
});

router.get('/', (req, res) => {
        res.render('index', {
            pageTitle: 'Home',
            items: data,
    });
});

module.exports = router;