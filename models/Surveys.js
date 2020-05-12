//create survey collection and schema in mongoDB
const mongoose = require('mongoose');
const { Schema } = mongoose;
// import recipient to surveys then no need to import recipient to index.js again
const RecipientSchema = require('./Recipient');

// create schema based on mongoose
// recipients will pass in an array
const surveySchema = new Schema({
  title:String,
  body:String,
  subject:String,
  // smilar to foreign key in sql, recipiecnt will be the array of recipientschema
  recipients:[RecipientSchema],
  yes:{ type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // _user will have id assigned by schema, reference from the User collections
  // indicates which user this survey belongs to
  _user:{ type:Schema.Types.ObjectId, ref:'User' },
  //timestamp
  dateSent: Date,
  lastResponeded:Date
});

mongoose.model('surveys', surveySchema);