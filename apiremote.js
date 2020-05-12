// ./apiremote.js
var express = require('express');

//var devicesapi = require('./apiroutes/devices');


module.exports = function(lircNode,app) {


    //app.use('/api/devices', devicesapi);
	// Send :remote/:command one time
app.post('/api/remotes/:remote/:command', function (req, res) {

  lircNode.irsend.send_once(req.params.remote, req.params.command, function () {});
  res.setHeader('Cache-Control', 'no-cache');
  res.sendStatus(200);
});

      
};


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
