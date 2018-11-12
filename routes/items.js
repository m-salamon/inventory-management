const express = require('express');
const router = express.Router();
const repo = require('../repo');

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

router.post('/getItem', (req, res) => {
    repo.items.getItem(req.body.id).then(data => {
        res.render('items', {
            pageTitle: 'items',
            items: data
        });
    });
});

router.post('/addItem', (req, res) => {
    console.log('item', req.body)
    repo.items.addItem(req.body).then(data => {
        res.redirect('/items');
    });
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

module.exports = router;