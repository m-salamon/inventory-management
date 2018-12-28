const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);

function getCustomersCount() {
  let query = knex('customers').count('id as customersCount').where({ inactive: false })
  return query;
}

function getRevenueSum() {
  let query = knex('items').sum('sellprice as revenueSum').where({ inactive: false }).andWhere({ status: ITEM_STATUS.sold })
  return query;
}

function getItemsSoldCount() {
  let query = knex('items').count('id as itemsSoldCount').where({ inactive: false }).andWhere({ status: ITEM_STATUS.sold })
  return query;
}

function getItemsConsignedCount() {
  let query = knex('items').count('id as itemsConsignedCount').where({ inactive: false }).andWhere({ status: ITEM_STATUS.consigned })
  return query;
}



module.exports = {getCustomersCount, getRevenueSum, getItemsSoldCount, getItemsConsignedCount};