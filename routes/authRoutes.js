//route handlers
const passport = require('passport');//require passport npm module
// export this file as a function
module.exports = (app) => {

  // the page to ask google for files
  app.get(
    '/auth/google', 
    passport.authenticate('google',{
      // scope declare which scope we want to get from 'google'
      // scopes words are not randomly made, it must be alreay in 'google' database with exactly the same keywords
      scope: ['profile', 'email']
    })
  )

  //different with the first handler app.get
  // the page to authenticate user with google
  // when user vist '.../callback', passport will authenticate google users
  app.get('/auth/google/callback', passport.authenticate('google'));

  // '/' refers to the homepage directly at the port
  // the second arg is a function
  // app.get('/', (req, res)=>{
  //   res.send({bye:'there'});
  // });

//router for FACEBOOK
// app.get(
//   '/auth/facebook', 
//   passport.authenticate('facebook', {
//     scope:['profile', 'email']
//   })
// );

// app.get('/auth/facebook/callback', passport.authenticate('facebook'));


//logout router

app.get('/api/logout', (req, res) => {
  //passport attached func, used to logout
  req.logout();
  // res.send will return undefined because no user for now
  res.send(req.user);

})

  // redirect to user after authentication/login
  // req: requested obj(things come in)
  // res: result output
  app.get('/api/current_user',(req, res) => {
    res.send(req.user);
  });
}

