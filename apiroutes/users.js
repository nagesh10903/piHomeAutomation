var express = require('express');
var router = express.Router();
var users = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
var query={};
 if(req.query){query=req.query;}
    users.find(query,function(err,user){
        if(err) throw err;        
       res.send(user);   
    });
});


//GET byID 
router.get('/:userid', function(req, res) { 
       var query={};
       if (!req.params.userid){
	  {res.send("user _id Not provided");}
       }
       users.findById(req.params.userid,function(err,user){
        if(err) throw err;        
        else if(user) res.status(201).send(user); 
        else {  res.status(401).send('No Record Found'); }
    });
});

/* POST user listing. */
router.post('/',function(req, res) {
  //save the users
  var user=new users(req.body); 
  user.save(function(err) {
    if (err) throw err;      
     res.status(201).send(user); 
   });
});

/* PUT user listing. */
router.put('/:userid' ,function(req, res) {
var query={};
  if (!req.params.userid){res.send("user _id Not provided");}

 users.findById(req.params.userid,function(err,user){
        if(err) throw err;        
        else if (user){
	    for(var i in req.body){
		user[i]=req.body[i];
	     }
	  user.save(function(err){
	  if(err) throw err; 
	  res.status(201).send(user); 
          	
	});
	} 
	else {  res.status(401).send('No Record Found'); } 	
    });
});

/* patch user listing. */
router.patch('/:userid', function(req, res) {
var query={};
  if (!req.params.userid){res.send("user _id Not provided");}

 users.findById(req.params.userid,function(err,user){
        if(err) throw err;        
        else if (user) {
            if(req.body._id)delete req.body._id;
	    for(var i in user._doc){
		if(req.body[i])user[i]=req.body[i];
	     }
	  user.save(function(err){
	  if(err) throw err; 
	 res.status(201).send(user);           
	});
	} 
     else {  res.status(401).send('No Record Found'); }  		
    });
});

/* DELETE user listing. */
router.delete('/:userid', function(req, res) {

  if (!req.params.userid){res.send("user _id Not provided");}
 users.findById(req.params.userid,function(err,user){
        if(err) throw err;        
        else if(user) {
	  user.remove(function(err){
	  if(err) throw err; 
	   res.status(201).send(user);       
	});
	} 
     else {  res.status(401).send('No Record Found'); }		
    });
});

module.exports = router;
