/*
 * Time table management
 */

var TimeTable = function(div){
	var view = {};

	// public APIs
	var addUser = view.addUser = function(id, modules){
		
		showUser(id);
	};

	var highlightUser = view.highlightUser = function(id){
		switchToUserView(userInfo[id]);
		showUserView();
	};

	var editUser = view.editUser = function(id){
		switchToUserView(userInfo[id], true);
		showUserView();
	};

	function hideSlot(slot){
		if(slot.isHidden)return;
		slot.isHidden = true;
		removeFromAggregate(slot.timeSlot);
	}

	function showSlot(slot){
		if(!slot.isHidden)return;
		slot.isHdden = true;
		addToAggregate(slot.timeSlot);
	}

	var hideUser = view.hideUser = function(id){
		userInfo[id].hidden = true;
		userCount--;
		userInfo[id].info.forEach(function(s){
			if(!s.isHidden){
				removeFromAggregate(s.timeSlot);
			}
		});
		updateAggregateView();
	};

	var showUser = view.showUser = function(id){
		userInfo[id].hidden = true;
		userCount++;
		userInfo[id].info.forEach(function(s){
			if(!s.isHidden){
				addToAggregate(s.timeSlot);
			}
		});
		updateAggregateView();
	};

	var removeUser = view.removeUser = function(id){
		hideUser(id);
		delete userInfo[id];
		updateArregateView();
	};

	view.updateAggregateView = updateAggregateView;

	view.hideUserView = hideUserView;

	function UserTimeSlotDisplay(){
		var elm = this.elm = document.createElement("div");
		elm.className = "user";
		var toShowButton = this.toShowButton = document.createElement("div");
		toShowButton.innerHTML = "o";
		toShowButton.className = "toShowButton";
		var self = this;
		toShowButton.onclick = function(){
			$(this).toogleClass("toHide");
			self.toggleShowHide();
		};
		elm.appendChild(toShowButton);
		var content = this.content = document.createElement("span");
		elm.appendChild(content);
		// hidden means not considered in aggreate, but it will still be displayed
		this.hidden = true;
	}

	UserTimeSlotDisplay.prototype.setSlot = function(timeSlot){
		this.content.innerHTMl = timeSlot.name;
		this.setHidden(timeSlot.isHidden, true);
		this.elm.style.width = 100 * timeSlot.duration + "%";
		this.slot = timeSlot;
	};

	UserTimeSlotDisplay.prototype.setHidden = function(hidden, dontTell){
		this.hidden = hidden;
		if(hidden){
			$(this.toShowButton).addClass("tohide");
		}else{
			$(toShowButton).removeClass("tohide");
		}
		if(!dontTell){
			this.slotVisibilityChanged(hidden);
		}
	};

	UserTimeSlotDisplay.prototype.toggleShowHide = function(){
		this.setHidden(!this.hidden);
	};

	UserTimeSlotDisplay.prototype.slotVisibilityChanged = function(nowHidden){
		if(nowHidden){
			hideSlot(this.slot);
		}else{
			showSlot(this.slot);
		}
	};

	// id: {hidden: bool, info: [{name, timeSlot, timeSlotString, isHidden}]}
	var userInfo = {},
		userCount = 0,
		curUserView;

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
		if(curUserView){
			hideUserView();
		}
		info.forEach(function(s){
			activateSlot(s);
		});
	}

	function activateSlot(timeslot){
		var display = cells[timeslot.day][timeslot.start];
		display.setSlot(timeslot);
		display.style.display = "block";
	}

	function updateAggregateView(){
		if(!userCount)return;
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 32; j++){
				cells[i][j / 2 | 0][j % 2].style.background = "hsl(" +
					((userCount - aggregateInfo[i][j]) / userCount * 100 | 0) +
					", 100%, 50%)";
			}
		}
	}

	function hideUserView(){
		userSlotDisplays.css({
			display: "none"
		});
	}

	// private stuff
	var cells = (function genTable(){
		var table = document.createElement("table"),
			tbody = document.createElement("tbody");
		table.className = "timetable";
		var cells = [];
		var timeHeader = document.createElement("tbody"),
			hr = document.createElement("tr"),
			timeHeaderTable = document.createElement("table");
		timeHeaderTable.className = "timeheader";
		timeHeader.appendChild(hr);
		timeHeaderTable.appendChild(timeHeader);
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
					innerCell3 = new UserTimeSlotDisplay();
				innerCell1.className = "aggregate-left";
				innerCell2.className = "aggregate-right";
				cell.appendChild(innerCell1);
				cell.appendChild(innerCell2);
				cell.appendChild(innerCell3.elm);
				cells[i].push([innerCell1, innerCell2, innerCell3]);
				row.appendChild(cell);
			}
			tbody.appendChild(row);
		}
		div.appendChild(timeHeaderTable);
		div.appendChild(table);
		return cells;
	})();

	var userSlotDisplays = $(".user");

	return view;
};

