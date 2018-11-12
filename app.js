const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
app.use(require('./routes/index'));
app.use(require('./routes/items'));
app.use(require('./routes/customers'));
app.use(require('./routes/consigments'));
//app.use(require('./routes/reservations'));



//make the public folder available to all the routes
app.use(express.static('public'));


//app.listen(3000, () => console.log('server is running on port 3000'));
// //heroku stuff
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
