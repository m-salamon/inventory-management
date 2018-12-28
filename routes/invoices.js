const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
var pagination = require('pagination');

router.get('/invoices', async (req, res) => {
    
    let invoices = await repo.invoices.getInvoices(req.query.search || '', req.query.fromDate || 2000/01/01, req.query.toDate || 2999/01/01,  req.query.page || 1, true)
    let countRows = await repo.invoices.countRows()
    var totalRows = countRows[0]['count(*)']

    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItemsNotSold()

    var paginator = new pagination.SearchPaginator({ prelink: '/invoices', current: invoices.current_page, rowsPerPage: invoices.per_page, totalResult: totalRows }).render()

    var sellpriceTotal = R.sum(R.map(R.prop('sellprice'))(invoices.data))
    var costpriceTotal = R.sum(R.map(R.prop('costprice'))(invoices.data))
    
    res.render('invoices', {
        pageTitle: 'Invoices',
        invoices: invoices.data,
        customers,
        items,
        paginator,
        totalResult: totalRows,
        sellpriceTotal,
        costpriceTotal
    });

});

router.get('/getInvoices', (req, res) => {
    repo.invoices.getInvoices().then(data => {
        res.render('invoices', {
            pageTitle: 'invoices',
            items: data
        });
    });
});

router.get('/getInvoice/:id', async (req, res) => {
    let response = await repo.invoices.getInvoice(req.params.id)
    res.render('invoice', {
        pageTitle: 'invoices',
        invoice: response
    });
});

router.post('/addInvoice', async (req, res) => {
    try {
        let response = await repo.invoices.addInvoice(req.body)
        res.redirect('/invoices');
    } catch (e) {
        console.error('Error: ', e)
    }
});

router.post('/editInvoice', async (req, res) => {
    let response = await repo.invoices.editInvoice(req.body.item)
    res.render('invoices', {
        pageTitle: 'invoices',
        items: data
    });
});

router.post('/deleteInvoice', async (req, res) => {
    try {
        let response = await repo.invoices.deleteInvoice(req.body.id)
        res.redirect('/invoices')
    } catch (e) {
        console.error('Routes Error: ', e)
    }
});

module.exports = router;