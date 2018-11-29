const knex = require('./config');
const R = require('ramda')
const moment = require('moment')



const { ITEM_STATUS, ErrorHandeling } = require('../routes/globals')

function getInvoices(data = '') {
  let query = knex('invoices as inv').select('inv.id', 'inv.itemId', 'inv.customerId', 'inv.solddate', 'i.name AS item', 'c.name AS customer', 'i.status')
    .leftJoin('items as i', 'i.id', 'inv.itemId')
    .leftJoin('customers as c', 'c.id', 'inv.customerId')
    .where(function () {
      this.where('i.name', 'like', `%${data}%`)
        .orWhere('c.name', 'like', `%${data}%`)
        .orWhere('inv.solddate', 'like', `%${data}%`)
    })
    .where({ 'con.inactive': false })
  return query;
}

function getInvoice(id) {
  let query = knex('invoices as inv').select('inv.id', 'inv.itemId', 'inv.customerId', 'inv.shippeddate', 'i.name AS item', 'c.name AS customer', 'i.status')
    .leftJoin('items as i', 'i.id', 'inv.itemId')
    .leftJoin('customers as c', 'c.id', 'inv.customerId')
    .orderBy('inv.id', 'desc').where('inv.id', id)
  return query;
}

async function addInvoice(data) {
  let query = await knex('invoices').insert(data)
  //update items
  await knex('items').where('id', data.itemId).update({ status: ITEM_STATUS.sold })
  return query;
}

async function editInvoice(id, data) {
  let query = await knex('invoices').where('id', id).update(data)
  return query;
}

async function deleteInvoice(id) {
  let con = await knex('invoices').select('itemId').where('id', id)
  await knex('items').where('id', R.head(con).itemId).update({ status: ITEM_STATUS.available })
  let query = knex('invoices').where('id', id).update({ inactive: true })
  return query;
}


module.exports = { getInvoices, getInvoice, addInvoice, editInvoice, deleteInvoice };