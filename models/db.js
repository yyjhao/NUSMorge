var dbUrl = "morge";
var collections = ["morge_id"];

// Connect to the db
var db = require('mongojs').connect(dbUrl, collections);


exports.save = function(req, res) {
    db.morge_id.save({
            "id": req.params.morge_id,
            "rep" : req.params.rep
            },
        function(err, saved) {
            if( err || !saved ) console.log("morge not saved");
            else console.log("morge saved");
        });
    res.redirect("/");
};

// finds the collection with a
// id : req.params.morge_id
exports.find = function(req, res) {
    db.morge_id.find({"id" : req.params.morge_id},
        function(err, docs) {
            console.log(docs);
            console.log("find");
            res.send(docs);
    });
};
