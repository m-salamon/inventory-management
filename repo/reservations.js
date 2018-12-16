const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getReservations(data = '', page, paginate = false) {
    let query = knex('reservations as r').select('r.id', 'r.itemId', 'r.customerId', 'r.reserveddate', 'i.name AS item', 'c.name AS customer', 'i.status')
        .leftJoin('items as i', 'i.id', 'r.itemId')
        .leftJoin('customers as c', 'c.id', 'r.customerId')
        .where(function () {
            this.where('c.name', 'like', `%${data}%`)
                .orWhere('r.reserveddate', 'like', `%${data}%`)
                // .orWhere('i.status', 'like', `%${data}%`)
                //.orWhere('i.name', 'like', `%${data}%`)
        })
        .where({ 'r.inactive': false })
        .orderBy('r.id', 'asc');
        
    if (paginate)
        query = query.paginate(perPage = PaginatePerPage, page = page, isLengthAware = true)

    return query;
}

function getReservation(id) {
    let query = knex('reservations as r').select('r.id', 'r.itemId', 'r.customerId', 'r.reserveddate', 'i.name AS item', 'c.name AS customer')
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