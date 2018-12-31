const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
var pagination = require('pagination');

router.get('/customers', async (req, res) => {
    let customers = await repo.customers.getCustomers(req.query.search || '', req.query.page || 1, req.query.perPage || 10, true )
    let states = await repo.customers.getStates()
    let citys = await repo.customers.getCitys()
    let zips = await repo.customers.getZips()
    
    var paginator = new pagination.SearchPaginator({ prelink: '/customers', current: customers.current_page, rowsPerPage: customers.per_page, totalResult: customers.total }).render()
    
    res.render('customers', {
        pageTitle: 'Customers',
        customers: customers.data,
        states,
        citys,
        zips,
        paginator,
        totalResult: customers.total
    });

});

router.get('/getCustomer/:id', async (req, res) => {
    let response = await repo.customers.getCustomer(req.params.id)
    res.render('customer', {
        pageTitle: 'Customers',
        customer: response
    });
});

router.post('/addCustomer', async (req, res) => {
    try {
        let response = await repo.customers.addCustomer(req.body)
        ErrorHandeling("/customers", res, response, true)
    } catch (e) {
        console.error('Error: ', e)
        ErrorHandeling("/customers", res, "", false)
    }
});

router.get('/editCustomer', async (req, res) => {
    let response = await repo.customers.getCustomer(req.query.id)
    res.json(response)
});

router.post('/updateCustomer', async (req, res) => {
    try {
        let response = await repo.customers.updateCustomer(req.body.id, req.body)
        ErrorHandeling("/customers", res, response, true)
    } catch (e) {
        console.error('Error: ', e)
        ErrorHandeling("/customers", res, "", false)
    }
});

router.post('/deleteCustomer', async (req, res) => {
    try {
        let response = await repo.customers.deleteCustomer(req.body.id)
        res.redirect('/customers')
    } catch (e) {
        console.error('Error: ', e)
    }
});

module.exports = router;