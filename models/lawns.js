// models/lawns.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our lawn model
var lawnSchema = mongoose.Schema({
    name	     : String,
    lawnid	     : String,
    lid 	     : String,
    position         : {
        floor        : String,
        area         : String,
        location     :String
    },
    location	     : [{type:mongoose.Schema.Types.ObjectId}],
    updated_at	     : {type:Date,default: Date.now },
    updatedby	     : String,   
    type	     : String,
    status	     : {type:String,default:'A'},
    sync	     : {type:String,default:'N'},
    dirty	     : {type:String,default:'Y'}
});


// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('lawn', lawnSchema);
