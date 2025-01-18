function SteelWall(eventManager) {
	Wall.call(this, eventManager);
	this._invincibleForNormalBullets = true;
}

SteelWall.prototype = subclass(Wall);

SteelWall.prototype.getClassName = function() {
	return 'SteelWall';
};

SteelWall.prototype.getImage = function() {
	return 'wall_steel';
};