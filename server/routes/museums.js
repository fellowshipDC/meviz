var express = require('express');
var router = express.Router();
var csv = require('csvtojson');
var d3 = require('d3');

/* GET users listing. */
/* READ ALL */
router.get('/', function(req, res, next) {    
    csv()
    .fromFile('./museo.csv')
    .on('json', (json) => {

    })
    .on('end_parsed',(jsonArrObj)=>{
        res.json(jsonArrObj)
    })
    .on('done', (error) => {
        res.send({status: 500});
    });
});

// Get all entities

router.get('/states', function (req, res){
    var arr = [];
    var reps = {};

    csv({
        includeColumns: [6]

    })
    .fromFile('./museo.csv')
    .on('json', (jObj) => {
        if (arr.indexOf(jObj.nom_ent) < 0){
            arr.push(jObj.nom_ent);
            reps[jObj.nom_ent] = 1
        }
        else if (reps.hasOwnProperty(jObj.nom_ent)){
            reps[jObj.nom_ent] += 1;
        }
    })
    .on('end', () => {
        res.json({status:200, states: arr, statesRepeated: reps});
    })
    .on('error', (error) =>{
        res.send({status: 500});
    })

// Read one

router.get('/:id', function(req, res){
    csv().fromFile('./museo.csv')
    .on('json', (jObj) =>{
        if (jObj.id === req.params.id){
            res.json({status:200, booj: jObj});
        }
    })
    .on('error', (error) =>{
        console.log('error');
        res.send({status:500});
    })
})

});
module.exports = router;
