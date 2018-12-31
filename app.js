const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

//make the templating engine available to all routes
app.set('view engine', 'ejs');
// app.set('views', 'app/views') <./ you only need to use views if views is in a diffrent folder>

//gloabal variable to use in all the views
app.locals.siteHeader = 'Inventory Management';
//app.locals.participents = dataParticipents.participents;

//brings in the index.js file it should be available to app 
app.use(express.static("public"));

require('./auth')
app.use(require('./routes/login'));
app.use(require('./routes/index'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/items'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/customers'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/consigments'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/reservations'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/invoices'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/dashboard'));
app.use('/',passport.authenticate('jwt', { session: false }), require('./routes/admin'));


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.redirect('/login');
});

//make the public folder available to all the routes
app.use(express.static('public'));

// //heroku stuff
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
