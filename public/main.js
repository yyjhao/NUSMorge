$(document).ready(function(){
	var timetable = TimeTable(document.querySelector("#timetableView"));
	window.t = timetable;
	if(!network.getId() && network.getIdPool().getLast()){
		location.hash = network.getIdPool().getLast();
		network.updateId();
	}

	var ini = function(info){
		info = info || [];
		var userBar = UserBar(document.querySelector("#people-list"), timetable, info);
		var nameInput = $("#username_input"),
			urlInput = $("#url_input"),
			inputBut = $("#adduser");
		nameInput.focus();
		inputBut.click(function(){
			if(!nameInput.val|| (!urlInput.val()))return;
			userBar.addUser(nameInput.val(), urlInput.val(), function(){
				nameInput.val("");
				urlInput.val("");
			});
		});
		nameInput.add(urlInput).on('keyup', function(e) {
			if (e.which == 13) {
				inputBut.click();
				e.preventDefault();
			}
		});

		var genLinkManger = GenLinkManager($("#gen-link-area"), function(){
			return userBar.getUserInfo();
		}, $("#sync-area"), function(){
			userBar.update();
		});
	};

	if(network.getId()){
		network.getInfo(function(res){
			console.log("res", res);
			ini(res.info);
		});
	}else{
		ini();
	}

	//hacky, temporary solution
	$("#forgot").click(function(){
		var ids = network.getIdPool().getIds();
		var div = document.createElement("div");
		var a = document.createElement("a");
			a.target = "_blank";
		div.appendChild(a);
		document.write(ids.map(function(id){
			var l = location.origin + "/#" + id;
			a.innerHTML = a.href = l;
			return div.innerHTML;
		}).join("<br/>"));
	});
});