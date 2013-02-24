var express = require('express');
var app = express();
var db = require('./models/db.js');

app.get('/', function(req, res) {
    /*
       var morge_id = app.get('morge_id');
       if (morge_id != null) {
       res.send(morge_id);
       } else {
       res.send("Hello World!");
       }
       */
    res.send("Hello World!");
});

app.get('/info/:morge_id', function(req, res) {
    //app.set('morge_id', req.params.morge_id);
    db.find(req, res);
    //res.send(req.params.morge_id);
});

app.post('/info', function(req, res) {
    db.save(req, res); 
});

/*
   app.get('/:id', function(req, res) {
   app.set('morge_id', req.params.id);
   res.redirect('/');
   });
   */

app.listen(3000);
