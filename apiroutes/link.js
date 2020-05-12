var express = require('express');
var router = express.Router();
var lawndevices = require('./../models/devices');
var location = require('./../models/location');
var user = require('./../models/user');

/* Link Location Id with User id. */
router.patch('/loc/:locid/:userid', function (req, res) {
    var query = {};
    if (!req.params.locid) {
        { res.send("Location _id Not provided"); }
    }
    if (!req.params.userid) {
        { res.send("User _id Not provided"); }
    }
    if (req.query) { query = req.query; }
    location.find(query, function (err, locs) {
        if (err) throw err;
        //console.log(locs);
        // render the page and pass in any flash data if it exists
        else
            if (locs) {
                user.findById(req.params.userid, function (err, user1) {
                    if (err) throw err;
                    else if (user1) {
                        var found = false;
                        i = 0;
                        //Add the  location to User and save User -- already exists check to be made
                        for (var idval in user1.locations) {
                            test1 = JSON.stringify(user1.locations[i++]);
                            if (test1 === JSON.stringify(locs.id)) {
                                found = true; break
                            }
                        }
                        if (!found) {
                            user1.locations.push(locs.id);
                            user1.save(function (err) {
                                if (err) throw err;
                                res.status(201).send(user1);
                            });
                        }
                        else res.status(201).send(user1);
                    }
                    else { res.status(401).send('User Not Found !'); }
                });
                        
            }
           else { res.status(401).send('Location Not Found !'); }
    });
});


// Link Device Id with location id.
router.patch('/dev/:devid/:locid', function (req, res) {
    
    if (!req.params.locid) {
        { res.send("Location _id Not provided"); }
    }
    if (!req.params.devid) {
        { res.send("Device _id Not provided"); }
    }
    location.findById(req.params.locid, function (err, loca) {
        if (err) throw err;
        else if (loca) {
            lawndevices.findById(req.params.devid, function (err, dev1) {
                if (err) throw err;
                else if (dev1) {
                    var found = false; i = 0;
                    //Add the device to location and save location  -- already exists check to be made
                    for (var idval in loca.devices) {
                        test1 = JSON.stringify(loca.devices[i++]);
                        if (test1 === JSON.stringify(dev1.id)) { found = true; break; }
                    }
                    if (!found) {
                        loca.devices.push(dev1.id);                        
                        loca.save(function (err) {
                            if (err) throw err;
                            res.status(201).send(loca);
                        });
                    }
                    else res.status(201).send(loca);
                }
                else { res.status(401).send('Device Not Found !'); }
            });                  
        }
        else { res.status(401).send('Location Not Found !'); }
    });
});




module.exports = router;
