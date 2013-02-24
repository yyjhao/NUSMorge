//node.js's fs to read the file.
//JSON.parse the data component
//JSON.stringify coverts the js data structure into JSON.
var fs = require("fs");

//file name/path: need to get the file into the same directory or change path/name.
//ignores optional encoding parameter
fs.readFile ('./mod_info.json', function (err, data){
	if (err){
		throw err;
	}
	getData(data);
})

//raw content? since no encoding is specified.
//assumes json.parse is recursive. that the entire thing becomes an obj.
function getData(content){
	var jsonDataObj = JSON.parse(content); //object of 4 attributes: correctAsat, departments, cors, examTimes
	var modsObj = jsonDataObj.cors; //object wrapping all the module objects.

	//reduce info. makes each module entry in the giant array into an object.
	//for each of the modules:
		//keep week, day, start, end, type, group number

	for (var key in modsObj){
		var tempMod = {};
		//adds corresponding timeslot object to tempMod[<typeCode><group>][<day>]
			//each timeslot object has 4 attributes: type, frequency, start time and end time.
			//each timeslot is an individual object even if they are grouped/taken together.

		if (modsObj[key].lectures){ //if 'lectures' exists
			var lecs = modsObj[key].lectures; //lectures is an array containing timeslot objects.
			for (var i = 0; i < lecs.length; i++){
				switch (lecs[i].type){
					case "LECTURE":
						if (tempMod["" + 2 + lecs[i].group]){
							tempMod["" + 2 + lecs[i].group].push({
								type: "LECTURE",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						} else {
							tempMod["" + 2 + lecs[i].group] = [];
							tempMod["" + 2 + lecs[i].group].push({
								type: "LECTURE",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						}
					case "PACKAGED LECTURE":
						if (tempMod["" + 3 + lecs[i].group]){
							tempMod["" + 3 + lecs[i].group].push({
								type: "PACKAGED LECTURE",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						} else {
							tempMod["" + 3 + lecs[i].group] = [];
							tempMod["" + 3 + lecs[i].group].push({
								type: "PACKAGED LECTURE",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						}
					case "PACKAGED TUTORIAL":
						if (tempMod["" + 4 + lecs[i].group]){
							tempMod["" + 4 + lecs[i].group].push({
								type: "PACKAGED TUTORIAL",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						} else {
							tempMod["" + 4 + lecs[i].group] = [];
							tempMod["" + 4 + lecs[i].group].push({
								type: "PACKAGED TUTORIAL",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						}
					case "SECTIONAL TEACHING":
						if (tempMod["" + 6 + lecs[i].group]){
							tempMod["" + 6 + lecs[i].group].push({
								type: "SECTIONAL Teaching",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							});
						} else {
							tempMod["" + 6 + lecs[i].group] = [];
							tempMod["" + 6 + lecs[i].group].push({
								type: "SECTIONAL Teaching",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								startTime: lecs[i].start
							})
						}
					case "SEMINAR-STYLE MODULE CLASS":
						if (tempMod["" + 7 + lecs[i].group]){
							tempMod["" + 7 + lecs[i].group].push({
								type: "SEMINAR-STYLE MODULE CLASS",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								start: lecs[i].start
							});
						} else {
							tempMod["" + 7 + lecs[i].group] = [];
							tempMod["" + 7 + lecs[i].group].push({
								type: "SEMINAR-STYLE MODULE CLASS",
								frequency: lecs[i].week,
								endTime: lecs[i].end,
								day: lecs[i].day,
								start: lecs[i].start
							});
						}
				}
			}
		}

		if (modsObj[key].tutorials){ //if 'tutorials' exists
			var tuts = modsObj[key].tutorials;
			for (var i = 0; i<tuts.length; i++){
				switch (tuts[i].type){
					case "DESIGN LECTURE":
						if(tempMod["" + 0 + tuts[i].group]){
							tempMod["" + 0 + tuts[i].group].push({
								type: "DESIGN LECTURE",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + 0 + tuts[i].group] = [];
							tempMod["" + 0 + tuts[i].group].push({
								type: "DESIGN LECTURE",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
					case "LABORATORY":
						if(tempMod["" + 1 + tuts[i].group]){
							tempMod["" + 1 + tuts[i].group].push({
								type: "LABORATORY",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + 1 + tuts[i].group] = [];
							tempMod["" + 1 + tuts[i].group].push({
								type: "LABORATORY",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
					case "TUTORIAL":
						if(tempMod["" + 8 + tuts[i].group]){
							tempMod["" + 8 + tuts[i].group].push({
								type: "TUTORIAL",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + 8 + tuts[i].group] = [];
							tempMod["" + 8 + tuts[i].group].push({
								type: "TUTORIAL",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
					case "TUTORIAL TYPE 2":
						if(tempMod["" + 9 + tuts[i].group]){
							tempMod["" + 9 + tuts[i].group].push({
								type: "TUTORIAL TYPE 2",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + 9 + tuts[i].group] = [];
							tempMod["" + 9 + tuts[i].group].push({
								type: "TUTORIAL TYPE 2",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
					case "TUTORIAL TYPE 3":
						if(tempMod["" + "A" + tuts[i].group]){
							tempMod["" + "A" + tuts[i].group].push({
								type: "TUTORIAL TYPE 3",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + "A" + tuts[i].group] = [];
							tempMod["" + "A" + tuts[i].group].push({
								type: "TUTORIAL TYPE 3",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
					case "RECITATION":
						if(tempMod["" + 5 + tuts[i].group]){
							tempMod["" + 5 + tuts[i].group].push({
								type: "RECITATION",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						} else {
							tempMod["" + 5 + tuts[i].group] = [];
							tempMod["" + 5 + tuts[i].group].push({
								type: "RECITATION",
								frequency: tuts[i].week,
								endTime: tuts[i].end,
								day: tuts[i].day,
								startTime: tuts[i].start
							});
						}
				}
			}
		}

		//merge timeslot objects where possible. eg lectures that come in pairs.
		//keyCode refers to the timeslot code eg <typeCode><groupNumber>
		for (var keyCode in tempMod){
			var tempSlots = {};
			for (var i = 0; i < tempMod[keyCode].length; i++){
				switch (tempMod[keyCode][i].day){
					case "MONDAY":
						if (tempSlots["0"]){
							tempSlots["0"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						} else{
							tempSlots["0"] = [];
							tempSlots["0"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						}
					case "TUESDAY":
						if (tempSlots["1"]){
							tempSlots["1"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						} else{
							tempSlots["1"] = [];
							tempSlots["1"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						}
					case "WEDNESDAY":
						if (tempSlots["2"]){
							tempSlots["2"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						} else{
							tempSlots["2"] = [];
							tempSlots["2"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						}
					case "THURSDAY":
						if (tempSlots["3"]){
							tempSlots["3"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						} else{
							tempSlots["3"] = [];
							tempSlots["3"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						}
					case "FRIDAY":
						if (tempSlots["4"]){
							tempSlots["4"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						} else{
							tempSlots["4"] = [];
							tempSlots["4"].push({
								startTime: tempMod[keyCode][i].startTime,
								endTime: tempMod[keyCode][i].endTime
							})
						}
				}
			}

			//replace timeslot with consolidated version
			tempMod[keyCode] = {
				type: tempMod[keyCode][0].type,
				frequency: tempMod[keyCode][0].frequency,
				slots: tempSlots
			};
		}

		modsObj[key] = tempMod;
	}

	makeJSON(modsObj);
}

function makeJSON(obj){
	fs.writeFile('mods.json', JSON.stringify(obj), function (err){if (err) throw err;});
}
