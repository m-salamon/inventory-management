const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/consigments', async (req, res) => {
    let consigments = await repo.consigments.getConsigments()
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItems()
    let itemsToConsign = await repo.items.getItemsToConsign()
    res.render('consigments', {
        pageTitle: 'consigments',
        consigments,
        customers,
        items,
        itemsToConsign
    });

});

router.get('/getConsigments', (req, res) => {
    repo.consigments.getConsigments().then(data => {
        res.render('consigments', {
            pageTitle: 'consigments',
            items: data
        });
    });
});

router.get('/getConsigment/:id', async (req, res) => {
    let response = await repo.consigments.getConsigment(req.params.id)
    res.render('consigment', {
        pageTitle: 'consigment',
        consigment: response
    });
});

router.post('/addConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.addConsigment(R.merge(req.body, { status: ITEM_STATUS.consigned }))
        res.redirect('/consigments');
    } catch (e) {
        console.log('Error: ', e)
    }
});


router.post('/editConsigment', async (req, res) => {
    let response = await repo.consigments.editConsigment(req.body.item)
    res.render('consigments', {
        pageTitle: 'consigments',
        items: data
    });
});

router.post('/deleteConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.deleteConsigment(req.body.id)
        res.redirect('/consigments')
    } catch (e) {
        console.log('Routes Error: ', e)
    }

});

module.exports = router;