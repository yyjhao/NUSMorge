var fs = require("fs");

//modInfoTT contains correctAsAt, rooms, title, code, exam, lectures, tutorials
var modInfoTT = require("./modstt");

var allMods = {};

(function (){
	var size = modInfoTT.code.length;
	for (var i = 0; i < size; i++){
		//add each module as an empty object to the giant object. keyed by module code
		var modCode = modInfoTT.code[i];
		allMods[modCode] = {};

		//if mod, i, has lecture slots, get lecture slots
		if (modInfoTT.lectures[i]){
			for (var key in modInfoTT.lectures[i]){
				for (var slotName in modInfoTT.lectures[i][key]){
					createMod(modCode, key, slotName, modInfoTT.lectures[i][key][slotName]);
				}
			}
		}

		//if mod, i, has tutorial slots, get tutorial slots
		if (modInfoTT.tutorials[i]){
			for (var key in modInfoTT.tutorials[i]){
				for (var slotName in modInfoTT.tutorials[i][key]){
					createMod(modCode, key, slotName, modInfoTT.tutorials[i][key][slotName]);
				}
			}
		}

	}
	fs.writeFile('mods.json', "var moduleInfo = " + JSON.stringify(allMods), function (err){if (err) throw err;});
})();

function createMod(modCode, typeCode, slotName, slotObj){
	var slotCode = "" + typeCode + slotName;
	var typeC;
	switch(typeCode){
		case "0":
			typeC = "Design Lecture";
			break;
		case "1":
			typeC = "Laboratory";
			break;
		case "2":
			typeC = "Lecture";
			break;
		case "3":
			typeC = "Packaged Lecture";
			break;
		case "4":
			typeC = "Packaged Tutorial";
			break;
		case "5":
			typeC = "Recitation";
			break;
		case "6":
			typeC = "Sectional Teaching";
			break;
		case "7":
			typeC = "Seminar-Style Module Class";
			break;
		case "8":
			typeC = "Tutorial";
			break;
		case "9":
			typeC = "Tutorial Type 2";
			break;
		case "A":
			typeC = "Tutorial Type 3";
			break;
	}

	allMods[modCode][slotCode] = {
		type: typeC,
		slots: getSlots(slotObj)
	};
}

function getSlots (slotObj){
	var tempSlots = [];
	for (var num in slotObj){
		var obj = {};
		var fq = slotObj[num][0];
		switch(fq){
			case 0:
				obj.frequency = "Every Week";
				break;
			case 1:
				obj.frequency = "Odd Weeks";
				break;
			case 2:
				obj.frequency = "Even Weeks";
				break;
			default:
				obj.frequency = fq;
				break;
		}

		obj.start = slotObj[num][2];
		obj.end = slotObj[num][3];
		obj.day = parseInt(slotObj[num][1], 10);

		tempSlots.push(obj);
	}
	return tempSlots;
}