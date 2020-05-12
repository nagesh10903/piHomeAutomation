// models/lawndevices.js
// load the things we need
var mongoose = require('mongoose');
//var lawndevice=require('./devices');
//var user = require('./user');

// define the schema for our location moldel
var locationSchema = mongoose.Schema({
    name	     : String,
    lid	             : String,
   location          : {
       building       : String,        
       street	      : String,
       location       : String,  
       City	      : String,
       zip	      : String,
       State	      : String,
      geolocation     : String	
	},
     user	     : {type:mongoose.Schema.Types.ObjectId,ref:'User'},
     devices	     : [{type:mongoose.Schema.Types.ObjectId,ref:'lawndevice'}],	
     updated_at	     : {type:Date,default: Date.now },
     updatedby	     : String,   
     type	     : String,
     status	     : {type:String,default:'A'},
     sync	     : {type:String,default:'N'},
     dirty	     : {type:String,default:'Y'}
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('location', locationSchema);
