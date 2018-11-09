const express = require('express');
const router = express.Router();
const repo = require('../repo');

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
    repo.items.getItem(req.body.item).then(data => {
        res.render('items', {
            pageTitle: 'items',
            items: data
        });
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

router.post('/deleteItem', (req, res) => {
    repo.items.deleteItem(req.body.id).then(data => {
        res.render('items', {
            pageTitle: 'items',
            items: data
        });
    });
});

module.exports = router;