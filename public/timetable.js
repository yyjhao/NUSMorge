/*
 * Time table management
 */

var timeTable = function(div){
	var view = {};

	var table = document.createElement("table"),
		tbody = document.createElement("tbody");
	var cells = [];
	var timeHeader = document.createElement("tbody"),
		hr = document.createElement("tr");
	timeHeader.appendChild(hr);
	table.appendChild(timeHeader);
	table.appendChild(tbody);
	for(var i = 0; i < 17; i++){
		var hcell = document.createElement("th");
		hcell.innerHTML = (function getTimeString(hour){
			if(hour < 10)return "0" + hour + "00";
			else if(hour == 24)return "0000";
			else return hour + "00";
		})(i + 8);
		hr.appendChild(hcell);
	}

	for(var i = 0; i < 5; i++){
		cells.push([]);
		var row = document.createElement("tr");
		var dayheader = document.createElement("th");
		dayheader.innerHTML =
			[
				"M<br />O<br />N<br />",
				"T<br />U<br />E<br />",
				"W<br />E<br />D<br />",
				"T<br />H<br />U<br />",
				"F<br />R<br />I<br />"][i];
		row.appendChild(dayheader);
		for(var j = 0; j < 16; j++){
			var cell = document.createElement("td");
			cells[i].push(cell);
			row.appendChild(cell);
			row.style.background="green";	
		}
		tbody.appendChild(row);
	}

	div.appendChild(table);
};