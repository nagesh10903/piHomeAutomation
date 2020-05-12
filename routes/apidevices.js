var express = require('express');
var router = express.Router();

var http = require('http');

var options = {
    host: '127.0.0.1',
    path: '/api/devices',
  //  port: req.app.settings.port
}

/* GET users listing. */
router.get('/', isLoggedIn , function (req, res) {
    options.port = req.app.settings.port;
   var request = http.request(options, function (resi) {
    var devices = '';
    resi.on('data', function (chunk) {
        devices += chunk;
    });
        resi.on('end', function () {
        //console.log(devices);
       res.render('apiviews/devices', { title: 'My Home Devices',user: req.user.name,devices:devices });
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
