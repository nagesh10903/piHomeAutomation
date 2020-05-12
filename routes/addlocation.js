var express = require('express');
var router = express.Router();
var devices = require('./../models/location');
var users = require('./../models/user');
var UserType = require('./../models/usertype');
 //var utype = [{'type':'Guest','gid':'GUEST'},{'type':'User','gid':'USER'},{'type':'Admin','gid':'ADMIN'},{'type':'GroupAdmin','gid':'GROUPADMIN'}]; 
/* GET users listing. */
router.get('/', isLoggedIn ,function(req, res) {
      UserType.find({},function(err,utype) {
		if(err) throw err;      
                 //console.log(utype);
		// render the page and pass in any flash data if it exists
  
		res.render('addlocation', { message: req.flash('locationMessage') , title :'AddLocation MyIotLawn', usertype: utype,user : req.user.name });
         });
});


// process the Addlocation form
router.post('/',isLoggedIn,function(req, res) {
             UserType.find({},function(err,utype) {
		if(err) throw err;      
		if(err)res.redirect('/addlocation', { message: req.flash('locationMessage') , title :'AddLocation MyIotLawn', usertype: utype,user : req.user.name });    // redirect to the secure profile section
		res.redirect('/home');
              });
	});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}



module.exports = router;
