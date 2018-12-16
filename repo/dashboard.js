const knex = require('./config');
const R = require('ramda')
const moment = require('moment')
const { ITEM_STATUS, ErrorHandeling, PaginatePerPage } = require('../routes/globals')
const setupPaginator = require('knex-paginator')(knex);