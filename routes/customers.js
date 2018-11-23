const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/customers', async (req, res) => {
    let customers = await repo.customers.getCustomers()
    let states = await repo.customers.getStates()
    let citys = await repo.customers.getCitys()
    let zips = await repo.customers.getZips()
    res.render('customers', {
        pageTitle: 'customers',
        customers,
        states,
        citys,
        zips
    });

});

router.get('/getCustomer/:id', async (req, res) => {
    let response = await repo.customers.getCustomer(req.params.id)
    res.render('customer', {
        pageTitle: 'customer',
        customer: response
    });
});

router.post('/addCustomer', async (req, res) => {
    try {
        let response = await repo.customers.addCustomer(req.body)
        ErrorHandeling("/customers", res, response, true)
    } catch (e) {
        console.log('Error: ', e)
        ErrorHandeling("/customers", res, "", false)
    }
});


router.post('/editCustomer', async (req, res) => {
    try {
        let response = await repo.customers.editCustomer(req.body.item)
        res.render('customers', {
            pageTitle: 'customers',
            items: response
        });
    } catch (e) {
        console.log('Error: ', e)
    }
});

router.post('/deleteCustomer', async (req, res) => {
    try {
        let response = await repo.customers.deleteCustomer(req.body.id)
        res.redirect('/customers')
    } catch (e) {
        console.log('Error: ', e)
    }
});

module.exports = router;