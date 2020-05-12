// models/devices.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var deviceSchema = mongoose.Schema({
      name	     : String,
      id	             : String,
      details	    :{
         ip	     : String,
         mac	     : String,
         location	     : String, 
         position 	     : String
	},    
     values	     : {
	 value1	     : String,
         value2	     : String, 
     	 value2	     : String
	},
     updated_at	     : {type:Date,default: Date.now },
     created_at	     : {type:Date,default: Date.now },
     updatedby	     : String,   
     mode	     : String,
     category          : String,
     type		     : String,
     status	     : {type:String,default:'A'},
     sync		     : {type:String,default:'N'},
     dirty	     : {type:String,default:'Y'}
     
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Device', deviceSchema);
