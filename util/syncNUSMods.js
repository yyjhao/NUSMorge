var request = require('request');
var fs = require("fs");

var eh = {};

request('http://nusmods.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var mod_tt_path = /<script src=["']([^'"<>]*mod_info_tt\.js)["']><\/script>/.exec(body)[1];
        request(response.request.uri.href + mod_tt_path, function(err, res, body){
            if (!error && res.statusCode == 200) {
                fs.writeFileSync("modstt.js", body.split("var modInfoTT=").join("module.exports="));
                require("./rejsonify");
                fs.createReadStream('mods.json').pipe(fs.createWriteStream('../public/js/mods.js'));
            }
        });
    }
});

module.exports = eh;