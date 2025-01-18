let getLocalsMessage = (messagename) => {
    return chrome.i18n.getMessage(messagename);
}

let Storage = {
    setValue: (key, value) => {
        localStorage[key] = JSON.stringify(value);
    },
    getValue: (key) => {
        let result = undefined;
        try {
            if (localStorage[key]) result = JSON.parse(localStorage[key]);
        } catch (e) {
            throw new StorageError(`Error in localStorage[${key}] value. ${localStorage[key]}`);
        }
        return result;
    }
};

/**
 * StorageError
 * @param   string      _msg    Error message    
 */
class StorageError extends Error {
    constructor(_msg) {
        super();
        this.name = 'StorageError';
        this.message = _msg || 'Storage Error';
        this.stack = (new Error()).stack;
    }
}

var highscore = Storage.getValue('highscore') ? Storage.getValue('highscore') : 0;

//var audioBg = new Audio('./files/intro.mp3');
//audioBg.loop = true;
//audioBg.play();

function GUILocalization() {
    document.querySelector('#loading_screen').textContent = getLocalsMessage('lblLoading');
    document.querySelector('#end_screen').textContent = getLocalsMessage('lblRestart');
    document.querySelector('#speed').textContent = `0 ${getLocalsMessage('lblMSpeed')}`;
    document.querySelector('#score').textContent = `0`;
    document.querySelector('#scorePoints').textContent =  `${getLocalsMessage('lblMPoints')}`;
    document.querySelector('#highscore').textContent = `${highscore} ${getLocalsMessage('lblMPoints')}`;
    document.querySelector('#timer').textContent = `60${getLocalsMessage('lblMSeconds')}`;
    document.querySelectorAll('#title_screen span')[0].textContent = getLocalsMessage('lblRules');
    document.querySelectorAll('#title_screen span')[1].textContent = getLocalsMessage('lblControls1');
    document.querySelectorAll('#title_screen span')[2].textContent = getLocalsMessage('lblControls2');
    document.querySelectorAll('#title_screen span')[3].textContent = getLocalsMessage('lblStart');
}

GUILocalization();
/**
 * game state pseudo constants
 * defines separate game states to allow quick switching from one state to the next
 */
var LOADING_STATE = 0,
    TITLE_STATE = 1,
    PLAY_STATE = 2,
    CRASH_STATE = 3,
    FINISHED_STATE = 4;

/**
 * game variables
 * declaring variables to use app wide
 */
var game = {
        loop: null
    },
    race,
    statesManager,
    dom = {
        track: document.getElementById('track'),
        player: document.getElementById('player'),
        enemies: document.getElementById('enemies'),
        coins: document.getElementById('coins'),
        score: document.getElementById('score'),
        highscore: document.getElementById('highscore'),
        timer: document.getElementById('timer'),
        speedometer: document.getElementById('speedometer'),
        speed: document.getElementById('speed'),
        gauge: document.getElementById('gauge'),
        pointer: document.getElementById('pointer'),
        loading_screen: document.getElementById('loading_screen'),
        title_screen: document.getElementById('title_screen'),
        end_screen: document.getElementById('end_screen'),
        end_frame: document.getElementById('end_frame')
    },
    assets = {};

/**
 * function to return the correct css prefix based on browser
 * @return {object} returns an object containing different ways to use the prefix
 */
var prefix = (function() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        domm = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: domm,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
}());

/** ===============================================
 * Game Entities
 * ============================================= */

/** 
 * Element
 * This is the base object that all entities will extend. 
 * @class Element
 * @constructor
 */
function Element() {
    this.initialize = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    };
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
}

/**
 * Track Object
 * represents a section of the race track
 * @class Track
 * @constructor
 * @extends Element
 */
function Track() {
    this.draw = function(dt) {
        dt = dt || 1;
        this.y += (race.speed * dt * 60 / 1000) * 2;
        if (this.y >= this.canvasHeight) {
            this.y = -(this.height);
        }
        this.context.drawImage(assets.track, this.x, this.y, this.width, this.height);
    };
}
Track.prototype = new Element();

/**
 * Player Object
 * represents the player car for the race
 * @class Player
 * @constructor
 * @extends Element
 */
