// ./routes.js
var routes = require('./routes/index');
var users = require('./routes/users');
var myhome = require('./routes/myhome');
var devices = require('./routes/devices');
var addlocation = require('./routes/addlocation');
var addlawn = require('./routes/addlawn');
var adddevice = require('./routes/adddevice');
var addcatetype = require('./routes/addcatetype');

var UserType = require('./models/usertype');

// Routes using the api calls, for view/add/modify data in forms/lists
var apidevices = require('./routes/apidevices');
var apilocations = require('./routes/apilocations');
var apiusers = require('./routes/apiusers');

module.exports = function(app, passport) {
    app.use('/home', routes);
    app.use('/users', users);
    app.use('/myhome', myhome);
    app.use('/devices', devices);
    //app.use('/devicelog', devicelog);
    app.use('/adddevice', adddevice);
    app.use('/addlocation', addlocation);
    app.use('/addlawn', addlawn);
    app.use('/apidevices', apidevices);   
    app.use('/apilocations', apilocations); 
    app.use('/apiusers', apiusers);      

    app.get('/', function(req, res) {
	res.render('login2.ejs', { message: req.flash('loginMessage') , title :'MyLogin' }); // load the index.ejs file
    });

    // show the login form
    app.get('/login', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login2.ejs', { message: req.flash('loginMessage') , title :'MyLogin' });
     });

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
	successRedirect : '/home', // redirect to the index
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {
      //  var utype = [{'type':'Guest','gid':'GUEST'},{'type':'User','gid':'USER'},{'type':'Admin','gid':'ADMIN'},{'type':'GroupAdmin','gid':'GROUPADMIN'}];
        UserType.find({},function(err,utype) {
	if(err) throw err;      
         //console.log(utype);
	 // render the page and pass in any flash data if it exists
	res.render('signup.ejs', { message: req.flash('signupMessage') , title :'Signup MyIotLawn', usertype: utype });
       });
    });

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
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
