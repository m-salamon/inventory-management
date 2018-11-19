const knex = require('./config');

function getReservations() {
    let query = knex('reservations as r').select('r.id', 'r.itemId', 'r.customerId', 'r.reserveddate', 'i.name AS item', 'c.name AS customer' )
    .leftJoin('items as i', 'i.id', 'r.itemId')
    .leftJoin('customers as c', 'c.id', 'r.customerId')
    .orderBy('r.id', 'desc').where({ 'r.inactive': false });
    return query;
}

function getReservation(id) {
    let query = knex('reservations as r').select('r.id', 'r.itemId', 'r.customerId', 'r.reserveddate', 'i.name AS item', 'c.name AS customer' )
    .leftJoin('items as i', 'i.id', 'r.itemId')
    .leftJoin('customers as c', 'c.id', 'r.customerId')
    .orderBy('r.id', 'desc')
    .where('r.id', id)
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