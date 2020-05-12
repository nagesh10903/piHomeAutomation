var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var lawndevices = require('./../models/devices');
var location = require('./../models/location');
var user = require('./../models/user');

/* GET devices listing. */
router.get('/', function(req, res) { 
  var query={};

 //console.log(req.user);
  if(typeof req.user !== 'undefined' && req.user )query={"user":mongoose.Types.ObjectId(req.user._id)}; 
    user.find(query).populate({path:'locations',populate:{path:'devices'}}).exec(function(err,locdev){
      if(err) throw err;        
      else if(typeof locdev === 'undefined' || !locdev) res.status(401).send('No Record Found'+ locdev);            
      else if(locdev) {
	    	//console.log(locdev);
		res.status(201).send(locdev);  
     		}
    });
});

//GET byID 
router.get('/:userid', function(req, res) { 
  if (!req.params.userid){ res.send("Location _id Not provided"); }
  user.findById(req.params.userid).populate({path:'locations',populate:{path:'devices'}}).exec(function(err,locdev){
      if(err) throw err;        
      else if(typeof locdev === 'undefined' || !locdev) res.status(401).send('No Record Found'+ locdev);            
      else if(locdev) {
	    	//console.log(locdev);
		res.status(201).send(locdev);  
     		}
    });
});

module.exports = router;