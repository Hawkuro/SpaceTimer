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

function keyCode(keyChar) {
	return keyChar.charCodeAt(0);
}

var Keys = (function(keys){ // Store the keys I use
	var myKeys = {};
	keys.forEach(function(item){
		myKeys[item] = keyCode(item);
	})
	return myKeys;
})([ // List of Keys
	' '
]);

window.addEventListener('keyup',function(evt){
	if(evt.keyCode === Keys[' ']){
		finalTime = Date.now() - startTime;
		running = false;
	}
});

window.addEventListener('keydown',function(evt){
	if(evt.keyCode === Keys[' ']){
		if(running){
			return;
		}
		running = true;
		startTime = Date.now();
	}
});

window.onload = function(){
	function run(){
		if(running){
			$("#timer").text(timeToString(Date.now() - startTime));
		}else{
			$("#timer").text(timeToString(finalTime));
		}
		window.requestAnimationFrame(run);
	}
	window.requestAnimationFrame(run);
}