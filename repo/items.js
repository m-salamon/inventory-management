const knex = require('./config');

function getItems() {
    let query = knex('items').select('*').orderBy('id', 'desc');
    return query;
}

function getItem(id) {
    let query = knex('items').select('*').where('id', id).orderBy('id', 'desc');
    return query;
}

function addItem(data) {
    let query = knex('items').insert(data)
    return query;
}

function editItem(id, data) {
    let query = knex('items').where('id', id).update(data)
    return query;
}

function deleteItem(id) {
    let query = knex('items').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getItems, getItem, addItem, editItem, deleteItem };