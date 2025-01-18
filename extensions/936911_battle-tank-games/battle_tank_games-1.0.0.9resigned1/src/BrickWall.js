function BrickWall(eventManager) {
	Wall.call(this, eventManager);
}

BrickWall.prototype = subclass(Wall);

BrickWall.prototype.getClassName = function() {
	return 'BrickWall';
};

BrickWall.prototype.getImage = function() {
	return 'wall_brick';
};