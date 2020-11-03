// use to decide whether we're in dev or pro version
if(process.env.NODE_ENV === 'production'){
  //in production version
  module.exports = require('./pro');
}else{
  //in dev, export dev file to the module
  module.exports = require('./dev');

};    