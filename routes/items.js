const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS } = require('./globals')

router.get('/items', async (req, res) => {
    let items = await repo.items.getItems()
    let colors = await repo.items.getColors()
    let lengths = await repo.items.getLengths()
    res.render('items', {
        pageTitle: 'Items',
        items: items,
        colors: colors,
        lengths: lengths
    });

});

router.get('/getItems', (req, res) => {
    repo.items.getItems().then(data => {
        res.render('items', {
            pageTitle: 'Items',
            items: data
        });
    });
});

router.get('/getItem/:id', async (req, res) => {
    let items = await repo.items.getItem(req.params.id)

    var data =  [R.reduce(function (pre, cur) {
        pre.reservedCustomers = [...pre.reservedCustomers, { customerId: cur.customerId, reserveddate: cur.reserveddate, customer: cur.customer, reservationId: cur.reservationId }]
         pre = R.merge(cur, pre)
        return pre
      }, { reservedCustomers: [] }, items)]

    console.log(data)
    res.render('item', {
        pageTitle: 'item',
        item: data
    });
});

router.post('/addItem', async (req, res) => {
    let body = R.merge(req.body, { status: ITEM_STATUS.available, stockamount: 1 })
    let data = await repo.items.addItem(body)
    res.redirect('/items');
});


router.post('/editItem', (req, res) => {
    repo.items.editItem(req.body.item).then(data => {
        res.render('items', {
            pageTitle: 'items',
            items: data
        });
    });
});

router.post('/deleteItem', async (req, res) => {
    await repo.items.deleteItem(req.body.id)
    res.redirect('/items');
});

module.exports = router;