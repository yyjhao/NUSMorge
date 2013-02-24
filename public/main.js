$(document).ready(function(){
	var timetable = TimeTable(document.querySelector("#timetableView"));
	window.t = timetable;

	var userBar = UserBar(document.querySelector("#people-list"), timetable, JSON.parse(localStorage.eh));
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
});