const express = require('express');
const router = express.Router();
const getParticipents = require('../repo/participents');

router.get('/participents', (req, res) => {
    getParticipents().then(dataParticipents => {
        res.render('participents', {
            pageTitle: 'Participents',
            participents: dataParticipents
        });
    });
});

router.get('/participents/:participentsid', (req, res) => {
    getParticipents().then(dataParticipents => {
        let pageParticipents = [];
        dataParticipents.forEach((element) => {
            if (element.id.toString() === req.params.participentsid) {
                pageParticipents.push(element);
            }
        });
        res.render('participents', {
            pageTitle: 'Participents',
            participents: pageParticipents
        });
    });
});

module.exports = router;


    // //req.params will get the url with the participentsid and output the array element that matches the :participentsid
    // let participent = dataParticipents.participents[req.params.participentsid];

    // res.send(
    //     `<h1>${participent.id}</h1>
    //      </h2>${participent.name}</h2>
    //      <h3>${participent.sum}</h3>
    // `);