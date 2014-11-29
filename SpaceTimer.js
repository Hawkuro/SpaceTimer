var running = false;
var finalTime = 0;
var startTime;
function timeToString(time){
	var mSecs = time % 1000;
	time = Math.floor(time / 1000);
	var secs = time % 60;
	time = Math.floor(time / 60); // time = minutes
	return (time < 10?"0":"") + time + ":" + (secs < 10?"0":"") + secs + "." + (mSecs < 100?"0":"") + (mSecs < 10?"0":"") + mSecs;
}

window.onload = function(){
	function run(){
		$("#timer").text(timeToString(finalTime++));
		window.requestAnimationFrame(run);
	}
	window.requestAnimationFrame(run);
}