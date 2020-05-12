var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our menu model
var menuSchema = mongoose.Schema({
    item	     : String,
    link             : String,
    describe	     : String,
    level	     : {type:Integer,default:1},
    subitems	     : [{type:mongoose.Schema.Types.ObjectId,ref:menu}]   
});

// create the model for users and expose it to our app
module.exports = mongoose.model('menu', menuSchema);
