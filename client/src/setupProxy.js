const proxy = require('http-proxy-middleware');
// no need to inquire this file anywhere
//set up proxy, enable the api to match the port target (here for "Sign in with Google")
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}