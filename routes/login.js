const express = require('express');
const router = express.Router();
const repo = require('../repo');
const R = require('ramda')
const { ITEM_STATUS, ErrorHandeling } = require('./globals')
const knex = require('../repo/config');

const passport = require('passport');
const jwt = require('jsonwebtoken');


router.get('/login', async (req, res) => {
  res.render('login', {
    pageTitle: 'Login'
  });
});

router.get('/signup', async (req, res) => {
  res.render('signup', {
    pageTitle: 'signup'
  });
});


//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
    message: 'Signup successful',
    user: req.body.firstname,
    success: true
  });

});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user || user.verify != 1 || user.inactive == 1) {
        return next('An Error occured');
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { id: user.id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, process.env.AUTH_SECRET);
        //Send back the token to the user
        res.json({ success: true, token: token, firstname: user.firstname });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


module.exports = router;