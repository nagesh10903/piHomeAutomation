// models/devices.js
// load the things we need
var mongoose = require('mongoose');

// schema for devices.
var devicesSchema = mongoose.Schema({
      name	     : String,
      did	     : String,
      details	    :{
         ip	     : { type: String, default: 'NA' },
         mac	     : { type: String, default: 'NA' },
         location     : String, 
         position     : String,
         geolocation  : String
	},    
     values	     : {
	 value1	     : { type: String, default: '' },
         value2	     : { type: String, default: '' }, 
     	 value3	     : { type: String, default: '' }
	},
     locations	     :{type:mongoose.Schema.Types.ObjectId,ref:'location'},
     updated_at	     : {type:Date,default: Date.now },
     updatedby	     : String,   
     mode	     : String,
     category        : String,
     type	     : String,
     status	     : {type:String,default:'A'},
     sync	     : {type:String,default:'N'},
     dirty	     : {type:String,default:'Y'}
     
});

// methods ======================

// create the model for users and expose it to our app

module.exports = mongoose.model('lawndevice', devicesSchema);

