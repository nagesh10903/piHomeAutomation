// ./models/groupuser.js

var mongoose = require('mongoose');

// define the schema for use groups model
var userGroupSchema = mongoose.Schema({
    name	     : String,
    gid	             : String,
    type	     : String,
   status	     : String

});

// methods ======================

// generating a hash


// create the model for users and expose it to our app

module.exports = mongoose.model('UserGroup', userGroupSchema);

