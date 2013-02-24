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
			var slots = Object.keys(set).map(function(mm){
				var inf = mm.split("=");
				console.log(inf);
				console.log(moduleInfo[inf[0]]);
				return moduleInfo[inf[0]][inf[1]];
			});
			success(slots);
		}
	}

	var view = {};

	var users = [];
	var editing = false;
	view.addUser = function(name, url, success){
		parseUrl(url, function(slots){
			var user = {};
			user.id = name + "_" + (new Date()).getTime();
			user.hidden = false;
			user.name = name;
			user.slots = slots;
			addUserWithInfo(user);
			success();
		}, function(){
			alert("Something must be wrong with your url.");
		});
	};
	
	function addUserWithInfo(user){
		timetable.addUser(user.id, user.slots, user.hidden);
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
				users.splice(users.indexOf(user));
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

	return view;
};

