var FPS = 50;

var eventManager = new EventManager();
var sceneManager = new SceneManager(eventManager);
sceneManager.toLoadingScene();

setInterval(function() {
	gameLoop();
}, 1000 / FPS);

function gameLoop() {
	sceneManager.update();
}

chrome.runtime.onConnect.addListener(function(externalPort) {
	externalPort.onDisconnect.addListener(function() {
		try {
			sceneManager._scene._level._pause.pause()
		} catch (err) {}
	})
});