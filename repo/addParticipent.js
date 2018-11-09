const knex = require('./config');

function addParticipent() {
    let query = knex('participents').insert({ name: name, sum: sum });
    return query;
}

module.exports = addParticipent;