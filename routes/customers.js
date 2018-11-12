const express = require('express');
const router = express.Router();
const repo = require('../repo');

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

router.post('/getCustomer', (req, res) => {
    repo.customers.getCustomer(req.body.id).then(data => {
        res.render('customers', {
            pageTitle: 'customers',
            items: data
        });
    });
});

router.post('/addCustomer', (req, res) => {
    repo.customers.addCustomer(req.body).then(data => {
        res.redirect('/customers');
    });
});


router.post('/editCustomer', (req, res) => {
    repo.customers.editCustomer(req.body.item).then(data => {
        res.render('customers', {
            pageTitle: 'customers',
            items: data
        });
    });
});

router.post('/deleteCustomer', async (req, res) => {
   await repo.customers.deleteCustomer(req.body.id)
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

module.exports = router;