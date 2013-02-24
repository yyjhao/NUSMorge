// functions to help access database
var db = require('../models/db.js');

// finds the collection with "id" : morge_id
exports.find = function(req, res) {
    var id = req.params.id;
    console.log("finding: " + id);
    db.find(id, function(col) {
        console.log("listing success");
        res.json({
            error: false,
            info: col
        });
    });
}

exports.findAll = function(req, res) {
    console.log("listing all timetables");
    db.find(null, function(col) {
        console.log("listing all success");
        res.json(col);
    });
}

exports.add = function(req, res) {
    var id = (new Date()).getTime().toString(36);
    var info = req.body.info;

    console.log(info['a_hdkk0h5d'].info[0])

    db.find(id, function(col) {
        timetable = {"id": id, "info": info};
        db.save(timetable, function(id) {
            console.log("adding success");
            res.json({"id": id, "error": false});
        });
    });

};

exports.update = function(req, res) {
    var id = req.body.id;
    var info = req.body.info;

    db.update({id: id, info: info}, function(id) {
        console.log("adding success");
        res.json({"error": false});
    });
};
