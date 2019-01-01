const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
var pagination = require('pagination');

router.get('/consigments', async (req, res) => {
    let consigments = await repo.consigments.getConsigments(req.query.search || '', req.query.page || 1, req.query.perPage || 10, true)
    let countRows = await repo.consigments.countRows()
    var totalRows = countRows[0]['count(*)']
    
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItems()
    let itemsToConsign = await repo.items.getItemsToConsign()

    var paginator = new pagination.SearchPaginator({ prelink: '/consigments', current: consigments.current_page, rowsPerPage: consigments.per_page, totalResult: consigments.total }).render()

    res.render('consigments', {
        pageTitle: 'Consigments',
        consigments: consigments.data,
        customers: customers,
        items: items,
        itemsToConsign,
        paginator,
        totalResult: consigments.total
    });

});

router.get('/getConsigments', (req, res) => {
    repo.consigments.getConsigments().then(data => {
        res.render('consigments', {
            pageTitle: 'Consigments',
            items: data
        });
    });
});

router.get('/getConsigment/:id', async (req, res) => {
    let response = await repo.consigments.getConsigment(req.params.id)
    res.render('consigment', {
        pageTitle: 'Consigments',
        consigment: response
    });
});

router.post('/addConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.addConsigment(req.body)
        res.redirect('/Consigments');
    } catch (e) {
        console.error('Error: ', e)
    }
});

router.post('/checkConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.checkConsigment(req.body)
        res.json(response)
    } catch (e) {
        console.error('Error: ', e)
    }
});

router.post('/editConsigment', async (req, res) => {
    let response = await repo.consigments.editConsigment(req.body.item)
    res.render('consigments', {
        pageTitle: 'Consigments',
        items: data
    });
});

router.post('/deleteConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.deleteConsigment(req.body.id)
        res.redirect('/consigments')
    } catch (e) {
        console.error('Routes Error: ', e)
    }
});

router.post('/returningConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.returningConsigment(req.body.id)
        res.redirect('/consigments')
    } catch (e) {
        console.error('Routes Error: ', e)
    }
})
router.post('/soldConsigment', async (req, res) => {
    try {
        let response = await repo.consigments.soldConsigment(req.body.id)
        res.redirect('/consigments')
    } catch (e) {
        console.error('Routes Error: ', e)
    }
})


module.exports = router;