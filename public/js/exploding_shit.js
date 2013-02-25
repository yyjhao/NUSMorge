/*
 * Guess what, this is an easter egg
 */

var moveit = function() {
    this.style.position = "absolute";
    var height = window.innerHeight;
    var width = window.innerWidth;
    this.style.top = Math.random()*height + "px";
    this.style.left = Math.random()*width + "px";
    this.style.webkitTransitionDuration = "1s";
};

var moveall = function() {
    $("td").each(moveit);
};

var explode = function() {
    $("td").css({
        position: "absolute",
        top: 0,
        left: 0,
        webkitTransitionDuration: "1s"
    });
    setInterval(moveall, 2000);
};
