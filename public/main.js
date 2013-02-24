$(document).ready(function(){
	var timetable = TimeTable(document.querySelector("#timetableView"));
	window.t = timetable;

	var ini = function(info){
		console.log(info);
		info = info || [];
		var userBar = UserBar(document.querySelector("#people-list"), timetable, info);
		var nameInput = $("#username_input"),
			urlInput = $("#url_input"),
			inputBut = $("#adduser");
		inputBut.click(function(){
			if(!nameInput.val|| (!urlInput.val()))return;
			userBar.addUser(nameInput.val(), urlInput.val(), function(){
				nameInput.val("");
				urlInput.val("");
			});
		});

		var genLinkManger = GenLinkManager($("#gen-link-area"), function(){
			return timetable.getUserInfo();
		});
	};

	if(network.getId()){
		network.getInfo(function(res){
			ini(res.info);
		});
	}else{
		ini();
	}
});