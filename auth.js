const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const knex = require('./repo/config');
const bcrypt = require('bcryptjs');
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
var url = require('url');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true 
}, async (req, email, password, done) => {
  try {
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(password, 10);
    //Replace the plain text password with the hash and then store it
    //Save the information provided by the user to the the database
    const user = await knex('users').insert({ email: email.toLowerCase(), password: hash, firstname: req.body.firstname, lastname: req.body.lastname });

    //Send the user information to the next middleware
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await knex('users').select('*').where('email', email).first();
    if (!user) {
      //If the user isn't found in the database, return a message
      return done(null, false, { message: 'User not found' });
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await isValidPassword(password, user);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    //Send the user information to the next middleware
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));




const options = {};
options.jwtFromRequest = (request) => {
  var token = null;
  var param_name = 'secret_token'
  var parsed_url = url.parse(request.url, true);

  if (request.headers[param_name]) {
    token = request.headers[param_name];
  }
  else if (parsed_url.query && Object.prototype.hasOwnProperty.call(parsed_url.query, param_name)) {
    token = parsed_url.query[param_name];
  }
  return token;
}

options.secretOrKey = process.env.AUTH_SECRET;
passport.use(new JWTstrategy(options, async (token, done) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));


//We'll use this later on to make sure that the user trying to log in has the correct credentials
const isValidPassword = function (password, user) {
  return bcrypt.compare(password, user.password);
}
