var express = require('express');
var router = express.Router();
var csv = require('csvtojson');
var d3 = require('d3');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/meviz';

/* Read all */
router.get('/', function(req, res, next) {    
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Conected correctly to server");
        //get collection and res documents
        var col = db.collection('museums');
        col.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            res.json({status: 200, data: docs}); 
            db.close();            
        });
    });
});

// Read one

router.get('/:id', function(req, res){

});

module.exports = router;
