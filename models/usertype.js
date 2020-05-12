// ./models/lawnuser.js

var mongoose = require('mongoose');

// define the schema for our usertypes model
var userTypeSchema = mongoose.Schema({
    type 	     : String,
    tid	             : String,
   status	     : String
});

// methods ======================

// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('UserType', userTypeSchema);
