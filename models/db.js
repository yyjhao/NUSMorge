var dbUrl = "morge";
var collections = ["timetables"];

// Connect to the db
var db = require('mongojs').connect(dbUrl, collections);

// finds the collection with "id" : morge_id
// then runs callback with the reply
exports.find = function(id, success) {
    var key = {};
    if (id != null) key.id = id;
    db.timetables.findOne(key, function(err, col) {
        if (err) throw err;
        success(col);
    });
};

exports.save = function(timetable, success) {
    db.timetables.save({
        "id": timetable.id,
        "info" : timetable.info
    },
    function(err, saved) {
        if (err) throw err;
        success(timetable.id);
    });
};

exports.update = function(timetable, success) {
    db.timetables.update({
        "id": timetable.id
    }, {
        $set: { "info": timetable.info }
    }, function(err) {
        if (err) throw err;
        success();
    });
};
