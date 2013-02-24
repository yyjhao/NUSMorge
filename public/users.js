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
			success(m);
		}
		
	}

	var view = {};

	var users = {};
	var editing = false;
	view.addUser = function(name, url, success){
		var user = {};
		user.hidden = false;
		parseUrl(url, function(mods){
			var id = name + "_" + (new Date());
			timetable.addUser(id, ["a", "b"]);
			var elm = document.createElement("li"),
				viewToggle = document.createElement("span");
				nameDisplay = document.createElement("span"),
				remove = document.createElement("div");
			viewToggle.className = "view-toggle toggled";
			nameDisplay.className = "name";
			remove.className = "toremove";
			remove.innerHTML = "x";
			nameDisplay.innerHTML = name;
			elm.appendChild(viewToggle);
			elm.appendChild(nameDisplay);
			elm.appendChild(remove);
			$(elm).hover(function(){
				if(!editing && !user.hidden) timetable.highlightUser(id);
			}, function(){
				if(!editing && !user.hidden) timetable.hideUserView();
			}).click(function(){
				if(editing == id && !user.hidden){
					timetable.hideUserView();
					$(this).removeClass("editing");
					editing = false;
				}else if(!editing && !user.hidden){
					editing = id;
					$(this).addClass("editing");
					timetable.editUser(id);
				}
			});
			$(remove).click(function(e){
				if(confirm("Are you sure you want to remove this dude?")){
					timetable.removeUser(id);
					timetable.hideUserView();
					if(editing == id){
						editing = false;
					}
					userList.removeChild(elm);
				}
				e.preventDefault();
				return false;
			});
			$(viewToggle).click(function(e){
				if(editing == id)return;
				timetable.hideUserView();
				if(user.hidden){
					$(this).addClass("toggled");
					user.hidden = false;
					timetable.showUser(id);
				}else{
					$(this).removeClass("toggled");
					user.hidden = true;
					timetable.hideUser(id);
				}
				e.preventDefault();
				return false;
			});
			$(userList).prepend(elm);
			success();
		}, function(){
			alert("Something must be wrong with your url.");
		});
	};
	

	return view;
};

