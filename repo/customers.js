const knex = require('./config');

function getCustomers() {
    let query = knex('customers').select('*').orderBy('id', 'desc').where({ inactive: false });
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

function editCustomer(id, data) {
    let query = knex('customers').where('id', id).update(data)
    return query;
}

function deleteCustomer(id) {
    let query = knex('customers').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getCustomers, getCustomer, addCustomer, editCustomer, deleteCustomer, getStates, getCitys, getZips };