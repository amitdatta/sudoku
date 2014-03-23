var currTime = 0;
function updateTimer() {
	setTimeout(function() {
		currTime++;
		$(document.getElementById('game-time')).html(currTime);
		updateTimer();
	},1000);
};