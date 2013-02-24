/*
 * Time table management
 */

var timeTable = function(div){
	var view = {};

	// public APIs
	view.addUser = function(id, modules){
		
	};

	view.highlightUser = function(id){
		switchToUserView(userInfo[id]);
		showUserView();
	};

	view.editUser = function(id){
		switchToUserView(userInfo[id], true);
		showUserView();
	};

	view.hideUser = function(id){
		userInfo[id].hidden = true;
		updateArregate();
	};

	view.removeUser = function(id){
		delete userInfo[id];
		updateArregate();
	};

	view.hideUserView = hideUserView;

	// id: [hidden: bool, info: {name, timeslot, isHidden}]
	var userInfo = {},
		userCount = 0;

	var aggregateInfo = (function(){
		var re = [];
		for(var i = 0; i < 5; i++){
			re.push([]);
			for(var j = 0; j < 32; j++){
				re[i].push(0);
			}
		}
		return re;
	})();

	function switchToUserView(info, edit){

	}

	function updateArregateView(){

	}

	function showUserView(){

	}

	function hideUserView(){

	}

	function updateArregate(){

	}

	// private stuff
	var cells = (function genTable(){
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
				cell.className = "timetable-cell";
				var innerCell1 = document.createElement("div"),
					innerCell2 = document.createElement("div"),
					innerCell3 = document.createElement("div");
				innerCell1.className = "aggregate-left";
				innerCell2.className = "aggregate-right";
				innerCell3.className = "user";
				cell.appendChild(innerCell1);
				cell.appendChild(innerCell2);
				cell.appendChild(innerCell3);
				cells[i].push([innerCell1, innerCell2, innerCell3]);
				row.appendChild(cell);
			}
			tbody.appendChild(row);
		}
		div.appendChild(table);
		return cells;
	})();

	return view;
};