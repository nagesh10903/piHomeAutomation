var express = require('express');
var router = express.Router();
var location = require('./../models/location');

/* GET location listing. */
router.get('/', function (req, res) {
    var query = {};
    if (req.query) { query = req.query; }
    location.find(query, function (err, locs) {
        if (err) throw err;
       // console.log(locs);
        // render the page and pass in any flash data if it exists
        res.send(locs);
    });
});


//GET byID 
router.get('/:locid', function (req, res) {
    
    if (!req.params.locid) {
        { res.send("Location _id Not provided"); }
    }
    location.findById(req.params.locid, function (err, loca) {
        if (err) throw err;
        else if (loca) res.status(201).send(loca);
        else { res.status(401).send('No Record Found'); }
    });
});

/* POST location listing. */
router.post('/', function (req, res) {
    //save the location
    var loca = new location(req.body);
    loca.save(function (err) {
        if (err) throw err;
        res.status(201).send(loca);
    });
});

/* PUT location listing. */
router.put('/:locid' , function (req, res) {
    var query = {};
    if (!req.params.locid) { res.send("location _id Not provided"); }
    
    location.findById(req.params.locid, function (err, loca) {
        if (err) throw err;
        else if (loca) {
            for (var i in req.body) {
                loca[i] = req.body[i];
            }
            loca.save(function (err) {
                if (err) throw err;
                res.status(201).send(loca);
          	
            });
        } 
        else { res.status(401).send('No Record Found'); }
    });
});

/* patch location listing. */
router.patch('/:locid', function (req, res) {
    var query = {};
    if (!req.params.locid) { res.send("user _id Not provided"); }
    
    location.findById(req.params.locid, function (err, loca) {
        if (err) throw err;
        else if (loca) {
            if (req.body._id) delete req.body._id;
            for (var i in req.body) {
                loca[i] = req.body[i];
            }
            loca.save(function (err) {
                if (err) throw err;
                res.status(201).send(loca);
            });
        } 
        else { res.status(401).send('No Record Found'); }
    });
});

/* DELETE Location listing. */
router.delete('/:locid', function (req, res) {
    
    if (!req.params.locid) { res.send("user _id Not provided"); }
    location.findById(req.params.locid, function (err, loca) {
        if (err) throw err;
        else if (loca) {
            loca.remove(function (err) {
                if (err) throw err;
                res.status(201).send(loca);
            });
        } 
        else { res.status(401).send('No Record Found'); }
    });
});



module.exports = router;
