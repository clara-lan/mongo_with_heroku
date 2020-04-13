const passport = require("passport");
// instruct passport to authenticate users with exactly the google-oauth-20
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');

const mongoose = require('mongoose');

const User = mongoose.model('users');

//generate token for user
// done is callback, null needs to check no error
// user.id uses "_id" in mongoDB, it's automatically assigned by mongo
// ensure multiple ways to signin(liknedinID/ googoleID/facebookID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//take the id and cookie to set up the model
passport.deserializeUser((id, done) => {
  // pass id as key to find user
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

//use is for passport to find which oauth to use
passport.use(
  // GoogleStrategy has code including the identifier 'google'
  // which enable passport to call passport.authenticate('google'), line35
  // which uses string 'google' to authenticate google users
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // the route user will be sent to after consent
      // the callbackURL shoulde be set in google api credential, Authorized redirect URIs 
      // to make sure users will only to be redirected to a certain urls 
      // '/auth/***' is a relative path, which will automatically following the default domain
      callbackURL: '/auth/google/callback',
      // ask google strategy to allow proxy like https://heroku.com
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // access token proves the accessibility to user files, it will expire

      // check before registration existing user to prevent duplicate registration
      const existingUser = await User.findOne({ googleID: profile.id })
      // add a promise to waiting for the query check
      if (existingUser) {
        // already have this user, call done func(offered by passport)
        // null signifies no error
        // 2nd params, existingUser 
        return done(null, existingUser);
      } 
        // create record, use profile.id(from json), key is googleID(from the schema)
      const user = await new User({ googleID: profile.id }).save()
        // save user to mongo db

        // use promise to call done after create a new user
        // user: collections
      done(null, user);
    }
  ),
);

//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: keys.facebookClientID,
//         clientSecret: keys.facebookClientSecret,
//         callbackURL: '/auth/facebook/callback/',
//         profileFields: ['id', 'displayName', 'email']
//       },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ facebookID: profile.id })
//         .then((existingUser) => {
//           if (existingUser) {
//             done(null, existingUser);
//           } else {
//             new User({ facebookID: profile.id })
//               .save()
//               .then(user => {
//                 done(null, user);
//               })
//           }
//           console.log(User);
//         }
//      )
//     }
// ));


// promise:
// function fetchSth(){
//  fetch('url')
//    .then(res => res.json)
//    .then(json => console.log(json))
//}
// fetchSth(); // callback

// async version
// async function fetchSth(){
//  const res = await fetch('url')
//  const json = await res.json()
//  console.log(json)
//}
// fetchSth();// callback

// 
// const fetchSth = async() =>{
//  const res = await fetch('url);
//  const json = await res.json();
//  console.log(json);
//}