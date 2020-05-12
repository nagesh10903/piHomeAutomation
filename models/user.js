// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    name	     : String,
    uid	             : String,
    local            : {
        email        : String,
        password     : String,
    },
   group	     : [{type:mongoose.Schema.Types.ObjectId}],
   locations	     : [{type:mongoose.Schema.Types.ObjectId,ref:'location'}],
     updated_at	     : {type:Date,default: Date.now },
     updatedby	     : String,   
     type	     : String,
     category	     : String,
     status	     : {type:String,default:'A'},
     sync	     : {type:String,default:'N'},
     dirty	     : {type:String,default:'Y'}

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
