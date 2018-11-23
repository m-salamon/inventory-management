const url = require('url');  

const ITEM_STATUS = {
   available: 'available',
   sold: 'sold',
   consigned: 'consigned',
   reserved: 'reserved',
   returning: 'being returned'
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

module.exports = {ITEM_STATUS, ErrorHandeling}