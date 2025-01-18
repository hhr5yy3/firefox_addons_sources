function OnePlayerMenuItem(sceneManager) {
	MainMenuItem.call(this, sceneManager);
	this.setName("1 PLAYER");
}

OnePlayerMenuItem.prototype = subclass(MainMenuItem);

OnePlayerMenuItem.prototype.execute = function() {
	this._sceneManager.toGameScene();
};