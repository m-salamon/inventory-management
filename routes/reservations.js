const express = require('express');
const router = express.Router();
const repo = require('../repo');
var R = require('ramda')

router.get('/reservations', async (req, res) => {
   try {
      let reservations = await repo.reservations.getReservations()
      let customers = await repo.customers.getCustomers()
      let items = await repo.items.getItems()


      var itemsCount = R.compose(
         R.values,
         R.map(i => {
            return { itemId: R.head(i).itemId, count: i.length }
         }),
         R.groupBy(i => i.itemId)
      )(reservations)

       items = R.map(item => {
         var found = R.map(itemCount => {
            if (item.id == itemCount.itemId) {
               return R.merge(item, { count: itemCount.count })
            }
         })(itemsCount)
         return R.head(found.filter(f => f))
      })(items).filter(f => f)



      console.log(items)

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

router.post('/getReservation', async (req, res) => {
   try {
      let data = await repo.reservations.getReservation(req.body.id)
      res.render('reservations', {
         pageTitle: 'reservations',
         items: data
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

router.post('/deleteReservations', async (req, res) => {
   try {
      let data = await repo.reservations.deleteReservation(req.body.id)
   } catch (e) {
      console.log('Routes Error: ', e)
   }

});

module.exports = router;