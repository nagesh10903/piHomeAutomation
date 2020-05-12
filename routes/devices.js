var express = require('express');
var router = express.Router();
var lawndevices = require('./../models/devices');
var users = require('./../models/user');

/* GET users listing. */
router.get('/', isLoggedIn ,function(req, res) {
     users.findById(req.user.id, function(err, user) {
       if (err) throw err;
       lawndevices.find({},function(err,devices){
        if(err) throw err;        
       res.render('devices', { title: 'My Home Devices',user: req.user.name,devices:devices });
      });
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
