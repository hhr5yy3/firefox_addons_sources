function Player() {
	this._lives = 2;
	this._score = 0;
	this._lvl = 0;
	this.resetTanks();
}

Player.Event = {};
Player.Event.OUT_OF_LIVES = 'Player.Event.OUT_OF_LIVES';

Player.prototype.resetTanks = function() {
	this._tanks = {};
	this._tanks[Tank.Type.BASIC] = 0;
	this._tanks[Tank.Type.FAST] = 0;
	this._tanks[Tank.Type.POWER] = 0;
	this._tanks[Tank.Type.ARMOR] = 0;
	this._tanksCount = 0;
};

Player.prototype.setEventManager = function(eventManager) {
	this._eventManager = eventManager;
	this._eventManager.addSubscriber(this, [
		PointsFactory.Event.POINTS_CREATED,
		Tank.Event.PLAYER_DESTROYED,
		PowerUpHandler.Event.TANK,
		PowerUpHandler.Event.STAR,
		PlayerTankFactory.Event.PLAYER_TANK_CREATED,
		Tank.Event.ENEMY_DESTROYED
	]);
};

Player.prototype.notify = function(event) {
	if (event.name == PointsFactory.Event.POINTS_CREATED) {
		this._score += event.points.getValue();
	} else if (event.name == Tank.Event.PLAYER_DESTROYED) {
		if (this._lives == 0) {
			this._eventManager.fireEvent({
				'name': Player.Event.OUT_OF_LIVES,
				'score': this._score
			});
		} else {
			this._lives--;
			this._lvl = 0;
		}
	} else if (event.name == PowerUpHandler.Event.TANK) {
		this._lives++;
	} else if (event.name == Tank.Event.ENEMY_DESTROYED) {
		if (event.tank.getValue() > 0) {
			this._tanks[event.tank.getType()]++;
			this._tanksCount++;
		}
	} else if (event.name == PlayerTankFactory.Event.PLAYER_TANK_CREATED) {
		var self = this;
		var playerTank = event.tank;
		for (var i = 0; i < self._lvl; i++) {
			playerTank.upgrade()
		}
	} else if (event.name == PowerUpHandler.Event.STAR) {
		this._lvl = this._lvl < 3 ? this._lvl + 1 : this._lvl;
	}
};

Player.prototype.getScore = function() {
	return this._score;
};

Player.prototype.getLives = function() {
	return this._lives;
};

Player.prototype.getTanks = function(type) {
	return this._tanks[type];
};

Player.prototype.getTanksCount = function() {
	return this._tanksCount;
};

Player.prototype.getLvl = function() {
	return this._lvl;
}