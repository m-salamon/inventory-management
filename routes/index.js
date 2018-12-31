const express = require('express');
const router = express.Router();

const items = require('./items');
const customers = require('./customers');
const consigments = require('./consigments');
const reservations = require('./reservations');
const invoices = require('./invoices');
const dashboard = require('./dashboard');
const admin = require('./admin');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.use('/items', items);
router.use('/customers', customers);
router.use('/consigments', consigments);
router.use('/reservations', reservations);
router.use('/invoices', invoices);
router.use('/dashboard', dashboard);
router.use('/admin', admin);

module.exports = router;