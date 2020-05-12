// models/rooms.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var roomsSchema = mongoose.Schema({
    name	     : String,
    rid	             : String,
    lid 	     : String,
    location            : {
        floor        : String,
        room         : String,
    },
   type		     : String,
   status	     : String

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Rooms', roomsSchema);
