/*
 * the user side bar io
 * adding new users
 * parsing urls
 * hovering and shit
 */

var UserBar = function(userList, timetable){
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
		parseUrl(url, function(mods){
			var id = name + "_" + (new Date());
			timetable.addUser(id, ["a", "b"]);
			var elm = document.createElement("li"),
				nameDisplay = document.createElement("span"),
				remove = document.createElement("span");
			nameDisplay.className = "name";
			remove.className = "toremove";
			remove.innerHTML = "x";
			nameDisplay.innerHTML = name;
			elm.appendChild(nameDisplay);
			elm.appendChild(remove);
			$(elm).hover(function(){
				if(!editing) timetable.highlightUser(id);
			}, function(){
				if(!editing) timetable.hideUserView();
			}).click(function(){
				if(editing == id){
					timetable.hideUserView();
					$(this).removeClass("editing");
					editing = false;
				}else if(!editing){
					editing = id;
					$(this).addClass("editing");
					timetable.editUser(id);
				}
			});
			$(userList).prepend(elm);
			success();
		}, function(){
			alert("Something must be wrong with your url.");
		});
	};
	

	return view;
};

