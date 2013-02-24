var express = require('express');
var app = express();
var db = require('./models/db.js');

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
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
