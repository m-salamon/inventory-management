const url = require('url');  

const ITEM_STATUS = {
   available: 'available',
   sold: 'sold',
   consigned: 'consigned',
   reserved: 'reserved',
   returning: 'returning'
}


const ErrorHandeling = (path = '/', res, response = '', success = false) => {
   return res.redirect(url.format({
      pathname: path,
      query: {
         response,
          success
      },
  }))
}

const PaginatePerPage = 10;

module.exports = {ITEM_STATUS, ErrorHandeling, PaginatePerPage}