const knex = require('./config');

function getSimchas() {
    let query = knex.select('id', 'name', 'type', 'amount').from('simchas').orderBy('id', 'desc');
    return query;
}


module.exports = getSimchas;