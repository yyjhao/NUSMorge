var express = require('express');
    morge = require('./routes/morge.js');

var app = express();

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {res.send("hi")});

app.get('/info', morge.findAll);
app.get('/info/:id', morge.find);
app.post('/info/:id', morge.add);
//app.put('/info/:id', morge.update);
//app.delete('/info/:id', morge.delete);

/*
app.post('/info', function(req, res) {
    //randomstring.generate(7);
    db.save(req, res); 
});
*/

app.listen(3000);
