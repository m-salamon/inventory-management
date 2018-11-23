const knex = require('./config');

function getConsigments() {
    let query = knex('consigments as con').select('con.id', 'con.itemId', 'con.customerId', 'con.shippeddate', 'i.name AS item', 'c.name AS customer', 'i.status')
        .leftJoin('items as i', 'i.id', 'con.itemId')
        .leftJoin('customers as c', 'c.id', 'con.customerId')
        .orderBy('con.id', 'desc').where({ 'con.inactive': false })
    return query;
}

function getConsigment(id) {
    let query = knex('consigments as con').select('con.id', 'con.itemId', 'con.customerId', 'con.shippeddate', 'i.name AS item', 'c.name AS customer', 'i.status')
        .leftJoin('items as i', 'i.id', 'con.itemId')
        .leftJoin('customers as c', 'c.id', 'con.customerId')
        .orderBy('con.id', 'desc').where('con.id', id)
    return query;
}

async function addConsigment(data) {
    let query = await knex('consigments').insert(data)
    //update items
    await knex('items').where('id', data.itemId).update({ status: data.status, consigmentId: query})
    return query;
}

function editConsigment(id, data) {
    let query = knex('consigments').where('id', id).update(data)
    return query;
}

function deleteConsigment(id) {
    let query = knex('consigments').where('id', id).update({ inactive: true })
    return query;
}

module.exports = { getConsigments, getConsigment, addConsigment, editConsigment, deleteConsigment };