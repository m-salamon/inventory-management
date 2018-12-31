const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getCustomers(data = '', page = 1, perPage = 10, paginate = false) {
    let query = knex('customers').select('*').orderBy('id', 'desc')
    .where(function () {
        this.where('name', 'like', `%${data}%`)
            .orWhere('phone', 'like', `%${data}%`)
            .orWhere('mobile', 'like', `%${data}%`)
            .orWhere('address', 'like', `%${data}%`)
            .orWhere('city', 'like', `%${data}%`)
            .orWhere('state', 'like', `%${data}%`)
            .orWhere('zip', 'like', `%${data}%`)
            .orWhere('country', 'like', `%${data}%`)
    }).where({ inactive: false })
    if (paginate)
        query = query.paginate(perPage = perPage, page = page, isLengthAware = true)

    return query;
}

function getCustomer(id) {
    let query = knex('customers').select('*').where('id', id)
    return query;
}

function getCitys() {
    let query = knex('customers').select('city').distinct().orderBy('id', 'asc').where({ inactive: false });
    return query;
}

function getStates() {
    let query = knex('customers').select('state').distinct().orderBy('id', 'asc').where({ inactive: false });
    return query;
}
function getZips() {
    let query = knex('customers').select('zip').distinct().orderBy('id', 'asc').where({ inactive: false });
    return query;
}

function addCustomer(data) {
    let query = knex('customers').insert(data)
    return query;
}

function updateCustomer(id, data) {
    let query = knex('customers').where('id', id).update(data)
    return query;
}

function deleteCustomer(id) {
    let query = knex('customers').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer, getStates, getCitys, getZips };