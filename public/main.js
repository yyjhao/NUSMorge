$(document).ready(function(){
	var timetable = TimeTable(document.querySelector("#timetableView"));
	window.t = timetable;

	timetable.addUser("eh", ["a", "b"]);
	timetable.addUser("eh2", ["a", "b"]);
	timetable.addUser("eh3", ["a", "b"]);

	timetable.highlightUser("eh");
});