function Player() {

    /**
     * @property speed
     * speed to move the car side to side on the canvas
     */
    this.speed = 0;

    /**
     * @property margin
     * limit from outer edges of the canvas so that the car doesn't drive on the shoulder
     */
    this.margin = 80;

    /**
     * @method draw
     * The method that clears the canvas, updates the placement of the car, and draws the
     * car to the canvas
     * @param {Integer} number of milliseconds since the last frame
     */
    this.draw = function(dt) {
        dt = dt || 1;
        this.speed = race.speed * 1.3;
        this.context.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        if (statesManager.keyStatus.left || statesManager.keyStatus.right) {
            if (statesManager.keyStatus.left) {
                this.x -= this.speed * dt * 60 / 1000;
                if (this.x <= this.margin) {
                    this.x = this.margin;
                }
            } else if (statesManager.keyStatus.right) {
                this.x += this.speed * dt * 60 / 1000;
                if (this.x >= this.canvasWidth - this.width - this.margin) {
                    this.x = this.canvasWidth - this.width - this.margin;
                }
            }
        }
        this.context.drawImage(assets['player-car'], this.x, this.y, this.width, this.height);
    };
}
Player.prototype = new Element();

/**
 * Enemy Object
 * represents the cars that the player needs to pass to earn points
 * @class Enemy
 * @constructor
 * @extends Element
 */
function Enemy() {

    /**
     * @property speed
     * speed that the car moves down the race track
     */
    this.speed = 0;

    /**
     * @property speedOffset
     * multiplier for the speed property so that the car travels at different speeds down the 
     * track
     */
    this.speedOffset = 1;

    /**
     * @property color
     * color of the car (used to draw the correct image from the assets pool)
     */
    this.color = 'blue';

    /**
     * @property lane
     * holds the current lane that the car is driving within
     */
    this.lane = null;

    /**
     * @method setRandomColor
     * method to randomly select a color for the car
     */
    this.setRandomColor = function() {
        var num = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        switch (num) {
            case 1:
                this.color = 'blue';
                break;
            case 2:
                this.color = 'green';
                break;
            case 3:
                this.color = 'yellow';
                break;
        }
    };

    /**
     * @method generateSpeedOffset
     * method to randomly generate a multiplier for the speed of the car versus the speed of the track
     * the car needs to be slower than the track (so as to appear to be driving), so we generate a number
     * below 1
     * @returns {Float} number below 1
     */
    this.generateSpeedOffset = function() {
        return (Math.random() * (0.85 - 0.6)) + 0.5;
    };

    /**
     * @method create
     * method to create the car, place it in the correct lane, and draw it to the canvas
     */
    this.create = function() {
        this.setLane();
        this.placeEnemy();
        this.draw();
    };

    /**
     * @method placeEnemy
     * method to reset the car so that it appears to be a different car (used when the car goes off screen and 
     * moves back to the top.
     */
    this.placeEnemy = function() {
        this.setRandomColor();
        this.speedOffset = this.generateSpeedOffset();
    };

    /**
     * @method setLane
     * method to randomly place the car in an empty lane
     * @recursive
     */
    this.setLane = function() {
        var lane = Math.floor(Math.random() * ((4 - 0) + 1));
        if (race.lanes_taken[lane] == undefined) {
            this.x = race.lanes[lane] - this.width / 2;
            delete race.lanes_taken[this.lane];
            race.lanes_taken[lane] = this;
            this.lane = lane;
        } else {
            this.setLane();
        }
    };

    /**
     * @method draw
     * method to update the placement of the car and draw the correct image to the canvas
     * @param {Integer} number of milliseconds since the last frame
     */
    this.draw = function(dt) {
        dt = dt || 1;
        this.context.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        this.speed = race.speed * this.speedOffset;
        this.y += (this.speed * dt * 60 / 1000) * 3;
        if (this.y >= this.canvasHeight + this.height) {
            this.y = 0 - this.height;
            this.setLane();
            this.placeEnemy();
            race.handleCarPassed();
        }
        this.context.drawImage(assets['npc-' + this.color], this.x, this.y, this.width, this.height);
    };
}
Enemy.prototype = new Element();

