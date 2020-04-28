//routehandler for billing/payment
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// requireLogin: check user status
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req,res) => {
    const charge = await stripe.charges.create({
      amount:500,
      currency:'usd',
      description:'$5 for 5 credits',
      source:req.body.id
    });
    //after finish payment, add credits to user
    req.user.credits += 5;
    //save new data to database
    const user = await req.user.save();
    //response to the request, get communicate with the backend data
    res.send(user);
  });
};