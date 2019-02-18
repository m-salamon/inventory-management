const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getReservations(data = '', page, perPage = 10, paginate = false) {
    let query = knex('reservations as r').select('r.id', 'r.itemId', 'r.customerId', 'r.reserveddate', 'i.name AS item', 'c.name AS customer', 'i.status', 'cust.name as customerConsigmentName')
        .leftJoin('items as i', 'i.id', 'r.itemId')
        .leftJoin('consigments as con', function () {
            this.on('con.itemId', 'i.id').andOn('con.inactive', 0);
        })
        .leftJoin('customers as c', 'c.id', 'r.customerId')
        .leftJoin('customers as cust', 'cust.id', 'con.customerId')
        .where(function () {
            this.where('c.name', 'like', `%${data}%`)
                .orWhere('r.reserveddate', 'like', `%${data}%`)
                .orWhere('i.status', 'like', `%${data}%`)
                .orWhere('i.name', 'like', `%${data}%`)
        })
        .where({ 'r.inactive': false })
        .orderBy('r.id', 'asc')

    if (paginate)
        query = query.paginate(perPage = perPage, page = page, isLengthAware = true)

    return query;
}

function countRows() {
    return knex('reservations').count().where('inactive', false)
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

async function createConsigmentDeleteReservation(id) {
    //get reservation info
    let reservation = await knex('reservations').select('*').where('id', id)
    reservation = R.head(reservation)
    
    //delete old consigment
    await knex('consigments').where('itemId', reservation.itemId).update({ inactive: true })
    
    //create consigment
    await knex('consigments').insert({ customerId: reservation.customerId, itemId: reservation.itemId, shippeddate: moment().format('YYYY/MM/DD') })
    
    //update item
    await knex('items').where('id', reservation.itemId).update({ status: ITEM_STATUS.consigned })
    
    //update reservation
    let query = await knex('reservations').where('id', reservation.id).update({ inactive: true })

    return query;
}
async function returningConsigmentDeleteReservation(id) {
    //get reservation info
    let reservation = await knex('reservations').select('*').where('id', id)
    reservation = R.head(reservation)
    //update item
    let query = await knex('items').where('id', reservation.itemId).update({ status: ITEM_STATUS.returning })

    return query;
}

module.exports = { getReservations, getReservation, addReservation, editReservation, deleteReservation, countRows, returningConsigmentDeleteReservation, createConsigmentDeleteReservation };