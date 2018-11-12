const express = require('express');
const router = express.Router();
const repo = require('../repo');

router.get('/consigments', async (req, res) => {
    let consigments = await repo.consigments.getConsigments()
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItems()
    res.render('consigments', {
        pageTitle: 'consigments',
        consigments,
        customers,
        items
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

router.post('/getConsigment', (req, res) => {
    repo.consigments.getConsigment(req.body.id).then(data => {
        res.render('consigments', {
            pageTitle: 'consigments',
            items: data
        });
    });
});

router.post('/addConsigment', (req, res) => {
    console.log(req.body)

    repo.consigments.addConsigment(req.body).then(data => {
        res.redirect('/consigments');
    });
});


router.post('/editConsigment', (req, res) => {
    repo.consigments.editConsigment(req.body.item).then(data => {
        res.render('consigments', {
            pageTitle: 'consigments',
            items: data
        });
    });
});

router.post('/deleteConsigment', async (req, res) => {
    try {
        await repo.consigments.deleteConsigment(req.body.id)
        let consigments = await repo.consigments.getConsigments()
        let customers = await repo.customers.getCustomers()
        let items = await repo.items.getItems()
        res.render('consigments', {
            pageTitle: 'consigments',
            consigments,
            customers,
            items
        });
    } catch (e) {
        console.log('Routes Error: ', e)
    }

});

module.exports = router;