/**
 * Coin Object
 * represents a coin to be collected by the player car
 * @class Coin
 * @constructor
 * @extends Element
 */
function Coin() {

    /**
     * local variables used for the sprite sheet
     */
    var frameWidth = 32,
        frameHeight = 32,
        frameSpeed = 4,
        framesPerRow = 8,
        endFrame = 8,
        currentFrame = 0,
        counter = 0;

    /**
     * @property speed
     * the speed at which the coin travels down the track
     */
    this.speed = 0;

    /**
     * @property speedOffset
     * multiplier for the speed property so that the coin travels at different speeds down the 
     * track
     */
    this.speedOffset = 1;

    /**
     * @property color
     * color of the coin (used to draw the correct image from the assets pool)
     */
    this.color = 'copper';

    /**
     * @property score
     * the amount of points to increment the players score when this coin is collected. This property is
     * updated based on the 'color' of the coin
     */
    this.score = 10;

    /**
     * @property lane
     * holds the current lane that the coin is moving within
     */
    this.lane = null;

    /**
     * @method setRandomColor
     * method to randomly select a color for the coin and set the score to be applied
     */
    this.setRandomColor = function() {
        var num = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
        switch (num) {
            case 1:
            case 2:
            case 3:
            case 4:
                this.color = 'copper';
                this.score = 10;
                break;
            case 5:
            case 6:
            case 7:
                this.color = 'silver';
                this.score = 25;
                break;
            case 8:
            case 9:
                this.color = 'gold';
                this.score = 50;
                break;
        }
    };

    /**
     * @method generateSpeedOffset
     * method to randomly generate a multiplier for the speed of the coin versus the speed of the track
     * @returns {Float} number below 1
     */
    this.generateSpeedOffset = function() {
        return (Math.random() * (0.85 - 0.6)) + 0.5;
    };

    /**
     * @method create
     * method to create the coin, place it in the correct lane, and draw it to the canvas
     */
    this.create = function() {
        this.setLane();
        this.placeCoin();
        this.draw();
    };

    /**
     * @method placeCoin
     * method to reset the coin so that it appears to be a different coin (used when the coin goes off screen and 
     * moves back to the top.
     */
    this.placeCoin = function() {
        this.setRandomColor();
        this.speedOffset = this.generateSpeedOffset();
    };

    /**
     * @method setLane
     * method to randomly place the coin in an empty lane
     * @recursive
     */
    this.setLane = function() {
        var lane = Math.floor(Math.random() * (4 - 0 + 1));
        if (race.lanes_taken[lane] == undefined) {
            this.x = race.lanes[lane] - this.width / 2;
            delete race.lanes_taken[this.lane];
            race.lanes_taken[lane] = this;
            this.lane = lane;
        } else {
            this.setLane();
        }
    };

    /**
     * @method update
     * method to update the variables used in determining the correct frame for the sprite sheet
     */
    this.update = function() {
        if (counter == (frameSpeed - 1)) {
            currentFrame = (currentFrame + 1) % endFrame;
        };
        counter = (counter + 1) % frameSpeed;
    };

    /**
     * @method erase
     * method to clear the coin from the canvas
     * @chainable
     */
    this.erase = function() {
        this.context.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        return this;
    };

    /**
     * @method reset
     * method to reset the coin's placement and variables so that it acts as an entirely new coin
     */
    this.reset = function() {
        this.y = 0 - (this.height * Math.floor(Math.random() * (80 - 20 + 1)));
        this.setLane();
        this.placeCoin();
    };

    /**
     * @method draw
     * method to calculate the location for the sprite sheet frame, and draw the coin to the canvas
     * @param {Integer} number of milliseconds since the last frame
     */
    this.draw = function(dt) {
        dt = dt || 1;
        this.update();
        var row = Math.floor(currentFrame / framesPerRow),
            col = Math.floor(currentFrame % framesPerRow);
        this.speed = race.speed * this.speedOffset;
        this.erase();

        this.y += this.speed * dt * 60 / 1000;
        if (this.y >= this.canvasHeight + this.height) {
            this.reset();
        }
        this.context.drawImage(assets['coin_' + this.color], col * frameWidth, row * frameHeight, frameWidth, frameHeight, this.x, this.y, frameWidth, frameHeight);
    };
}
Coin.prototype = new Element();

