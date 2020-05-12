var express = require('express');
var router = express.Router();
var lawndevices = require('./../models/devices');

/* GET devices listing. */
router.get('/', function(req, res) { 
    var query={};
    if (req.query){query=req.query;}
    lawndevices.find(query,function(err,devices){
      if(err) throw err;        
      else if(devices) res.status(201).send(devices); 
      else {  res.status(401).send('No Record Found'); }
    });
});

//GET byID 
router.get('/:devid', function(req, res) { 
       var query={};
       if (!req.params.devid){
	  {res.send("Device _id Not provided");}
       }
       lawndevices.findById(req.params.devid,function(err,devices){
        if(err) throw err;        
        else if(devices) res.status(201).send(devices); 
        else {  res.status(401).send('No Record Found'); }
    });
});

/* POST devices listing. */
router.post('/',function(req, res) {
  //save the lawndevices
  var device=new lawndevices(req.body); 
  device.save(function(err) {
    if (err) throw err;      
     res.status(201).send(device); 
   });
});

/* PUT devices listing. */
router.put('/:devid' ,function(req, res) {
var query={};
  if (!req.params.devid){res.send("Device _id Not provided");}

 lawndevices.findById(req.params.devid,function(err,devices){
        if(err) throw err;        
        else if (devices){
	    for(var i in req.body){
		devices[i]=req.body[i];
	     }
	  devices.save(function(err){
	  if(err) throw err; 
	  res.status(201).send(devices); 
          	
	});
	} 
	else {  res.status(401).send('No Record Found'); } 	
    });
});

/* patch devices listing. */
router.patch('/:devid', function(req, res) {
var query={};
  if (!req.params.devid){res.send("Device _id Not provided");}

 lawndevices.findById(req.params.devid,function(err,devices){
        if(err) throw err;        
        else if (devices) {
            if(req.body._id)delete req.body._id;
	    for(var i in req.body){
		devices[i]=req.body[i];
	     }
	  devices.save(function(err){
	  if(err) throw err; 
	 res.status(201).send(devices);           
	});
	} 
     else {  res.status(401).send('No Record Found'); }  		
    });
});

/* DELETE devices listing. */
router.delete('/:devid', function(req, res) {

  if (!req.params.devid){res.send("Device _id Not provided");}
 lawndevices.findById(req.params.devid,function(err,devices){
        if(err) throw err;        
        else if(devices) {
	  devices.remove(function(err){
	  if(err) throw err; 
	   res.status(201).send(devices);       
	});
	} 
     else {  res.status(401).send('No Record Found'); }		
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