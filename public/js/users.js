/*
 * the user side bar io
 * adding new users
 * parsing urls
 * hovering and shit
 */

var UserBar = function(userList, timetable, userInfo){
	// parse url to an array of modules
	//  in the form of [CS1234=L2S2]
	//  may want to further parse
	function parseUrl(url, success, failure){
		var m = url.split("#").pop().split("&");
		if(!m || (!m.length)){
			failure();
		}else{
			var set = {};
			m.forEach(function(mm){
				set[mm] = true;
			});
			try{
				var slots = Object.keys(set).filter(function(mm){
					return mm.indexOf("=") !== -1;
				}).map(function(mm){
					var inf = mm.split("=");
					return moduleInfo[inf[0]][inf[1]];
				});
				if(slots.length) success(slots);
				else failure();
			}catch(e){
				failure();
			}
		}
	}

	var view = window.u = {};

	var users = [];
	var editing = false;
	view.addUser = function(name, url, success){
		parseUrl(url, function(slots){
			var user = {};
			user.id = name + "_" + (new Date()).getTime().toString(36);
			user.hidden = false;
			user.name = name;
			user.info = slotsToInfo(slots);
			addUserWithInfo(user);
			success();
			view.update();
		}, function(){
			alert("Something must be wrong with your url.\nNote that currently we only support the long version of nusmods url.");
		});
	};

	var getUserInfo = view.getUserInfo = function(){
		var info = timetable.getUserInfo();
		return users.map(function(u){
			return info[u.id];
		});
	};

	view.update = function(){
		var data = getUserInfo();
		network.postUpdate(data, function(){
		});
	};

	function slotsToInfo(slots){
		var info = [];
        slots.forEach(function(m){
            var name = m.code + "-" + m.type;

            m.slots.forEach(function(s){
                var obj = {};
                obj.name =  name;
                obj.timeSlot = {
                    start: s.start,
                    day: s.day,
                    duration: s.duration
                };
                obj.isHidden = false;
                info.push(obj);
            });
        });
        return info;
	}
	
	function addUserWithInfo(user){
		users.push(user);
		timetable.addUser(user.id, user.info, user.hidden);
		if(!user.name){
			var splits = user.id.split("_");
			splits.pop();
			user.name = splits.join("_");
		}
		var elm = document.createElement("li"),
			viewToggle = document.createElement("span");
			nameDisplay = document.createElement("span"),
			remove = document.createElement("div");
		viewToggle.className = "view-toggle toggled";
		nameDisplay.className = "name";
		remove.className = "toremove";
		remove.innerHTML = "x";
		nameDisplay.innerHTML = user.name;
		elm.appendChild(viewToggle);
		elm.appendChild(nameDisplay);
		elm.appendChild(remove);
		$(elm).hover(function(){
			if(!editing && !user.hidden) timetable.highlightUser(user.id);
		}, function(){
			if(!editing && !user.hidden) timetable.hideUserView();
		}).click(function(){
			if(editing == user.id && !user.hidden){
				timetable.hideUserView();
				$(this).removeClass("editing");
				editing = false;
			}else if(!editing && !user.hidden){
				editing = user.id;
				$(this).addClass("editing");
				timetable.editUser(user.id);
			}
		});
		$(remove).click(function(e){
			if(confirm("Are you sure you want to remove this dude?")){
				timetable.removeUser(user.id);
				timetable.hideUserView();
				if(editing == user.id){
					editing = false;
				}
				userList.removeChild(elm);
				users.splice(users.indexOf(user), 1);
			}
			e.preventDefault();
			return false;
		});
		$(viewToggle).click(function(e){
			if(editing == user.id)return;
			timetable.hideUserView();
			if(user.hidden){
				$(this).addClass("toggled");
				user.hidden = false;
				timetable.showUser(user.id);
			}else{
				$(this).removeClass("toggled");
				user.hidden = true;
				timetable.hideUser(user.id);
			}
			e.preventDefault();
			return false;
		});
		$(userList).prepend(elm);
	}
	userInfo.forEach(function(u){
		u.hidden = (u.hidden === "true");
		u.info.forEach(function(inf){
			inf.isHidden = (inf.isHidden === "true");
			var timeSlot = inf.timeSlot;
			timeSlot.day = parseInt(timeSlot.day, 10);
			timeSlot.start = parseInt(timeSlot.start, 10);
			timeSlot.duration = parseInt(timeSlot.duration, 10);
		});
		addUserWithInfo(u);
	});
	return view;
};