/**
 * Race Object
 * Initializes the game and holds/manages race parameters. Also initializes the entities
 * to be used in the race.
 * @class race (self constructing function)
 */
race = new function() {

    /**
     * @property speed
     * the speed at which the track moves down the canvas
     */
    this.speed = 0;

    /**
     * @property speedStep
     * how much to increment/decrement the speed of the race
     */
    this.speedStep = 0.5;

    /**
     * @property maxSpeed
     * the maximum speed allowed at which the track moves down the canvas
     */
    this.maxSpeed = 100;

    /**
     * @property entities
     * object to hold the various entity pools needed for the game
     */
    this.entities = {
        tracks: [],
        enemies: [],
        coins: [],
        player: null
    };

    /**
     * @property lanes
     * the x property of the center of each lane on the race track (used when placing an entity in 
     * a particular lane)
     */
    this.lanes = [160, 230, 300, 370, 440];

    /**
     * @property carsPassedScore
     * the speed at which the track moves down the canvas
     */
    this.carsPassedScore = 10;

    /**
     * @method speedUp
     * increments the race speed
     */
    this.speedUp = function() {
        if (this.speed < this.maxSpeed) {
            this.speed += this.speedStep;
        } else {
            this.speed = this.maxSpeed;
        }
        this.updateSpeedometer();
    };

    /**
     * @method slowDown
     * decrements the race speed
     */
    this.slowDown = function() {
        if (this.speed > 0) {
            this.speed -= this.speedStep;
        } else {
            this.speed = 0;
        }
        this.updateSpeedometer();
    };

    /**
     * @method createCountDown
     * returns a function to create a timer for the game
     * @param {Integer} number of seconds for the timer
     * @returns {Function} function to call to get the current time in the counter
     */
    this.createCountDown = function(timeRemaining) {
        var startTime = Date.now();
        return function() {
            return timeRemaining - (Date.now() - startTime);
        };
    };

    /**
     * @method updateScore
     * updates the value in the HTML for the current score
     */
    this.updateScore = function() {
        dom.score.textContent = race.score.points;
        if (highscore < race.score.points) {
            highscore = race.score.points;
            Storage.setValue('highscore', highscore);
        }
        dom.highscore.textContent = highscore + ' ' + getLocalsMessage('lblMPoints');
    };

    /**
     * @method updateSpeedometer
     * updates the speedometer pointer in the HTML for the current speed
     */
    this.updateSpeedometer = function() {
        dom.speed.textContent = parseInt(race.speed, 10) + ' ' + getLocalsMessage('lblMSpeed');
        var deg = (race.speed * 1.8) + 90;
        dom.pointer.style[prefix.css + 'transform'] = 'rotate(' + deg + 'deg)';
    };

    /**
     * @method updateCountDownTimer
     * updates the timer in the HTML for the current time remaining for the game
     */
    this.updateCountDownTimer = function(ms) {
        dom.timer.textContent = parseInt(ms / 1000, 10) + getLocalsMessage('lblMSeconds');
    };

    /**
     * @method init
     * initializes the race by resetting all variables and entities
     * @returns {Boolean} true if the browser supports the canvas, false if not
     */
    this.init = function() {
        if (dom.track.getContext) {
            statesManager.eraseEndScreen();
            this.lanes_taken = [];
            this.score = {
                points: 0,
                cars_passed: 0,
                copper_coins_collected: 0,
                silver_coins_collected: 0,
                gold_coins_collected: 0
            };
            this.initTrack();
            this.initPlayer();
            this.initEnemies();
            this.initCoin();
            return true;
        }
        return false;
    };

    /**
     * @method initTrack
     * instantiates the various track instances (4 for this game) and draws them 
     * to the canvas, adding them to the entity pool
     */
    this.initTrack = function() {
        this.trackContext = dom.track.getContext('2d');
        Track.prototype.context = this.trackContext;
        Track.prototype.canvasWidth = dom.track.width;
        Track.prototype.canvasHeight = dom.track.height;

        this.entities.tracks = [];
        this.trackContext.clearRect(0, 0, dom.track.width, dom.track.height);

        var placements = [-200, 0, 200, 400],
            i;
        for (i = 0; i <= 3; i++) {
            var track = new Track();
            track.initialize(0, placements[i], 600, 200);
            track.draw();
            this.entities.tracks.push(track);
        }
    };

    /**
     * @method initPlayer
     * instantiates the player instance and draws it to the canvas, adding it to the
     * entity pool
     */
    this.initPlayer = function() {
        this.playerContext = dom.player.getContext('2d');
        Player.prototype.context = this.playerContext;
        Player.prototype.canvasWidth = dom.player.width;
        Player.prototype.canvasHeight = dom.player.height;

        this.entities.player = null;
        this.playerContext.clearRect(0, 0, dom.player.width, dom.player.height);

        var player = new Player();
        player.initialize(265, 450, 70, 130);
        this.entities.player = player;
    };

    /**
     * @method initEnemies
     * instantiates the various enemy instances (3 for this game) and draws them 
     * to the canvas, adding them to the entity pool
     */
    this.initEnemies = function() {
        this.enemyContext = dom.enemies.getContext('2d');
        Enemy.prototype.context = this.enemyContext;
        Enemy.prototype.canvasWidth = dom.enemies.width;
        Enemy.prototype.canvasHeight = dom.enemies.height;

        this.entities.enemies = [];
        this.enemyContext.clearRect(0, 0, dom.enemies.width, dom.enemies.height);

        for (var i = 0; i <= 2; i++) {
            var enemy = new Enemy();
            enemy.initialize(0, -130, 70, 130);
            enemy.create();
            this.entities.enemies.push(enemy);
        }
    };

    /**
     * @method initCoin
     * instantiates the coin instance and draws it to the canvas, adding it to the
     * entity pool
     */
    this.initCoin = function() {
        this.coinContext = dom.coins.getContext('2d');
        Coin.prototype.context = this.coinContext;
        Coin.prototype.canvasWidth = dom.coins.width;
        Coin.prototype.canvasHeight = dom.coins.height;

        this.entities.coin = null;
        this.coinContext.clearRect(0, 0, dom.coins.width, dom.coins.height);

        var coin = new Coin();
        coin.initialize(0, 0, 32, 32);
        coin.reset();
        coin.create();
        this.entities.coin = coin;
    };

    /**
     * @method detectEnemyCollision
     * detects a bounding box collision between the player car and an enemy car
     * @returns {Boolean} true if collision has occurred, false if not
     */
    this.detectEnemyCollision = function() {
        var x_offset = 5,
            y_offset = 10,
            player = race.entities.player,
            player_x = player.x + x_offset,
            player_y = player.y + y_offset;
        for (var i = race.entities.enemies.length - 1; i >= 0; i--) {
            var enemy_car = race.entities.enemies[i];
            if (player_x < enemy_car.x + enemy_car.width - x_offset && player_x + player.width - x_offset * 2 > enemy_car.x + x_offset &&
                player_y < enemy_car.y + enemy_car.height - y_offset && player_y + player.height - y_offset * 2 > enemy_car.y + y_offset) {
                return true;
            }
        }
        return false;
    };

    /**
     * @method detectCoinCollision
     * detects a bounding box collision between the player car and a coin
     * @returns {Boolean} true if collision has occurred, false if not
     */
    this.detectCoinCollision = function() {
        var x_offset = 5,
            y_offset = 10,
            player = race.entities.player,
            player_x = player.x + x_offset,
            player_y = player.y + y_offset;
        if (player_x < race.entities.coin.x + race.entities.coin.width - x_offset && player_x + player.width - x_offset * 2 > race.entities.coin.x + x_offset &&
            player_y < race.entities.coin.y + race.entities.coin.height - y_offset && player_y + player.height - y_offset * 2 > race.entities.coin.y + y_offset) {
            return true;
        }
        return false;
    };

    /**
     * @method handleCoinCollision
     * updates the player score and resets the coin to the top of the canvas
     */
    this.handleCoinCollision = function() {
        var color = this.entities.coin.color;
        this.score[color + '_coins_collected']++;
        this.score.points += race.entities.coin.score;
        this.entities.coin.erase().reset();
    };

    /**
     * @method handleCarPassed
     * updates the player score
     */
    this.handleCarPassed = function() {
        this.score.points += this.carsPassedScore;
        this.score.cars_passed++;
    }
};

