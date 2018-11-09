const knex = require('./config');

function getConsigments() {
    let query = knex('reservations').select('*').orderBy('id', 'desc');
    return query;
}

function getConsigment(id) {
    let query = knex('reservations').select('*').where('id', id).orderBy('id', 'desc');
    return query;
}

function addConsigment(data) {
    let query = knex('reservations').insert(data)
    return query;
}

function editConsigment(id, data) {
    let query = knex('reservations').where('id', id).update(data)
    return query;
}

function deleteConsigment(id) {
    let query = knex('reservations').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getConsigments, getConsigment, addConsigment, editConsigment, deleteConsigment };