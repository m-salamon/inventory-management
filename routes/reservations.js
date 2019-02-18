const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
var pagination = require('pagination');

router.get('/reservations', async (req, res) => {
  try {
    let reservations = await repo.reservations.getReservations(req.query.search || '', req.query.page || 1, req.query.perPage || 10, true)
    let countRows = await repo.reservations.countRows()
    var totalRows = countRows[0]['count(*)']
    
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItemsNotSold()

    if (!R.isEmpty(reservations.data)) {
      var itemsCount = R.compose(
        R.values,
        R.map(i => {
          return { itemId: R.head(i).itemId, count: i.length }
        }),
        R.groupBy(i => i.itemId)
      )(reservations.data)

      items = R.map(item => {
        var found = R.find(i => {
          return item.id == i.itemId
        })(itemsCount)
        return R.merge(item, found)
      })(items).filter(f => f)
    }

    
    var paginator = new pagination.SearchPaginator({ prelink: '/reservations', current: reservations.current_page, rowsPerPage: reservations.per_page, totalResult: reservations.total }).render()

    console.log(reservations)
    res.render('reservations', {
      pageTitle: 'Reservations',
      reservations: reservations.data,
      customers,
      items,
      paginator,
      totalResult: reservations.total
    });

  } catch (e) {
    console.error('Routes Error: ', e)
  }

});

router.get('/getReservations', async (req, res) => {
  try {
    let reservations = await repo.reservations.getReservations(req.query.search || '')
    res.json(reservations)

  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

router.get('/getReservation/:id', async (req, res) => {
  try {
    let data = await repo.reservations.getReservation(req.params.id)
    res.render('reservation', {
      pageTitle: 'Reservations',
      reservation: data
    });

  } catch (e) {
    console.error('Routes Error: ', e)
  }

});

router.post('/addReservation', async (req, res) => {
  try {
    let data = await repo.reservations.addReservation(req.body)
    res.redirect('/reservations');

  } catch (e) {
    console.error('Routes Error: ', e)
  }

});


router.post('/editReservation', async (req, res) => {
  try {
    let data = await repo.reservations.editReservation(req.body.item)
    res.render('reservations', {
      pageTitle: 'Reservations',
      items: data
    });

  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

router.post('/deleteReservation', async (req, res) => {
  try {
    await repo.reservations.deleteReservation(req.body.id)
    res.redirect('/reservations');
  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

router.post('/createConsigmentDeleteReservation', async (req, res) => {
  try {
    console.log(req.body.id)
    await repo.reservations.createConsigmentDeleteReservation(req.body.id)
    res.redirect('/reservations');
  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

router.post('/returningConsigmentDeleteReservation', async (req, res) => {
  try {
    console.log(req.body.id)
    await repo.reservations.returningConsigmentDeleteReservation(req.body.id)
    res.redirect('/reservations');
  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

module.exports = router;