const knex = require('./config');

function getParticipents() {
    let query = knex.select('id', 'name', 'sum').from('participents').orderBy('id', 'desc');;
    return query;
}


module.exports = getParticipents;