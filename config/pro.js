// production keys here, import keys from dev.js
// all the keys process.env.***, *** is used in heroku setting(config varibles)
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // facebookClientID: process.env.FACEBOOK_CLIENT_ID,
  // facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  // cookiekey can be randomly a string
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey:process.env.STRIPE_SECRET_KEY,
  sendGridKey:process.env.SEND_GRID_KEY
};

