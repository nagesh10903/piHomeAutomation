var express = require('express');
var router = express.Router();
var location = require('./../models/lawns');
var users = require('./../models/user');
var UserType = require('./../models/usertype');
 var utype = [{'type':'Kitchen','gid':'GUEST'},{'type':'BedRoom','gid':'USER'},{'type':'Living','gid':'ADMIN'},{'type':'Field','gid':'GROUPADMIN'}]; 
/* GET users listing. */
router.get('/', isLoggedIn ,function(req, res) {
      //UserType.find({},function(err,utype) {
		//if(err) throw err;      
                 //console.log(utype);
		// render the page and pass in any flash data if it exists
		res.render('addcatetype', { message: req.flash('addLawnMessage') , title :'AddLocation MyIotLawn',user : req.user.name});
       //   });
});


// process the Addlocation form
	router.post('/',isLoggedIn,function(req, res) {
		if(err)res.redirect('addcatetype', { message: req.flash('addLawnMessage') , title :'AddLocation MyIotLawn',user : req.user.name});  // redirect to the secure profile section
		res.redirect('/home');
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
