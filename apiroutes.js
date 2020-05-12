// ./apiroutes.js
var express = require('express');

var usersapi = require('./apiroutes/users');
var devicesapi = require('./apiroutes/devices');
var locationapi = require('./apiroutes/location');
var usergroup = require('./apiroutes/usergroup');
var usertypeapi = require('./apiroutes/usertype');
var userdevices = require('./apiroutes/userdevices');
var locadevices = require('./apiroutes/locadevices');
var links = require('./apiroutes/link');
var delinks = require('./apiroutes/delink');

module.exports = function(app) {

    app.use('/api/usertype', usertypeapi);
    app.use('/api/usergroup', usergroup);
    app.use('/api/users', usersapi);
    app.use('/api/devices', devicesapi);
    app.use('/api/location', locationapi);
    app.use('/api/userdevices', userdevices);
    app.use('/api/locadevices', locadevices);
    app.use('/api/link', links);
    app.use('/api/delink', delinks);
      
};


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
