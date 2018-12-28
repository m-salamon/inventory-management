const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getInvoices(data = '', fromDate, toDate, page, paginate = false) {
  let query = knex('invoices as inv').select('inv.id', 'inv.itemId', 'inv.customerId', 'inv.solddate', 'i.name AS item', 'c.name AS customer', 'i.status', 'i.sellprice', 'i.costprice')
    .leftJoin('items as i', 'i.id', 'inv.itemId')
    .leftJoin('customers as c', 'c.id', 'inv.customerId')
    .where(function () {
      this.where('c.name', 'like', `%${data}%`)
        .orWhere('inv.solddate', 'like', `%${data}%`)
        .orWhere('i.name', 'like', `%${data}%`)
    })
    .orderBy('inv.id', 'desc')
    .where({ 'inv.inactive': false })
    .whereBetween('inv.solddate', [fromDate, toDate])

  if (paginate)
    query = query.paginate(perPage = PaginatePerPage, page = page, isLengthAware = false)

  return query;
}


function countRows() {
  return knex('invoices').count().where('inactive', false)
}

function getInvoice(id) {
  let query = knex('invoices as inv').select('inv.id', 'inv.itemId', 'inv.customerId', 'inv.solddate', 'i.name AS item', 'c.name AS customer', 'i.status')
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


module.exports = { getInvoices, getInvoice, addInvoice, editInvoice, deleteInvoice, countRows };