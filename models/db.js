var dbUrl = "morge";
var collections = ["timetables"];

// Connect to the db
var db = require('mongojs').connect(dbUrl, collections);

// finds the collection with "id" : morge_id
// then runs callback with the reply
exports.find = function(id, callback) {
    var key = {};
    if (id != null) key.id = id;
    db.timetables.find(key, function(err, col) {
        if (err) throw err;
        callback(col);
    });
};

exports.save = function(timetable, callback) {
    db.timetables.save({
        "id": timetable.id,
        "info" : timetable.info
    },
    function(err, saved) {
        if (err) throw err;
        callback(timetable.id);
    });
};

exports.update = function(timetable, callback) {
    db.timetables.update({
        "id": timetable.id
    }, {
        "info": timetable.info
    }, function(err) {
        if (err) throw err;
        callback();
    });
};
