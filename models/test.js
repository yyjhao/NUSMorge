var http = require('http')
    , MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var url = format("mongodb://%s:%s@%s:%s/%s"
    , process.env.OPENSHIFT_MONGODB_DB_USERNAME
    , process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    , process.env.OPENSHIFT_MONGODB_DB_HOST
    , parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT)
    , process.env.OPENSHIFT_APP_NAME)

MongoClient.connect(url, function(err, db) {
  if(err) throw err;

  console.log("connected");

  var collection = db.collection('test');
  var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

  collection.insert(docs, {w:1}, function(err, result) {
    collection.find().toArray(function(err, items) {});

      var stream = collection.find({mykey:{$ne:2}}).stream();

      stream.on("data", function(item) {
          console.log("MongoDB Item: ");
          console.log(item);
      });

      stream.on("end", function() {});

      collection.findOne({mykey:1}, function(err, item) {});
  });  
})



//test apis here
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('See console for output\n');
}).listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
