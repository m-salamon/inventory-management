const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')

router.get('/reservations', async (req, res) => {
  try {
    let reservations = await repo.reservations.getReservations()
    let customers = await repo.customers.getCustomers()
    let items = await repo.items.getItems()

    if (!R.isEmpty(reservations)) {
      var itemsCount = R.compose(
        R.values,
        R.map(i => {
          return { itemId: R.head(i).itemId, count: i.length }
        }),
        R.groupBy(i => i.itemId)
      )(reservations)

      items = R.map(item => {
        var found = R.find(i => {
          return item.id == i.itemId
        })(itemsCount)
        return R.merge(item, found)
      })(items).filter(f => f)
    }

    res.render('reservations', {
      pageTitle: 'reservations',
      reservations,
      customers,
      items
    });

  } catch (e) {
    console.log('Routes Error: ', e)
  }

});

router.get('/getReservations', async (req, res) => {
  try {
    let data = await repo.reservations.getReservations()
    res.render('reservations', {
      pageTitle: 'reservations',
      items: data
    });

  } catch (e) {
    console.log('Routes Error: ', e)
  }
});

router.get('/getReservation/:id', async (req, res) => {
  try {
    let data = await repo.reservations.getReservation(req.params.id)
    res.render('reservation', {
      pageTitle: 'reservation',
      reservation: data
    });

  } catch (e) {
    console.log('Routes Error: ', e)
  }

});

router.post('/addReservation', async (req, res) => {
  try {
    let data = await repo.reservations.addReservation(req.body)
    res.redirect('/reservations');

  } catch (e) {
    console.log('Routes Error: ', e)
  }

});


router.post('/editReservation', async (req, res) => {
  try {
    let data = await repo.reservations.editReservation(req.body.item)
    res.render('reservations', {
      pageTitle: 'reservations',
      items: data
    });

  } catch (e) {
    console.log('Routes Error: ', e)
  }
});

router.post('/deleteReservation', async (req, res) => {
  try {
    await repo.reservations.deleteReservation(req.body.id)
    res.redirect('/reservations');
  } catch (e) {
    console.log('Routes Error: ', e)
  }

});

module.exports = router;