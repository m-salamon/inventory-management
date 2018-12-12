const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/dashboard', async (req, res) => {
    let invoices = await repo.invoices.getInvoices(req.query.search || '')
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItemsNotSold()

    res.render('dashboard', {
        pageTitle: 'Dashboard',
        invoices,
        customers,
        items
    });

});

module.exports = router;