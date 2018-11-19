const knex = require('./config');

function getItems() {
    let query = knex('items').select('*').orderBy('id', 'desc').where({ inactive: false });
    return query;
}

function getItemsToConsign() {
    let query = knex('items').select('*').orderBy('id', 'desc').where({ inactive: false })
    .whereNotExists(function() {
        this.select('*').from('consigments').whereRaw('items.id = consigments.itemId').whereRaw('consigments.inactive = false')
      })
    return query;
}


  
function getItem(id) {
    let query = knex('items as i').select('i.id', 'i.name', 'i.length', 'i.colorcode','i.serialnumber', 'i.brand', 'i.status', 'r.customerId', '.reservationsId', 'i.stockamount', 'i.inactive', 'r.reserveddate', 'c.name as customer', 'r.id as reservationId')
    .leftJoin('reservations as r', function () {
        this.on('i.id', 'r.itemId').andOn('r.inactive', 0);
      })
    .leftJoin('customers as c', 'c.id', 'r.customerId')
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

module.exports = { getItems, getItem, addItem, editItem, deleteItem, getColors, getLengths, getItemsToConsign };