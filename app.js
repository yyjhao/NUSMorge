var express = require('express'),
    morge = require('./routes/morge.js'),
    fs = require('fs');

var app = express();

app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

app.get('/');
app.get('/info', morge.findAll);
app.get('/info/:id', morge.find);
app.post('/info', morge.add);
app.get('/404', function(req, res) {
    res.status(404);
    fs.readFile('./public/404.html', 'utf-8', function (err, data) {
        if (err) throw err;
        res.send(data);    
    });
});
app.get('*', function(req, res) {
    res.redirect('/404');
});
app.put('/info', morge.update);
//app.delete('/info/:id', morge.delete);

app.listen(3000);
