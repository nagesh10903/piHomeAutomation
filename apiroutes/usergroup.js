var express = require('express');
var router = express.Router();
var usergroup = require('./../models/usergroup');
   
/* GET group listing. */
router.get('/', function(req, res) {
 var query={};
 if (req.query){query=req.query;}
 usergroup.find(query,function(err,usergroup){
        if(err) throw err;        
        else if(usergroup)res.status(200).send(usergroup);   
	else {  res.status(401).send('No Record Found'); }
    });
});

/* GET group listing. */
router.get('/:groupid', function(req, res) {
 if (!req.params.groupid){res.send("Group _id Not provided");}
usergroup.findById(req.params.groupid,function(err,group){
        if(err) throw err;
	else if(group){     
       		res.status(200).send(group);  
		}
	 else {  res.status(401).send('No Record Found'); }	
    });
});


/* POST group listing. */
router.post('/', function(req, res) {
var group=new usergroup(req.body);
group.save(function(err){
	if(err) throw err;
	res.status(201).send(group);
	});
})

/* PUT group  listing. */
router.put('/:groupid', function(req, res) {
 var query={};
 if (req.params.groupid){query._id=req.params.groupid;}
 usergroup.findById(req.params.groupid,function(err,group){
        if(err) throw err;
        else if(group) {	      
            for(var itm in group._doc){	
		//console.log( itm +" b- "+group._doc[itm]+" = "+group[itm]);
		if(itm!=="_id" && itm!=="__v"){
		if(!req.body[itm]) delete group._doc[itm];
		group._doc[itm]=req.body[itm];
		}
		//console.log( itm +" a- "+group._doc[itm]+" = "+group[itm]);
		}
	       group.save(function(err){
	          if(err) throw err;    
       	  	  res.status(201).send(group);   
		  });	
	  }
 else {  res.status(401).send('No Record Found'); }
    });
})

/* PATCH group listing. */
router.patch('/:groupid', function(req, res) {
 var query={};
 if (req.params.groupid){query._id=req.params.groupid;}
 usergroup.findById(req.params.groupid,function(err,group){
        if(err) throw err;
       else if(group) { 
             if(req.body._id) delete req.body._id;	      
            for(var itm in req.body){
		group[itm]=req.body[itm];
		}
	       group.save(function(err){
	          if(err) throw err;    
       	  	  res.status(201).send(group);   
		  });	
	  }
	 else {  res.status(401).send('No Record Found'); }
    });
})

/* DELETE users listing. */
router.delete('/:groupid', function(req, res) {
 var query={};
 if (req.params.groupid){query._id=req.params.groupid;}
usergroup.findById(req.params.groupid,function(err,group){
        if(err) throw err;
        else if(group) { 
	        group.remove(function(err){
	          if(err) throw err;    
       	  	  res.status(201).send(group);   
		  });	
	}
       else {  res.status(401).send('No Record Found'); }
    });
})
// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}


module.exports = router;
