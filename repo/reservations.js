const knex = require('./config');

function getReservations() {
    let query = knex('reservations').select('*').orderBy('id', 'desc');
    return query;
}

function getReservation(id) {
    let query = knex('reservations').select('*').where('id', id).orderBy('id', 'desc');
    return query;
}

function addReservation(data) {
    let query = knex('reservations').insert(data)
    return query;
}

function editReservation(id, data) {
    let query = knex('reservations').where('id', id).update(data)
    return query;
}

function deleteReservation(id) {
    let query = knex('reservations').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getReservations, getReservation, addReservation, editReservation, deleteReservation };