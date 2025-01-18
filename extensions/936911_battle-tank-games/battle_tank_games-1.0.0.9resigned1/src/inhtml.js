document.addEventListener('DOMContentLoaded', function() {
	var FPS = 50;
	var bgWindow = chrome.extension.getBackgroundPage();

	var Globals = bgWindow.Globals;

	var CANVAS_ID = 'canvas';
	var ctx = createCanvasContext();
	ctx.font = "16px prstart"

	var eventManager = bgWindow.eventManager;
	var keyboard = new Keyboard(eventManager);
	var sceneManager = bgWindow.sceneManager;

	setInterval(function() {
		gameLoop();
	}, 1000 / FPS);

	function gameLoop() {
		keyboard.fireEvents();
		sceneManager.draw(ctx);
	}

	function createCanvasContext() {
		var canvas = document.getElementById(CANVAS_ID);
		return canvas.getContext('2d');
	};

	document.getElementById('sndCtrl').src = bgWindow.SoundManager.isOn() ? "images/sound_on.png" : "images/sound_off.png";

	document.getElementById('sndCtrl').onclick = function(event) {
		if (bgWindow.SoundManager.isOn()) {
			bgWindow.SoundManager.mute();
			this.src = "images/sound_off.png";
		} else {
			bgWindow.SoundManager.unmute();
			this.src = "images/sound_on.png";
		}
	};

	chrome.runtime.connect();
});