function BulletExplosion(eventManager) {
	Explosion.call(this, eventManager);
	this._animation = new Animation([1, 2, 3]);
}

BulletExplosion.prototype = subclass(Explosion);

BulletExplosion.prototype.getImage = function() {
	return 'bullet_explosion_' + this._animation.getFrame();
};