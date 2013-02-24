var moveit = function() {
    this.style.position = "absolute";
    this.style.top = Math.random()*500 + "px";
    this.style.left = Math.random()*800 + "px";
    this.style.webkitTransitionDuration = "1s";
};

var moveall = function() {
    $("td").each(moveit);
}

var explode = function() {
    /*
       var body = document.getElementsByTagName("body");
       body[0].style.color = "blue";
       */
    //setInterval(function(){ alert("hello")}, 1000);
    $("td").css({
        position: "absolute",
        top: 0,
        left: 0,
        webkitTransitionDuration: "1s"
    });
    setInterval(moveall, 2000);
    /*
    setInterval(function(tds) {
        for (var i in tds) {
            var td = tds[i];
            moveit(td);
        }}, 1000);
        */
}
