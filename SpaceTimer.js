var running = [];
var finalTime = [];
var startTime = [];
var timerKeys = [' ', 'Z', 'X']; // Add keys here for more timers
function timeToString(time){
	time = time || 0;
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
})(['R'].concat(timerKeys));

window.addEventListener('keyup',function(evt){
	for(var i = 0; i < timerKeys.length; i++){
		if(evt.keyCode === Keys[[timerKeys[i]]]){
			finalTime[timerKeys[i]] = Date.now() - startTime[timerKeys[i]];
			running[timerKeys[i]] = false;
		}
	}

	if (evt.keyCode === Keys.R){
		for(var i = 0; i < timerKeys.length; i++){
			finalTime[timerKeys[i]] = 0;
		}
	}
});

window.addEventListener('keydown',function(evt){
	for(var i = 0; i < timerKeys.length; i++){
		if(evt.keyCode === Keys[timerKeys[i]]){
			if(running[timerKeys[i]]){
				return;
			}
			running[timerKeys[i]] = true;
			startTime[timerKeys[i]] = Date.now();
		}
	}
});

function elementName(key){
	return (key===' '?'space':key)+'timer';
}

window.onload = function(){
	for(var i = 0; i < timerKeys.length; i++){
		var newTimer = $('<p>',{
			'id': elementName(timerKeys[i]),
			'class': 'timer'
		});
		newTimer.text(timeToString());
		$('#timers').append(newTimer);
	}
	function run(){
		for(var i = 0; i < timerKeys.length; i++){
			if(running[timerKeys[i]]){
				$("#"+elementName(timerKeys[i])).text(timeToString(Date.now() - startTime[timerKeys[i]]));
			}else{
				$("#"+elementName(timerKeys[i])).text(timeToString(finalTime[timerKeys[i]]));
			}
		}
		window.requestAnimationFrame(run);
	}
	window.requestAnimationFrame(run);
}