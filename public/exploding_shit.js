var moveit = function(object) {
    object.style.position = "absolute";
    object.style.top = Math.random()*500 + "px";
    object.style.left = Math.random()*800 + "px";
};

var moveall = function() {
    var tds = document.getElementsByTagName("td");
    for (var i in tds) {
        moveit(tds[i]);
    }
}

var explode = function() {
    /*
       var body = document.getElementsByTagName("body");
       body[0].style.color = "blue";
       */
    //setInterval(function(){ alert("hello")}, 1000);
    setInterval(moveall(), 2000);
    /*
    setInterval(function(tds) {
        for (var i in tds) {
            var td = tds[i];
            moveit(td);
        }}, 1000);
        */
}
