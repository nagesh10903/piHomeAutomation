// models/usertype.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userTypeSchema = mongoose.Schema({
    type 	     : String,
    tid	             : String,
   status	     : String
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('UserType', userTypeSchema);
