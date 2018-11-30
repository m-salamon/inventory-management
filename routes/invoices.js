const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/invoices', async (req, res) => {
    let invoices = await repo.invoices.getInvoices(req.query.search || '')
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItems()

    res.render('invoices', {
        pageTitle: 'Invoices',
        invoices,
        customers,
        items
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
        console.log('Error: ', e)
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
        console.log('Routes Error: ', e)
    }
});

module.exports = router;