var express = require('express');
var router = express.Router();
var usertype = require('./../models/usertype');
/* GET usertype listing. */
router.get('/', isLoggedIn ,function(req, res) {
 var query={};
 if(req.query){query=req.query;}
    usertype.find(query,function(err,type){
        if(err) throw err;        
       res.send(type);   
    });
});

//GET byID 
router.get('/:utypeid', function(req, res) { 
      
       if (!req.params.utypeid){
	  {res.send("user _id Not provided");}
       }
       usertype.findById(req.params.utypeid,function(err,type){
        if(err) throw err;        
        else if(type) res.status(201).send(type); 
        else {  res.status(401).send('No Record Found'); }
    });
});

/* POST user listing. */
router.post('/',function(req, res) {
  //save the usertype
  var type=new usertype(req.body); 
  type.save(function(err) {
    if (err) throw err;      
     res.status(201).send(type); 
   });
});

/* PUT user listing. */
router.put('/:utypeid' ,function(req, res) {
var query={};
  if (!req.params.utypeid){res.send("type _id Not provided");}

 usertype.findById(req.params.utypeid,function(err,type){
        if(err) throw err;        
        else if (type){
	    for(var i in req.body){
		type[i]=req.body[i];
	     }
	  type.save(function(err){
	  if(err) throw err; 
	  res.status(201).send(type); 
          	
	});
	} 
	else {  res.status(401).send('No Record Found'); } 	
    });
});

/* patch user listing. */
router.patch('/:utypeid', function(req, res) {
var query={};
  if (!req.params.utypeid){res.send("user _id Not provided");}

 usertype.findById(req.params.utypeid,function(err,type){
        if(err) throw err;        
        else if (type) {
            if(req.body._id)delete req.body._id;
	    for(var i in req.body){
		type[i]=req.body[i];
	     }
	  type.save(function(err){
	  if(err) throw err; 
	 res.status(201).send(type);           
	});
	} 
     else {  res.status(401).send('No Record Found'); }  		
    });
});

/* DELETE user listing. */
router.delete('/:utypeid', function(req, res) {

  if (!req.params.utypeid){res.send("user _id Not provided");}
 usertype.findById(req.params.utypeid,function(err,type){
        if(err) throw err;        
        else if(type) {
	  type.remove(function(err){
	  if(err) throw err; 
	   res.status(201).send(type);       
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