/**
 * StatesManager Object
 * Manages the various application states
 * @class statesManager (self constructing function)
 */
statesManager = new function() {

    /**
     * local variables
     */
    var self = this,
        key_codes = {
            32: 'space',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

    /**
     * @property keyStatus
     * object to hold the status of which keys are pressed and released
     */
    this.keyStatus = {};

    for (var code in key_codes) {
        this.keyStatus[key_codes[code]] = false;
    }

    /**
     * @property currentState
     * property to hold the value of the current application state
     */
    this.currentState = LOADING_STATE;

    /**
     * @method switchState
     * method to update the currentState and fire the new state off
     */
    this.switchState = function(newState) {
        this.currentState = newState;
        this.runCurrentState();
    }.bind(this);

    /**
     * @method runCurrentState
     * method to run the correct methods for each application state
     */
    this.runCurrentState = function() {
        switch (self.currentState) {
            case LOADING_STATE:
                this.showLoadingScreen();
                this.loadAssets(statesManager.switchState, TITLE_STATE);
                break;
            case TITLE_STATE:
                this.hideLoadingScreen();
                this.showTitleScreen();
                break;
            case PLAY_STATE:
                this.hideTitleScreen();
                this.startGamePlay();
                break;
            case CRASH_STATE:
                this.showEndScreen(getLocalsMessage('lblCrash'));
                break;
            case FINISHED_STATE:
                this.showEndScreen(getLocalsMessage('lblCompleted'));
                break;
        }
    }.bind(this);

    /**
     * @method showLoadingScreen
     * displays the loading HTML div
     */
    this.showLoadingScreen = function() {
        dom.loading_screen.style.display = 'block';
    };

    /**
     * @method hideLoadingScreen
     * hides the loading HTML div
     */
    this.hideLoadingScreen = function() {
        dom.loading_screen.style.display = 'none';
    };

    /**
     * @method showTitleScreen
     * displays the title HTML div and starts watching for the space bar being depressed
     */
    this.showTitleScreen = function() {
        dom.title_screen.style.display = 'block';
        race.init();
        this.watchKeyPress();
        this.startGameLoop();
    };

    /**
     * @method hideTitleScreen
     * hides the loading HTML div
     */
    this.hideTitleScreen = function() {
        dom.title_screen.style.display = 'none';
    };

    /**
     * @method showEndScreen
     * displays the end_screen HTML div, using css animations if available and draws the 
     * stats board on the canvas
     */
    this.showEndScreen = function(headline) {
        dom.end_frame.style.display = 'block';
        dom.end_frame.setAttribute('class', 'game visible');
        this.drawEndScreen(headline);
    };

    /**
     * @method hideEndScreen
     * clears the stats board from the canvas and hides the end_screen HTML div
     */
    this.hideEndScreen = function() {
        dom.end_frame.style.display = 'none';
        dom.end_frame.setAttribute('class', 'game');
        this.eraseEndScreen();
    };

    /**
     * @method eraseEndScreen
     * clears the stats board from the canvas
     */
    this.eraseEndScreen = function() {
        var endFrameContext = dom.end_frame.getContext('2d');
        endFrameContext.clearRect(0, 0, dom.end_frame.width, dom.end_frame.height);
    };

    /**
     * @method drawEndScreen
     * draws the stats board onto the canvas
     */
    this.drawEndScreen = function(headline) {
        var endFrameContext = dom.end_frame.getContext('2d');
        endFrameContext.clearRect(0, 0, dom.end_frame.width, dom.end_frame.height);

        // draw the rounded rectangle background
        var x = 100,
            y = 150,
            width = 400,
            height = 300,
            radius = 30;
        endFrameContext.beginPath();
        endFrameContext.moveTo(x + radius, y);
        endFrameContext.lineTo(x + width - radius, y);
        endFrameContext.quadraticCurveTo(x + width, y, x + width, y + radius);
        endFrameContext.lineTo(x + width, y + height - radius);
        endFrameContext.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        endFrameContext.lineTo(x + radius, y + height);
        endFrameContext.quadraticCurveTo(x, y + height, x, y + height - radius);
        endFrameContext.lineTo(x, y + radius);
        endFrameContext.quadraticCurveTo(x, y, x + radius, y);
        endFrameContext.closePath();
        endFrameContext.strokeStyle = '#000';
        endFrameContext.lineWidth = 5;
        endFrameContext.stroke();
        endFrameContext.fillStyle = '#fff';
        endFrameContext.fill();

        // draw the headline
        endFrameContext.textAlign = 'center';
        endFrameContext.font = "60px Verdana";
        endFrameContext.fillStyle = '#c40816';
        endFrameContext.fillText(headline, dom.end_frame.width / 2, 215);

        // draw the total score
        endFrameContext.textAlign = 'right';
        endFrameContext.font = "18px Verdana";
        endFrameContext.fillStyle = '#000';
        endFrameContext.fillText(race.score.points, dom.end_frame.width / 2 - 20, 250);
        endFrameContext.textAlign = 'left';
        endFrameContext.fillText('Total Points', dom.end_frame.width / 2, 250);

        // draw the cars_passed
        endFrameContext.textAlign = 'right';
        endFrameContext.font = "14px Verdana";
        endFrameContext.fillStyle = '#000';
        endFrameContext.fillText(race.score.cars_passed, dom.end_frame.width / 2 - 20, 290);
        endFrameContext.textAlign = 'left';
        endFrameContext.fillText('Passed', dom.end_frame.width / 2 + 32, 290);
        endFrameContext.drawImage(assets['npc-blue'], dom.end_frame.width / 2 + 7, 268, 18, 32);

        // draw the copper coins collected
        endFrameContext.textAlign = 'right';
        endFrameContext.font = "14px Verdana";
        endFrameContext.fillStyle = '#000';
        endFrameContext.fillText(race.score.copper_coins_collected, dom.end_frame.width / 2 - 20, 325);
        endFrameContext.textAlign = 'left';
        endFrameContext.fillText('Collected', dom.end_frame.width / 2 + 32, 325);
        endFrameContext.drawImage(assets['coin_copper'], 4 * 32, 0, 32, 32, dom.end_frame.width / 2, 307, 32, 32);

        // draw the silver coins collected
        endFrameContext.textAlign = 'right';
        endFrameContext.font = "14px Verdana";
        endFrameContext.fillStyle = '#000';
        endFrameContext.fillText(race.score.silver_coins_collected, dom.end_frame.width / 2 - 20, 360);
        endFrameContext.textAlign = 'left';
        endFrameContext.fillText('Collected', dom.end_frame.width / 2 + 32, 360);
        endFrameContext.drawImage(assets['coin_silver'], 4 * 32, 0, 32, 32, dom.end_frame.width / 2, 342, 32, 32);

        // draw the gold coins collected
        endFrameContext.textAlign = 'right';
        endFrameContext.font = "14px Verdana";
        endFrameContext.fillStyle = '#000';
        endFrameContext.fillText(race.score.gold_coins_collected, dom.end_frame.width / 2 - 20, 395);
        endFrameContext.textAlign = 'left';
        endFrameContext.fillText('Collected', dom.end_frame.width / 2 + 32, 395);
        endFrameContext.drawImage(assets['coin_gold'], 4 * 32, 0, 32, 32, dom.end_frame.width / 2, 377, 32, 32);

        // draw the play again text
        endFrameContext.textAlign = 'center';
        endFrameContext.font = "14px Verdana";
        endFrameContext.fillStyle = '#c40816';
        endFrameContext.fillText('Press the space bar to try again!', dom.end_frame.width / 2, 435);

    };

    /**
     * @method loadAssets
     * loads all of the game assets and fires off the callback when all assets are loaded
     * @param callback {Function} the function to call once all assets are loaded
     * @param arg {Mixed} the parameter to pass to the callback [type depends on the callback]
     */
    this.loadAssets = function(callback, arg) {
        var names = ['track', 'player-car', 'npc-yellow', 'npc-green', 'npc-blue', 'coin_copper', 'coin_silver', 'coin_gold'],
            ext = '.svg',
            length = names.length,
            loaded = 0;

        function imageLoaded() {
            loaded++;
            if (loaded === length) {
                if (callback) {
                    if (arg) {
                        callback(arg);
                    } else {
                        callback();
                    }
                }
            }
        }

        for (var i = 0; i < names.length; i++) {
            var prop_name = names[i];
            assets[prop_name] = new Image();
            if (navigator.userAgent.indexOf('Firefox') !== -1 || prop_name === 'coin_copper' || prop_name === 'coin_silver' || prop_name === 'coin_gold') {
                ext = '.png';
            }
            assets[prop_name].src = './files/img/' + prop_name + ext;
            assets[prop_name].onload = function() {
                imageLoaded();
            };
        }
    };

    /**
     * @method watchKeyPress
     * stars listening for keypresses, setting the various keyStatus values to true/false accordingly
     */
    this.watchKeyPress = function() {
        document.onkeydown = function(e) {
            var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
            if (key_codes[keyCode]) {
                e.preventDefault();
                self.keyStatus[key_codes[keyCode]] = true;
            }
        };
        document.onkeyup = function(e) {
            var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
            if (key_codes[keyCode]) {
                e.preventDefault();
                self.keyStatus[key_codes[keyCode]] = false;
            }
        };
    };

    /**
     * @method stopWatchingKeyPress
     * resets the keypress listeners
     */
    this.stopWatchingKeyPress = function() {
        document.onkeydown = null;
        document.onkeyup = null;
    };

    /**
     * @method resetGame
     * starts the game over
     */
    this.resetGame = function() {
        race.init();
        this.hideEndScreen();
    };

    /**
     * @method startGameLoop
     * starts the loop and handles the various interactions based on current application state
     */
    this.startGameLoop = function() {
        game.loop = gameloop(function(dt) {
            if (self.currentState === TITLE_STATE && self.keyStatus.space) {
                self.switchState(PLAY_STATE);
            }
            if (self.currentState === PLAY_STATE && self.keyStatus.up) {
                race.speedUp();
            }
            if (self.currentState === PLAY_STATE && self.keyStatus.down) {
                race.slowDown();
            }
            if (self.currentState === PLAY_STATE) {
                var countDownValue = race.currentCountDown();
                race.updateCountDownTimer(countDownValue);
                race.updateScore();
                if (countDownValue > 0) {
                    if (!race.detectEnemyCollision()) {
                        if (race.detectCoinCollision()) {
                            race.handleCoinCollision();
                        }
                        for (var i = race.entities.tracks.length - 1; i >= 0; i--) {
                            race.entities.tracks[i].draw();
                        }
                        for (var i = race.entities.enemies.length - 1; i >= 0; i--) {
                            race.entities.enemies[i].draw();
                        }
                        race.entities.player.draw();
                        race.entities.coin.draw();
                    } else {
                        statesManager.switchState(CRASH_STATE);
                    }
                } else {
                    statesManager.switchState(FINISHED_STATE);
                }
            }
            if ((self.currentState === CRASH_STATE || self.currentState === FINISHED_STATE) && self.keyStatus.space) {
                self.resetGame();
                self.switchState(PLAY_STATE);
            }
        });
    };

    /**
     * @method startGamePlay
     * sets up the countdown timer and sets a starting speed for the race
     */
    this.startGamePlay = function() {
        race.currentCountDown = race.createCountDown(60000);
        race.speed = 10;
        race.updateSpeedometer();
    };
};


/**
 * initGame function
 * starts the game off by setting the current state to the loading screen
 */
var initGame = function() {
    statesManager.switchState(LOADING_STATE);
};

/**
 * Finds the best animation cycle function based on browser feature and returns
 * a function to call every 16.6666 milliseconds (60FPS)
 * @param callback {Function} The callback function to run every iteration. callback
 *                            will need to accept one argument which is the time between 
 *                            iterations in milliseconds.
 * @return gameloop {Function}
 */
var gameloop = (function() {
    var reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(function () { callback(); }, 1000 / 60);
    };
    return function(callback) {
        var lastUpdate = +new Date();
        (function loop() {
            callback(((+new Date()) - lastUpdate));
            reqAnimFrame(loop);
            lastUpdate = +new Date();
        }());
    };
}());

// initialize the game
initGame();