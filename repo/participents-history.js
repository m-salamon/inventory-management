const knex = require('./config');

function getParticipentsHistory(req, res) {
     if(req == undefined){
         //let query = knex.select('id', 'participentId', 'simchaId', 'amount', 'date').from('participents-history');
         let query = knex('participents-history')
        .join('simchas', 'participents-history.simchaId', 'simchas.id')
        .join('participents', 'participents-history.participentId', 'participents.id')
        .select('participents-history.id', 'participents-history.simchaId','simchas.name AS simcha_name',  'participents-history.participentId', 'participents.name AS participent_name', 'participents-history.amount','participents-history.date');
        return query;
    }else{
        let query = knex('participents-history')
        .join('simchas', 'participents-history.simchaId', 'simchas.id')
        .join('participents', 'participents-history.participentId', 'participents.id')
        .select('participents-history.id', 'participents-history.simchaId','simchas.name AS simcha_name',  'participents-history.participentId', 'participents.name AS participent_name', 'participents-history.amount','participents-history.date')
        .where('participents-history.participentId', req);
        return query;
    }
}

module.exports = getParticipentsHistory;