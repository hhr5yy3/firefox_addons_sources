function ConstructionMenuItem(sceneManager) {
	MainMenuItem.call(this, sceneManager);
	this.setName("CONSTRUCTION");
}

ConstructionMenuItem.prototype = subclass(MainMenuItem);

ConstructionMenuItem.prototype.execute = function() {
	this._sceneManager.toConstructionScene();
};