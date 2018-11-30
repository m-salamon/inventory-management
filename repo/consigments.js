const knex = require('./config');
const R = require('ramda')
const moment = require('moment')



const { ITEM_STATUS, ErrorHandeling } = require('../routes/globals')

function getConsigments(data = '') {
    let query = knex('consigments as con').select('con.id', 'con.itemId', 'con.customerId', 'con.shippeddate', 'i.name AS item', 'c.name AS customer', 'i.status')
        .leftJoin('items as i', 'i.id', 'con.itemId')
        .leftJoin('customers as c', 'c.id', 'con.customerId')
        .orderBy('con.id', 'asc')
        .where(function () {
            this.where('i.name', 'like', `%${data}%`)
                .orWhere('c.name', 'like', `%${data}%`)
                .orWhere('con.shippeddate', 'like', `%${data}%`)
        })
        .where({ 'con.inactive': false })
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
    await knex('items').where('id', data.itemId).update({ status: ITEM_STATUS.consigned, consigmentId: query })
    return query;
}

async function checkConsigment(data) {
    console.log(data)
    let query = await knex('reservations as r').select('r.id', 'c.name AS customerName', 'i.name AS itemName')
        .leftJoin('items as i', 'i.id', 'r.itemId')
        .leftJoin('customers as c', 'c.id', 'r.customerId')
        .where(function () {
            this.where('r.itemId', data.itemId).andWhere('r.customerId', data.customerId)
        })
        .where({ 'r.inactive': false })

    return query;
}

function editConsigment(id, data) {
    let query = knex('consigments').where('id', id).update(data)
    return query;
}

async function deleteConsigment(id) {
    let con = await knex('consigments').select('itemId').where('id', id)
    await knex('items').where('id', R.head(con).itemId).update({ status: ITEM_STATUS.available })
    let query = knex('consigments').where('id', id).update({ inactive: true })
    return query;
}

async function soldConsigment(id) {
    //set consigment to inactive
    let query = await knex('consigments').select('id', 'customerId', 'itemId').where('itemId', id)
                await knex('consigments').where('itemId', id).update({ inactive: true })
                //update item status to sold
                await knex('items').where('id', id).update({ status: ITEM_STATUS.sold })
                //create an invoice
                await knex('invoices').insert({ customerId: R.head(query).customerId, itemId: R.head(query).itemId, solddate: moment().format('YYYY/MM/DD') })
    return query;
}

module.exports = { getConsigments, getConsigment, addConsigment, editConsigment, deleteConsigment, checkConsigment, soldConsigment };