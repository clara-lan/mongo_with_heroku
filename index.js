//use the require keyword to get the node express module
//front end may tend to use import express form 'express'to get es2015/es6 module
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

//use require instead of import
// schema user should before require passpors;
// because we need to set up the model class first then passport would be able to use it
require('./models/User');
require('./services/passport');



mongoose.connect(keys.mongoURI);

//tell express to use cookie-session


// one way to import:
// make the authRoutes const and the app func, then pass app to authRoute as a params. 
// const authRoutes = require('./routes/authRoutes');
// const app = express();
// authRoutes(app);

//another way to import:
// when require the routes, it return a func, then call it with app params immediately
const app = express();
app.use(bodyParser.json());
app.use(
  // cookieSession model
  cookieSession({
    // how long the cookie will exist before expire
    // 30 days 24 hours 60 minutes 60 second 1000 milsecond
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // get cookieKey from keys.js
    keys: [keys.cookieKey]
  })
)

//remind passport to init and handle sessions
app.use(passport.initialize());
app.use(passport.session());


//both routes file return the func called app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


//add configuration for production ver(deployment)
if(process.env.NODE_ENV ==='production'){
  //Express will serve up production assests like main.js or main.css
  // if the app.get request give some unclear routes, express will offer the client/build asset
  //(like 'api/stripe', which is defined in server/routes so that the client server can't know)
  app.use(express.static('client/build'));

  // Express will serve up the index.html
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'
    ));
  })

}

// specify port without deployment
// express listen to traffic at 5000, from node
// app.listen(5000);

//use const PORT when deploy with HEROKU
// process.env.PORT is offered by HEROKU enviroment
// assign process.env.PORT to PORT if HEROKU offers the port otherwise use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);