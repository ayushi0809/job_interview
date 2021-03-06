var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var app     = express();
var path    = require("path");
var db = require('./db');



//rest api to get all the candidates
app.get('/candidates', function (req, res) {
    console.log(req);
    db.query('select * from candidates', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to create a new record into mysql database
app.post('/candidates', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO candidates SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to create a new record into mysql database in table test_score
app.post('/test', function (req, res) {
    var postData  = req.body;
    db.query('INSERT INTO test SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
//rest api to add new column average in existing table test_score
 app.post('/average', function (req,res){
    db.query('alter table test_score add column average1 int as avg(first_round), add column average2 int as avg(second_round), add column average3 int as avg(third_round);', function(error, results, fields){
        if(error) throw error;
        res.end(JSON.stringify(results));
    });
 });

 //rest api to display the average of each round
 app.get('/average' , function(req,res){
 db.query('select average1, average2, average3 from test_score', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
 });
 //rest apit to highest scoring candidate.
 app.get('/highest', function(req,res){
     db.query('select candidates.name , candidates.email where candidates.id = test.score.nid having average = MAX(aveage)', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      });
 });
module.exports = app;