

const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
const passport = require('passport');
//////////////////
//Users
//////////////////
router.get('/admin', async (req, res) => {

  const isadmin = await repo.admin.isAdmin(req.user.id)
  if (R.head(isadmin).isadmin == false) {
    return
  }

  const users = await repo.admin.getUsers()

  res.render('admin', {
    pageTitle: 'Admin',
    users,
    totalResult: users.length
  });

});

router.post('/verifyUser', async (req, res) => {
  try {
    let response = await repo.admin.verifyUser(req.body.id)
    res.redirect('/admin')
  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

router.post('/deleteUser', async (req, res) => {
  try {
    let response = await repo.admin.deleteUser(req.body.id)
    res.redirect('/admin')
  } catch (e) {
    console.error('Routes Error: ', e)
  }
});

module.exports = router;