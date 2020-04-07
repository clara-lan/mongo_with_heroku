//create mongoose model class
const mongoose = require('mongoose');
//on eway to import schema 
// const Schema = mongoose.Schema;
//another way to import schema: es6 destructive method
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  facebookID:String,
});


mongoose.model('users', userSchema);