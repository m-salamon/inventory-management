const express = require('express');
const router = express.Router();
const getParticipentsHistory = require('../repo/participents-history');

router.get('/history', (req, res) => {
    getParticipentsHistory().then(dataParticipentsHistory => {
        res.render('participents-history', {
            pageTitle: 'Historys',
            history: dataParticipentsHistory
        });
    });
});

router.get('/history/:historyid', (req, res) => {
    getParticipentsHistory(req.params.historyid, res).then(dataParticipentsHistory => {
        let pageParticipentsHistory = [];
        dataParticipentsHistory.forEach((element) => {
            pageParticipentsHistory.push(element);
        });
        res.render('participents-history', {
            pageTitle: 'History',
            history: pageParticipentsHistory
        });
    });
});

module.exports = router;