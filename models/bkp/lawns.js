// models/lawns.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var lawnSchema = mongoose.Schema({
    name	     : String,
    lid	             : String,
   location          : {
       building       : String,
       location       : String, 
       street	      : String,  
       address	      : String	
	},
   type		     : String,
   group	     : String,
   status	     : String

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Lawn', lawnSchema);
