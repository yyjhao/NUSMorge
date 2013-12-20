var redis = require("redis"),
    client = redis.createClient("/tmp/redis.sock");

client.select(1);

client.on("error", function (err) {
    console.log("Error " + err);
});

// finds the collection with "id" : morge_id
// then runs callback with the reply
exports.find = function(id, success) {
    client.get(id, function(err, info){
        if(err) throw err;
        success({
            id: id,
            info: JSON.parse(info)
        });
    });
};

exports.save = function(timetable, success) {
    client.set(timetable.id, JSON.stringify(timetable.info),
        function(err, saved) {
            if (err) throw err;
            success(timetable.id);
        });
};

exports.update = function(timetable, success) {
    client.set(timetable.id, JSON.stringify(timetable.info),
        function(err) {
            if (err) throw err;
            success();
        });
};
