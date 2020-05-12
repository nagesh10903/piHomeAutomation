var express = require('express');
var express_session = require('express-session');
var passport = require('passport');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var lircNode= require('lirc_node');
var labels = require('./lib/labels');
var macros = require('./lib/macros');

var swig = require('swig');
//// Precompile templates
var JST = {
  index: swig.compileFile(__dirname + '/templates/index.swig'),
  appcache: swig.compileFile(__dirname + '/templates/appcache.swig'),
};

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration
//require('./config/models');

var app = express();

// lirc_web configuration
var bootupTime = Date.now();
var config = {};
var labelFor = {};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// required for passport
app.use(express_session({ secret: 'iloveiotlawniot',saveUninitialized: true,resave : true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./apiroutes.js')(app);     // Load routes for restfull API Calls.


//=========IR handle lirc_node, remote initilization and remote api routes================================
//IR Lib

function _init() {
  var home = process.env.HOME;

  lircNode.init();

  // Config file is optional
  try {
    try {
      config = require(__dirname + '/config.json');
    } catch (e) {
      config = require(home + '/.lirc_web_config.json');
    }
  } catch (e) {
    console.log('DEBUG:', e);
    console.log('WARNING: Cannot find config.json!');
  }

  if (config.socket) {
    lircNode.setSocket(config.socket);
  }

  // Refresh the app cache manifest hash
  bootupTime = Date.now();
}

function refineRemotes(myRemotes) {
  var newRemotes = {};
  var newRemoteCommands = null;
  var remote = null;

  function isBlacklistExisting(remoteName) {
    return config.blacklists && config.blacklists[remoteName];
  }

  function getCommandsForRemote(remoteName) {
    var remoteCommands = myRemotes[remoteName];
    var blacklist = null;

    if (isBlacklistExisting(remoteName)) {
      blacklist = config.blacklists[remoteName];

      remoteCommands = remoteCommands.filter(function (command) {
        return blacklist.indexOf(command) < 0;
      });
    }

    return remoteCommands;
  }

  for (remote in myRemotes) {
    newRemoteCommands = getCommandsForRemote(remote);
    newRemotes[remote] = newRemoteCommands;
  }

  return newRemotes;
}

// Based on node environment, initialize connection to lircNode or use test data
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  lircNode.remotes = require(__dirname + '/test/fixtures/remotes.json');
  config = require(__dirname + '/test/fixtures/config.json');
} else {
  _init();
}

// initialize Labels for remotes / commands
labelFor = labels(config.remoteLabels, config.commandLabels);


// Index
app.get('/remote', function (req, res) {
  var refinedRemotes = refineRemotes(lircNode.remotes);
  res.send(JST.index({
    remotes: refinedRemotes,
    macros: config.macros,
    repeaters: config.repeaters,
    labelForRemote: labelFor.remote,
    labelForCommand: labelFor.command,
  }));
});

// application cache manifest
app.get('/app.appcache', function (req, res) {
  res.send(JST.appcache({
   hash: bootupTime,
 }));
});


// Refresh
app.get('/refresh', function (req, res) {
  _init();
  res.redirect('/');
});

// List all remotes in JSON format
app.get('/remotes.json', function (req, res) {
  res.json(refineRemotes(lircNode.remotes));
});

// List all commands for :remote in JSON format
app.get('/remotes/:remote.json', function (req, res) {
  if (lircNode.remotes[req.params.remote]) {
    res.json(refineRemotes(lircNode.remotes)[req.params.remote]);
  } else {
    res.sendStatus(404);
  }
});

// List all macros in JSON format
app.get('/macros.json', function (req, res) {
  res.json(config.macros);
});

// List all commands for :macro in JSON format
app.get('/macros/:macro.json', function (req, res) {
  if (config.macros && config.macros[req.params.macro]) {
    res.json(config.macros[req.params.macro]);
  } else {
    res.sendStatus(404);
  }
});

// Send :remote/:command one time
app.post('/remotes/:remote/:command', function (req, res) {

  lircNode.irsend.send_once(req.params.remote, req.params.command, function () {});
  res.setHeader('Cache-Control', 'no-cache');
  res.sendStatus(200);
});

// Start sending :remote/:command repeatedly
app.post('/remotes/:remote/:command/send_start', function (req, res) {
 console.log(req.params.remote +' -'+req.params.command);
  lircNode.irsend.send_start(req.params.remote, req.params.command, function () {});
  res.setHeader('Cache-Control', 'no-cache');
  res.sendStatus(200);
});

// Stop sending :remote/:command repeatedly
app.post('/remotes/:remote/:command/send_stop', function (req, res) {
  lircNode.irsend.send_stop(req.params.remote, req.params.command, function () {});
  res.setHeader('Cache-Control', 'no-cache');
  res.sendStatus(200);
});

// Execute a macro (a collection of commands to one or more remotes)
app.post('/macros/:macro', function (req, res) {
  // If the macro exists, execute it
  if (config.macros && config.macros[req.params.macro]) {
    macros.exec(config.macros[req.params.macro], lircNode);
    res.setHeader('Cache-Control', 'no-cache');
    res.sendStatus(200);
  } else {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendStatus(404);
  }
});

//================IR Routes End=========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
