var express = require('express');
var router = express.Router();

var http = require('http');

var options = {
    host: 'localhost',
    path: '/api/location'
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
       res.render('apiviews/locations', { title: 'My Home Devices',user: req.user.name,locations:devices });
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
});

/* Add location form. */
router.get('/add', isLoggedIn ,function(req, res) {   
 res.render('apiviews/addlocation', { title: 'My Home Devices',messag:'Warnbing:Add locations',user: req.user.name });
});

/* POST location listing. */
router.post('/add', isLoggedIn ,function(req, res) {

options.mode="POST";
    options.port = req.app.settings.port;
//Set up the request
var post_req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
    console.log('Response: ' + chunk);
    });
});
var loc={name:req.body.name,type:req.body.type,
	location:{location:req.body.location,building:req.body.building,street:req.body.street,City:req.body.city,
		  ZIP:req.body.zip,state:req.body.state}};
//post the data
console.log('posting: ' + JSON.stringify(req.body));
console.log('posting2: ' + JSON.stringify(loc));
post_req.write(JSON.stringify(loc));
post_req.end();
});

/* POST users listing. */
router.post('/', function(req, res) {

options.mode="POST";
//Set up the request
  var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

//post the data
console.log('posting: ' + JSON.stringify(req.body));
post_req.write(JSON.stringify(req.body.data));
post_req.end();
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
