const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/items', async (req, res) => {
    let items = await repo.items.getItems(req.query.search || '')
    let colors = await repo.items.getColors()
    let lengths = await repo.items.getLengths()
    res.render('items', {
        pageTitle: 'Items',
        items: items,
        colors: colors,
        lengths: lengths
    });

});

router.get('/getItems', async (req, res) => {
    let items = await repo.items.getItems()
    res.render('items', {
        pageTitle: 'Items',
        items: items
    });
});

router.get('/getItem/:id', async (req, res) => {
    let items = await repo.items.getItem(req.params.id)

    var data = [R.reduce(function (pre, cur) {
        pre.reservedCustomers = [...pre.reservedCustomers, { customerReservationId: cur.customerReservationId, reserveddate: cur.reserveddate, customerReservationName: cur.customerReservationName, reservationId: cur.reservationId }]
        pre = R.merge(cur, pre)
        return pre
    }, { reservedCustomers: [] }, items)]
    
    res.render('item', {
        pageTitle: 'Items',
        item: data
    });
    
    console.log(data)
    
});

router.post('/addItem', async (req, res) => {
    try {
        let response = await repo.items.addItem(R.merge(req.body, { status: ITEM_STATUS.available, stockamount: 1 }))
        ErrorHandeling("/items", res, response, true)
    } catch (e) {
        console.log('Error: ', e)
        ErrorHandeling("/items", res, "", false)
    }
})

router.get('/editItem', async (req, res) => {
    let response = await repo.items.getItem(req.query.id)
    res.json(response)
});

router.post('/updateItem', async (req, res) => {
    
    console.log(req.body)
    try {
        let response = await repo.items.updateItem(req.body.id, req.body)
        ErrorHandeling("/items", res, response, true)
    } catch (e) {
        console.log('Error: ', e)
        ErrorHandeling("/items", res, "", false)
    }
});


router.post('/deleteItem', async (req, res) => {
    try {
        let response = await repo.items.deleteItem(req.body.id)
        res.redirect('/items')
    } catch (e) {
        console.log('Error: ', e)
    }
})

module.exports = router