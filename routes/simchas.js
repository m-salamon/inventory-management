const express = require('express');
const router = express.Router();
const getSimchas = require('../repo/simchas');

router.get('/simchas', (req, res) => {
    
    getSimchas().then(dataSimchas => {
        res.render('simchas', {
            pageTitle: 'Simchas',
            simchas: dataSimchas
        });
    });

});

router.get('/simchas/:simchasid', (req, res) => {

    let pageSimchas = [];
    getSimchas().then(dataSimchas => {
        dataSimchas.forEach((element) => {
            if (element.id.toString() === req.params.simchasid) {
                pageSimchas.push(element);
            }
        });
        res.render('simchas', {
            pageTitle: 'Simchas',
            simchas: pageSimchas
        });
    });
});

module.exports = router;


    ////req.params will get the url with the simchasid and output the array element that matches the :simchasid
    // let simcha = dataSimchas.simchas[req.params.simchasid];
    // res.send(`
    //      <img src="/images/${simcha.type}.jpeg" style="height: 300px;"/>
    //      <h1>${simcha.id}</h1>
    //      </h2>${simcha.name}</h2>
    //      <h3>${simcha.type}</h3>
    //      <h3>${simcha.amount}</h3>
    // `);