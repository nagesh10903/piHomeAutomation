var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',isLoggedIn , function(req, res) {
  res.render('./apiviews/index', { title: 'MyIoT Home',user: req.user.name });
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
