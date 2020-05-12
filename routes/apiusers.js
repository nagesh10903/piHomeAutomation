var express = require('express');
var router = express.Router();

var http = require('http');

var options = {
    host: 'localhost',
    path: '/api/users'
}

/* GET users listing. */
router.get('/', isLoggedIn , function (req, res) {
    options.port = req.app.settings.port;
    var request = http.request(options, function (resi) {
    var users = '';
    resi.on('data', function (chunk) {
        users += chunk;
    });
    resi.on('end', function () {
       res.render('apiviews/users', { title: 'My Home Users',user: req.user.name,users:users });
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
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
