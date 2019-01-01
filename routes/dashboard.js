const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
var pagination = require('pagination');

router.get('/dashboard', async (req, res) => {
    let getCustomersCount = await repo.dashboard.getCustomersCount()
    let getItemsSoldCount = await repo.dashboard.getItemsSoldCount()
    let getRevenueSum = await repo.dashboard.getRevenueSum()
    let getItemsConsignedCount = await repo.dashboard.getItemsConsignedCount()

    let invoices = await repo.dashboard.getInvoices()
    
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        customersCount: R.head(getCustomersCount).customersCount,
        itemsSoldCount: R.head(getItemsSoldCount).itemsSoldCount,
        revenueSum: R.head(getRevenueSum).revenueSum || 0,
        itemsConsignedCount: R.head(getItemsConsignedCount).itemsConsignedCount,
        invoices: invoices
    });

});

module.exports = router;