const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getItems(data = '', page = 1, perPage = 10, paginate = false) {

    let query = knex('items').select('*')
        .where(function () {
            this.where('status', 'like', `%${data}%`)
                .orWhere('name', 'like', `%${data}%`)
                .orWhere('sellprice', 'like', `%${data}%`)
                .orWhere('costprice', 'like', `%${data}%`)
        }).where({ inactive: false })
        .orderBy('status', 'asc')
        .orderBy('id', 'desc')
        
    if (paginate)
        query = query.paginate(perPage = perPage, page = page, isLengthAware = true)

    return query;
}

function getItemsNotSold(data = '') {
    let query = knex('items').select('*').orderBy('id', 'desc').where(function () {
        this.where('status', 'like', `%${data}%`).orWhere('name', 'like', `%${data}%`)
    }).where({ inactive: false }).whereNot({ status: ITEM_STATUS.sold })
    return query;
}

function getItemsToConsign() {
    let query = knex('items').select('*').orderBy('id', 'desc').where({ inactive: false })
        .whereNotExists(function () {
            this.select('*').from('consigments').whereRaw('items.id = consigments.itemId').whereRaw('consigments.inactive = false')
        }).whereNot({ status: ITEM_STATUS.sold })
    return query;
}



function getItem(id) {
    let query = knex('items as i').select(
        'i.id',
        'i.name',
        'i.length',
        'i.colorcode',
        'i.serialnumber',
        'i.brand',
        'i.status',
        'i.stockamount',
        'i.sellprice',
        'i.costprice',
        'i.inactive',
        'r.reserveddate',
        'r.id as reservationId',
        'c.name as customerReservationName',
        'c.id as customerReservationId',
        'con.id as consigmentId',
        'con.shippeddate',
        'cust.name as customerConsigmentName')
        .leftJoin('reservations as r', function () {
            this.on('r.itemId', 'i.id').andOn('r.inactive', 0);
        })
        .leftJoin('consigments as con', function () {
            this.on('con.itemId', 'i.id').andOn('con.inactive', 0);
        })
        .leftJoin('customers as c', 'c.id', 'r.customerId')
        .leftJoin('customers as cust', 'cust.id', 'con.customerId')
        .where('i.id', id).where({ 'i.inactive': false })
    return query;
}

function getColors() {
    let query = knex('items').select('colorcode').distinct().orderBy('id', 'asc');
    return query;
}
function getLengths() {
    let query = knex('items').select('length').distinct().orderBy('id', 'asc');
    return query;
}

async function addItem(data) {
    var query = await knex('items').insert(data)
    return query;
}

function updateItem(id, data) {
    let query = knex('items').where('id', id).update(data)
    return query;
}

function deleteItem(id) {
    let query = knex('items').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getItems, getItem, addItem, updateItem, deleteItem, getColors, getLengths, getItemsToConsign, getItemsNotSold };