const SNAKE_SETTINGS = [
    {
        tiles: {
            "head": {src: "files/img/block-rozha.png"},
            "part": {src: "files/img/block-main-slice.png"},
            "part_r": {src: "files/img/block-povorot.png"},
            "tail": {src: "files/img/block-hvost.png"}
        },
        "shadowColors" :["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]
    },
    {"color": "#00e0b7", "eyeColor": "#032e3e", "shadowColors" :["rgba(36, 218, 195, 0.5)", "rgba(0, 109, 126, 0.75)"]},
    {"color": "#f57ba3", "eyeColor": "#340202", "shadowColors" :["rgba(245, 123, 163, 0.5)", "rgba(158, 0, 52, 0.75)"]},
    {"color": "#ffb950", "eyeColor": "#2c1307", "shadowColors" :["rgba(255, 185, 80, 0.5)", "rgba(182, 108, 0, 0.75)"]}
];

//grass, #340202 pink, #2c1307 yellow, #032e3e cyan

let snake_setting_id = 0;

let getLocalsMessage = (messagename) => { return chrome.i18n.getMessage(messagename); }

function GUILocalization(){
    document.querySelector('#new_game').textContent = getLocalsMessage('appLabelNewGame');
    document.querySelector('#score').textContent = getLocalsMessage('appLabelScore');
    document.querySelector('#highScore').textContent = getLocalsMessage('appLabelHighScore');
    document.querySelector('#lesson_pause').textContent = ' - ' + getLocalsMessage('lessonPause');
    document.querySelector('#lesson_controls').textContent = ' - ' + getLocalsMessage('lessonControls');
}
GUILocalization();
let Storage = {
    setValue : (key, value) => { localStorage[key] = JSON.stringify(value); },
    getValue : (key) => {
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
    constructor(_msg){
        super();
        this.name = 'StorageError';
        this.message = _msg || 'Storage Error';
        this.stack = (new Error()).stack;
    }
}

/**
 * ExceptionHandler
 * @param   object  e   Error Object
 */
function ExceptionHandler(e){
    if (e instanceof StorageError) {
        console.log(`${e.name} : ${e.message}`);
    } else {
        console.log(e);
    }
}
/**
 * MAIN GAME OBJECT
 *
 * Everything associated with the snake game should be encapsulated within
 * this function to avoid pollution of the global namespace
 */
function SnakeJS(parentElement, config){

    var utilities = new Utilities();
    var pause_btn = document.querySelector(".pause-btn");

    var defaultConfig = {
        autoInit : true,                    // Game inits automagically
        gridWidth : 30,                     // Width of the game grid
        gridHeight : 20,                    // Height of the game grid
        frameInterval : 150,                // Milliseconds between frames (@todo change to speed?)
        pointSize : 16,                     // Size of one grid point
        backgroundColor : "white",          // Color of the background. CSS3 color values
        snakeColor : "#00e0b7",             // Color of the snake
        snakeEyeColor : "#340202",          // Color of the snake's eye
        candyColor : "#b11c1c",             // Color of the candy
        shrinkingCandyColor : "#199C2C",    // Color of the special candy that shrinks
        scoreBoardColor : "#c0c96b",        // Color of the score board
        scoreTextColor : "#4b4312",         // Color of the score numbers on the score board
        collisionTolerance : 1              // Still frames before collision. More = easier
    };

    // Merge user config with default config
    var config = config ? utilities.mergeObjects(defaultConfig, config) : defaultConfig ;

    var constants = {
        DIRECTION_UP : 1,
        DIRECTION_RIGHT : 2,
        DIRECTION_DOWN : -1,
        DIRECTION_LEFT : -2,
        DEFAULT_DIRECTION : 2,
        STATE_READY : 1,
        STATE_PAUSED : 2,
        STATE_PLAYING : 3,
        STATE_GAME_OVER : 4,
        INITIAL_SNAKE_GROWTH_LEFT : 6,
        SCOREBOARD_HEIGHT : 0,
        CANDY_REGULAR : 1,
        CANDY_MASSIVE : 2,
        CANDY_SHRINKING : 3
    };

    var engine = new Engine(parentElement);

    /**
     * These methods below (init, pause, resume) are publically accessible.
     */
    this.init = function(){
        if (Storage.getValue('alive') === true) {
            engine.initSavedGame();
        } else {
            engine.initGame();
        }
    };

    this.pause = function(){
        engine.pauseGame();
    };

    this.forceGameOver = function(){
        engine.forceGameOver();
    };

    this.resume = function(){
        engine.resume();
    };

    this.getHighScore = function(){
        return engine.getHighScore();
    };

    /**
     * GAME MODEL OBJECT
     *
     * This object is doing the game logic, frame management etc.
     */
    function Engine(parentElement) {
        
        var snake,                  // The snake itself
            candy,                  // The candy which the snake eats
            view,                   // The view object which draws the points to screen
            inputInterface,         // Responsible for handling input from the user
            grid,                   // The grid object
            currentState,           // Possible values are found in constants.STATE_*
            frameIntervalId,        // The ID of the interval timer
            score,                  // Player score
            highScore,              // Player highScore
            collisionFramesLeft;    // If the snake collides, how many frames are left until death

        var changeState = function(new_state) {
            currentState = new_state;
            
            if (currentState == constants.STATE_PAUSED && !pause_btn.classList.contains('pause')) {
                pause_btn.classList.add('pause');
            } else if (pause_btn.classList.contains('pause')) {
                pause_btn.classList.remove('pause');
            }
        }
        
        this.initGame = function(){
            view = new View(parentElement, config.backgroundColor);
            inputInterface = new InputInterface(this.pauseGame, this.resumeGame, startMoving);

            snake = new Snake();
            grid = new Grid(config.gridWidth, config.gridHeight);
            score = 0;
            highScore = Storage.getValue('highScore') ? Storage.getValue('highScore') : score;

            // Create snake body
            snake.points.push(randomPoint(grid));
            snake.growthLeft = constants.INITIAL_SNAKE_GROWTH_LEFT;

            candy = randomCandy();

            view.initPlayField();
            drawCurrentScene();
            inputInterface.startListening();
            changeState(constants.STATE_READY);
        };

        this.initSavedGame = function(){
            view = new View(parentElement, config.backgroundColor);
            inputInterface = new InputInterface(this.pauseGame, this.resumeGame, startMoving);

            //_direction = constants.DEFAULT_DIRECTION, _points = [], _growthLeft = 0, _alive = true
            var storage_direction = Storage.getValue('direction') ? Storage.getValue('direction') : constants.DEFAULT_DIRECTION;
            var storage_points = Storage.getValue('points') ? Storage.getValue('points') : [];
            var storage_growthLeft = Storage.getValue('growthLeft') ? Storage.getValue('growthLeft') : 0;
            var storage_alive = Storage.getValue('alive') ? Storage.getValue('alive') : true;
            snake = new Snake(storage_direction, storage_points, storage_growthLeft, storage_alive);
            grid = new Grid(config.gridWidth, config.gridHeight);
            //score
            score = Storage.getValue('score') ? Storage.getValue('score') : 0;
            highScore = Storage.getValue('highScore') ? Storage.getValue('highScore') : score;

            // point, type
            var storage_candy_point = Storage.getValue('candy_point') ? Storage.getValue('candy_point') : false;
            var storage_candy_type = Storage.getValue('candy_type') ? Storage.getValue('candy_type') : false;
            if (!storage_candy_type && !storage_candy_point) {
                candy = randomCandy();
            } else {
                candy = new Candy(new Point(storage_candy_point.left, storage_candy_point.top), storage_candy_type);
            }
            view.initPlayField();
            drawCurrentScene();
            inputInterface.startListening();
            changeState(constants.STATE_READY);
        };

        this.pauseGame = function(){
            if (currentState === constants.STATE_PLAYING) {
                clearInterval(frameIntervalId);
                changeState(constants.STATE_PAUSED);
                return true;
            }
            return false;
        };

        this.resumeGame = function(){
            if (currentState === constants.STATE_PAUSED) {
                frameIntervalId && (clearInterval(frameIntervalId), frameIntervalId = null);
                frameIntervalId = setInterval(() => { nextFrame(); }, config.frameInterval);
                changeState(constants.STATE_PLAYING);
            }
        };

        this.forceGameOver = function(){
            Storage.setValue('growthLeft', constants.INITIAL_SNAKE_GROWTH_LEFT);
            Storage.setValue('points', [snake.points[0]]);
            gameOver();
        };

        this.getHighScore = function(){
            return highScore;
        };

        /**
         * Private methods below
         */

        // Play a game over scene and restart the game
        var gameOver = function(){
            try {SocialModuleInstance && SocialModuleInstance.showSocial();} catch(e) {}
            changeState(constants.STATE_GAME_OVER);
            clearInterval(frameIntervalId);

            // Remove one point from the snakes tail and recurse with a timeout
            var removeTail = function(){
                if (snake.points.length > 1) {
                    snake.points.pop();
                    drawCurrentScene();
                    setTimeout(() => { removeTail();}, config.frameInterval/4);
                }
                else
                    resurrect();
            };

            var resurrect = function (){
                score = 0;
                snake.growthLeft = constants.INITIAL_SNAKE_GROWTH_LEFT;
                snake.alive = true;
                drawCurrentScene();
                changeState(constants.STATE_READY);
            };

            removeTail();
        };

        var startMoving = function(){
            if (currentState === constants.STATE_READY) {
                frameIntervalId && (clearInterval(frameIntervalId), frameIntervalId = null);
                frameIntervalId = setInterval(() => { nextFrame(); }, config.frameInterval);
                changeState(constants.STATE_PLAYING);
            }
        };

        // Calculates what the next frame will be like and draws it.
        var nextFrame = function(){

            // If the snake can't be moved in the desired direction due to collision
            if (!moveSnake(inputInterface.lastDirection())) {
                if (collisionFramesLeft > 0) {
                    // Survives for a little longer
                    collisionFramesLeft--;
                    return;
                }
                else {
                    // Now it's dead
                    snake.alive = false;
                    // Draw the dead snake
                    drawCurrentScene();
                    // And play game over scene
                    gameOver();
                    Storage.setValue('alive', false);
                    return;
                }
            }
            // It can move.
            else
                collisionFramesLeft = config.collisionTolerance;

            if (!candy.age())
                    // The candy disappeared by ageing
                    candy = randomCandy();

            // If the snake hits a candy
            if(candy.point.collidesWith(snake.points[0])) {
                eatCandy();
                candy = randomCandy();
            }
            Storage.setValue('alive', snake.alive);
            Storage.setValue('direction', snake.direction);
            Storage.setValue('growthLeft', snake.growthLeft);
            Storage.setValue('points', snake.points);
            Storage.setValue('score', score);
            Storage.setValue('candy_type', candy.type);
            Storage.setValue('candy_point', candy.point);
            drawCurrentScene();
        };

        var drawCurrentScene = function() {
            // Clear the view to make room for a new frame
            view.clear();
            // Draw the objects to the screen
            view.drawSnake(snake);//config.snakeColor);
            view.drawCandy(candy);
            view.drawScore(score, highScore);
        };

        // Move the snake. Automatically handles self collision and walking through walls
        var moveSnake = function(desiredDirection){
            var head = snake.points[0];

            // The direction the snake will move in this frame
            var newDirection = actualDirection(desiredDirection || constants.DEFAULT_DIRECTION);

            var newHead = movePoint(head, newDirection);

            if (!insideGrid(newHead, grid))
                shiftPointIntoGrid(newHead, grid);

            if (snake.collidesWith(newHead, true)) {
                // Can't move. Collides with itself
                return false;
            }

            snake.direction = newDirection;
            snake.points.unshift(newHead);

            if (snake.growthLeft >= 1)
                snake.growthLeft--;
            else
                snake.points.pop();
            
            return true;
        };

        var eatCandy = function(){
            score += candy.score;
            highScore = Math.max(score, highScore);
            Storage.setValue('highScore', highScore);
            snake.growthLeft += candy.calories;
        };

        var randomCandy = function() {
            // Find a new position for the candy, and make sure it's not inside the snake
            do {
                var newCandyPoint = randomPoint(grid);
            } while(snake.collidesWith(newCandyPoint));
            // Gives a float number between 0 and 1
            var probabilitySeed = Math.random();
            if (probabilitySeed < 0.75)
                var newType = constants.CANDY_REGULAR;
            else if (probabilitySeed < 0.95)
                var newType = constants.CANDY_MASSIVE;
            else
                var newType = constants.CANDY_SHRINKING;
            return new Candy(newCandyPoint, newType);
        };

        // Get the direction which the snake will go this frame
        // The desired direction is usually provided by keyboard input
        var actualDirection = function(desiredDirection){
            if (snake.points.length === 1)
                return desiredDirection;
            else if (utilities.oppositeDirections(snake.direction, desiredDirection)) {
                // Continue moving in the snake's current direction
                // ignoring the player
                return snake.direction;
            }
            else {
                // Obey the player and move in that direction
                return desiredDirection;
            }
        };

        // Take a point (oldPoint), "move" it in any direction (direction) and
        // return a new point (newPoint) which corresponds to the change
        // Does not care about borders, candy or walls. Just shifting position.
        var movePoint = function(oldPoint, direction){
            var newPoint;
            with (constants) {
                switch (direction) {
                case DIRECTION_LEFT:
                    newPoint = new Point(oldPoint.left-1, oldPoint.top);
                    break;
                case DIRECTION_UP:
                    newPoint = new Point(oldPoint.left, oldPoint.top-1);
                    break;
                case DIRECTION_RIGHT:
                    newPoint = new Point(oldPoint.left+1, oldPoint.top);
                    break;
                case DIRECTION_DOWN:
                    newPoint = new Point(oldPoint.left, oldPoint.top+1);
                    break;
                }
            }
            return newPoint;
        };

        // Shifts the points position so that it it is kept within the grid
        // making it possible to "go thru" walls
        var shiftPointIntoGrid = function(point, grid){
            point.left = shiftIntoRange(point.left, grid.width);
            point.top = shiftIntoRange(point.top, grid.height);
            return point;
        };

        // Helper function for shiftPointIntoGrid
        // E.g. if number=23, range=10, returns 3
        // E.g.2 if nubmer = -1, range=10, returns 9
        var shiftIntoRange = function(number, range) {
            var shiftedNumber, steps;
            if (utilities.sign(number) == 1){
                steps = Math.floor(number/range);
                shiftedNumber = number - (range * steps);
            }
            else if (utilities.sign(number) == -1){
                steps = Math.floor(Math.abs(number)/range) + 1;
                shiftedNumber = number + (range * steps);
            }
            else {
                shiftedNumber = number;
            }
            return shiftedNumber;
        };

        // Check if a specific point is inside the grid
        // Returns true if inside, false otherwise
        var insideGrid = function(point, grid){
            if (point.left < 0 || point.top < 0 ||
                    point.left >= grid.width || point.top >= grid.height){
                return false;
            }
            else {
                return true;
            }
        };

        // Returns a point object with randomized coordinates within the grid
        var randomPoint = function(grid){
            var left = utilities.randomInteger(0, grid.width - 1);
            var top = utilities.randomInteger(0, grid.height - 1);
            var point = new Point(left, top);
            return point;
        };
    }

    /**
     * GRID OBJECT
     *
     * This object holds the properties of the grid.
     */
    function Grid(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * SNAKE OBJECT
     *
     * The snake itself...
     */
    function Snake(_direction = constants.DEFAULT_DIRECTION, _points = [], _growthLeft = 0, _alive = true) {
        this.direction = _direction;
        this.points = _points;
        this.growthLeft = _growthLeft;
        this.alive = _alive;

        // Check if any of this objects points collides with an external point
        // Returns true if any collision occurs, false otherwise
        // @param simulateMovement boolean Simulates the removal of the end point
        // This addresses a bug where the snake couldn't move to a point which
        // is not currently free, but will be in the next frame
        this.collidesWith = function(point, simulateMovement){
            if (simulateMovement && this.growthLeft === 0)
                // Now th
                range = this.points.length - 1;
            else
                range = this.points.length;
            for (var i = 0; i < range; i++) {
                if (point.collidesWith(this.points[i]))
                    return true;
            }
            return false;
        };
    }

    /**
     * POINT OBJECT
     *
     * A point has a place in the grid and can be passed
     * to View for drawing.
     */
    function Point(left, top) {
        this.left = left;
        this.top = top;

        // Check if this point collides with another
        this.collidesWith = function(otherPoint){
            if (otherPoint.left == this.left && otherPoint.top == this.top)
                return true;
            else
                return false;
        };
    }

    /**
     * CANDY OBJECT
     * 
     * @param point The point object which determines the position of the candy
     * @param type Any type defined in constants.CANDY_*
     */
    function Candy(point, type){
        this.point = point,
        this.type = type,
        this.score,         // Increment in score when eaten by snake
        this.calories,      // How much growth the snake gains if it eats this candy
        this.radius,        // Radius of the candy, relative to config.pointSize
        this.color,         // Color of the candy
        this.decrement,     // If greater than 0, the radius of the candy will shrink...
        this.minRadius;     // until it reaches this minimum value. Then it will disappear

        switch (type) {
        case constants.CANDY_REGULAR:
            this.score = 5;
            this.calories = 3;
            this.radius = 0.3;
            this.color = config.candyColor;
            break;
        case constants.CANDY_MASSIVE:
            this.score = 15;
            this.calories = 5;
            this.radius = 0.45;
            this.color = config.candyColor;
            break;
        case constants.CANDY_SHRINKING:
            this.score = 50;
            this.calories = 0;
            this.radius = 0.45;
            this.color = config.shrinkingCandyColor;
            this.decrement = 0.008;
            this.minRadius = 0.05;
            break;
        }

        // Shrinks a CANDY_SHRINKING candy. Returns false if candy is below minRadius
        this.age = function(){
            // Currently only CANDY_SHRINKING reacts to ageing
            if (this.type === constants.CANDY_SHRINKING) {
                this.radius -= this.decrement;
                if (this.radius < this.minRadius)
                    return false;
                else
                    return true;
            }
            else
                return true;
        };
    };
    
    /**
     * UTILITIES OBJECT
     *
     * Provides some utility methods which don't fit anywhere else.
     */
    function Utilities() {

        // Takes a number and returns the sign of it.
        // E.g. -56 -> -1, 57 -> 1, 0 -> 0
        this.sign = function(number){
            if(number > 0)
                return 1;
            else if (number < 0)
                return -1;
            else if (number === 0)
                return 0;
            else
                return undefined;
        };

        // Helper function to find if two directions are in opposite to each other
        // Returns true if the directions are in opposite to each other, false otherwise
        this.oppositeDirections = function(direction1, direction2){
    
            // @see Declaration of constants to understand.
            // E.g. UP is defined as 1 while down is defined as -1
            if (Math.abs(direction1) == Math.abs(direction2) &&
                    this.sign(direction1 * direction2) == -1) {
                return true;
            }
            else {
                return false;
            }
        };

        // Merge two flat objects and return the modified object.
        this.mergeObjects = function mergeObjects(slave, master){
            var merged = {};
            for (key in slave) {
                if (typeof master[key] === "undefined")
                    merged[key] = slave[key];
                else
                    merged[key] = master[key];
            }
            return merged;
        };

        // Returns an integer between min and max, including both min and max
        this.randomInteger = function(min, max){
            var randomNumber = min + Math.floor(Math.random() * (max + 1));
            return randomNumber;
        };
    }

    /**
     * VIEW OBJECT
     *
     * This object is responsible for drawing the objects to the screen.
     * It uses the HTML5 Canvas element for drawing.
     */
    function View(parentElement, backgroundColor) {
        var playField,          // The DOM <canvas> element
            ctx,                // The canvas context
            snakeThickness;     // The thickness of the snake in pixels

        this.initPlayField = function(){
            snakeThickness = length(0.9);

            playField = document.querySelector('#snake-js');//document.createElement("canvas");
            //playField.setAttribute("id", "snake-js");
            //playField.setAttribute("class", "game_field");
            playField.setAttribute("width", config.gridWidth * config.pointSize);
            playField.setAttribute("height", config.gridHeight * config.pointSize + constants.SCOREBOARD_HEIGHT);
            //parentElement.appendChild(playField);
            ctx = playField.getContext("2d");
            // Translate the coordinates so that we don't need to care about the scoreboard
            // when we draw all the other stuff
            ctx.translate(0, constants.SCOREBOARD_HEIGHT);
        };

        // Draw the snake to screen
        this.drawSnake = function(snake){

            // If there is only one point
            if (snake.points.length === 1 && snake_setting_id != 0) {
                var position = getPointPivotPosition(snake.points[0]);
                ctx.fillStyle = SNAKE_SETTINGS[snake_setting_id].color;
                ctx.beginPath();
                ctx.shadowColor = SNAKE_SETTINGS[snake_setting_id].shadowColors[0];
                ctx.shadowBlur = 50;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.arc(position.left, position.top, snakeThickness/2, 0, 2*Math.PI, false);
                ctx.fill();
            }
            else if (snake_setting_id != 0) {
                // Prepare drawing
                ctx.strokeStyle = SNAKE_SETTINGS[snake_setting_id].color;
                ctx.lineWidth = snakeThickness;
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                
                // Bein path drawing.
                ctx.shadowColor = SNAKE_SETTINGS[snake_setting_id].shadowColors[0];
                ctx.shadowBlur = 50;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.beginPath();
                // Loop over the points, beginning with the head
                for (var i = 0; i < snake.points.length; i++) {
    
                    // Short name for the point we're looking at now
                    var currentPoint = snake.points[i];
    
                    // If we're looking at the head
                    if (i === 0) {
                        // The position of this point in screen pixels
                        var currentPointPosition = getPointPivotPosition(currentPoint);
                        // Don't draw anything, just move the "pencil" to the position of the head
                        ctx.moveTo(currentPointPosition.left, currentPointPosition.top);
                    }
                    // If we're looking at any other point
                    else {
                        // Short name to the previous point (which we looked at in the last iteration)
                        var prevPoint = snake.points[i-1];
    
                        // If these points are next to each other (Snake did NOT go through the wall here)
                        if(Math.abs(prevPoint.left - currentPoint.left) <= 1 && Math.abs(prevPoint.top - currentPoint.top) <= 1){
                            // The position of this point in screen pixels
                            var currentPointPosition = getPointPivotPosition(currentPoint);
                            // Draw pencil from the position of the "pencil" to this point
                            ctx.lineTo(currentPointPosition.left, currentPointPosition.top);
                        }
                        // If these points are far away from each other (Snake went through wall here)
                        else {
                            // Connect these points together. This method will simulate wall entrance/exit if necessary
                            connectWallPoints(prevPoint, currentPoint);
                        }
                    }
                }
                // Now draw the snake to screen
                ctx.stroke();
            } else {
                
                function get_angle(dir) {
                    let angle = 0;
                    switch (dir) {
                        case constants.DIRECTION_LEFT:
                            angle = Math.PI/2;
                            break;
                        case constants.DIRECTION_RIGHT:
                            angle = 3 * Math.PI/2;
                            break;
                        case constants.DIRECTION_UP:
                            angle = Math.PI;
                            break;
                        case constants.DIRECTION_DOWN:
                            angle = 0;
                            break;
                    }
                    return angle;
                }
                
                for (let i = 0; i < snake.points.length; i++) {
                    let currentPoint = snake.points[i];
                    let currentPointPosition = getPointPivotPosition(currentPoint);
                    let img;
                    let angle = 0;
    
                    if (i === 0) {
                        img = SNAKE_SETTINGS[snake_setting_id].tiles.head.img;
                        angle = get_angle(snake.direction);
                    }
                    else {
                        let prevPoint = snake.points[i - 1];
                        let nextPoint = snake.points[i + 1];
                        
                        if (currentPoint.left < prevPoint.left) {
                            angle = get_angle(constants.DIRECTION_RIGHT);
                        }
                        else if (currentPoint.left > prevPoint.left) {
                            angle = get_angle(constants.DIRECTION_LEFT);
                        }
                        else if (currentPoint.top < prevPoint.top) {
                            angle = get_angle(constants.DIRECTION_DOWN);
                        }
                        else if (currentPoint.top > prevPoint.top) {
                            angle = get_angle(constants.DIRECTION_UP);
                        }
                        
                        if (i < snake.points.length - 1) {
                            if (prevPoint.left == nextPoint.left || prevPoint.top == nextPoint.top) {
                                img = SNAKE_SETTINGS[snake_setting_id].tiles.part.img;
                            }
                            else {
                                img = SNAKE_SETTINGS[snake_setting_id].tiles.part_r.img;
                                if ((nextPoint.left < prevPoint.left && nextPoint.top < prevPoint.top && currentPoint.top == prevPoint.top) || 
                                   (nextPoint.left < prevPoint.left && nextPoint.top > prevPoint.top && currentPoint.top != prevPoint.top) ||
                                   (nextPoint.left > prevPoint.left && nextPoint.top < prevPoint.top && currentPoint.top != prevPoint.top) || 
                                   (nextPoint.left > prevPoint.left && nextPoint.top > prevPoint.top && currentPoint.top == prevPoint.top)) {
                                    angle -= Math.PI / 2;
                                }
                            }
                        }
                        else {
                            img = SNAKE_SETTINGS[snake_setting_id].tiles.tail.img;
                        }
                    }
                    
                    ctx.shadowColor = SNAKE_SETTINGS[snake_setting_id].shadowColors[0];
                    ctx.save();
                    currentPointPosition.left -= img.width / 2;
                    currentPointPosition.top -= img.height / 2;
                    ctx.translate(currentPointPosition.left + img.width / 2, currentPointPosition.top + img.height / 2);
                    ctx.rotate(angle);
                    ctx.drawImage(img, -img.width / 2, -img.height / 2);
                    ctx.restore();
                }
            }

            if (snake_setting_id != 0) {
                // Draw the eye of the snake
                drawEye(snake, snake.direction);
            }
        };

        this.drawCandy = function(candy){

            ctx.fillStyle = candy.color;

            var position = getPointPivotPosition(candy.point);

            ctx.beginPath();

            ctx.arc(position.left, position.top, length(candy.radius), 0, Math.PI*2, false);
            ctx.fill();
        };

        this.clear = function(color) {
            //ctx.fillStyle = color || backgroundColor;
            ctx.clearRect(0, 0,
                    config.gridWidth * config.pointSize,
                    config.gridHeight * config.pointSize);
        };

        this.drawScore = function(score, highScore){
            // Translate to 0, 0 to draw from origo
            /*
            ctx.translate(0, -1 * constants.SCOREBOARD_HEIGHT);

            var bottomMargin = 5;
            var horizontalMargin = 4;

            // Draw the score board
            ctx.fillStyle = config.scoreBoardColor;
            ctx.fillRect(0, 0, config.gridWidth * config.pointSize, constants.SCOREBOARD_HEIGHT);

            // Prepare drawing text
            ctx.fillStyle = config.scoreTextColor;
            ctx.font = "bold 16px 'Courier new', monospace";

            // Draw score to the upper right corner
            ctx.textAlign = "right";
            ctx.fillText(score, config.gridWidth * config.pointSize - horizontalMargin, constants.SCOREBOARD_HEIGHT - bottomMargin);

            // Draw high score to the upper left corner
            ctx.textAlign = "left";
            ctx.fillText(highScore, horizontalMargin, constants.SCOREBOARD_HEIGHT - bottomMargin);

            // Translate back
            ctx.translate(0, constants.SCOREBOARD_HEIGHT);*/
            document.querySelector('.score > .stats-num').textContent = score;
            document.querySelector('.record > .stats-num').textContent = highScore;
        };

        // Draw the eye of the snake
        var drawEye = function(snake) {
            var head = snake.points[0];
            var headPosition = getPointPivotPosition(head);

            // Imagine the snake going from right to left.
            // These values determine how much to the left and top the eye's pivot point is adjusted.
            var offsetLeft = 2.5; //length(0.1); //0.125
            var offsetTop = 2.5; //length(0.1);   //0.15
            var radius = config.pointSize/2 - Math.max(offsetLeft, offsetTop);
            // Place the eye's pivot point differentely depending on which direction the snake moves
            /*switch (snake.direction){
            case constants.DIRECTION_LEFT:
                headPosition.left -= offsetLeft;
                headPosition.top -= offsetTop;
                break;
            case constants.DIRECTION_RIGHT:
                headPosition.left += offsetLeft;
                headPosition.top -= offsetTop;
                break;
            case constants.DIRECTION_UP:
                headPosition.left -= offsetTop;
                headPosition.top -= offsetLeft;
                break;
            case constants.DIRECTION_DOWN:
                headPosition.left += offsetTop;
                headPosition.top += offsetLeft;
                break;
            }*/
            var angle = 0;
            var coords = [];
            switch (snake.direction){
            case constants.DIRECTION_LEFT:
                angle = Math.PI/2;
                coords = [[headPosition.left, headPosition.top - radius],[headPosition.left + radius + offsetLeft, headPosition.top],[headPosition.left, headPosition.top + radius]];
                break;
            case constants.DIRECTION_RIGHT:
                angle = 3 * Math.PI/2;
                coords = [[headPosition.left, headPosition.top - radius],[headPosition.left - radius - offsetLeft, headPosition.top],[headPosition.left, headPosition.top + radius]];
                break;
            case constants.DIRECTION_UP:
                angle = Math.PI;
                coords = [[headPosition.left - radius, headPosition.top],[headPosition.left, headPosition.top + radius + offsetTop],[headPosition.left + radius, headPosition.top]];
                break;
            case constants.DIRECTION_DOWN:
                angle = 0;
                coords = [[headPosition.left - radius, headPosition.top],[headPosition.left, headPosition.top - radius - offsetTop],[headPosition.left + radius, headPosition.top]];
                break;
            }
            // If the snake is still alive draw a circle
            if (snake.alive) {
                ctx.beginPath();
                ctx.fillStyle = SNAKE_SETTINGS[snake_setting_id].eyeColor;//config.snakeEyeColor;
                // Draw the circle
                ctx.moveTo(coords[0][0], coords[0][1]);
                ctx.lineTo(coords[1][0], coords[1][1]);
                ctx.lineTo(coords[2][0], coords[2][1]);
                ctx.arc(headPosition.left, headPosition.top, radius, angle, angle + Math.PI, false); //0.125
                // And fill it
                ctx.fill();
            }
            // If the snake is dead, draw a cross
            else {
                ctx.beginPath();
                ctx.strokeStyle = SNAKE_SETTINGS[snake_setting_id].eyeColor;//config.snakeEyeColor;
                ctx.lineWidth = 2;
                ctx.moveTo(headPosition.left - length(0.1), headPosition.top - length(0.1));
                ctx.lineTo(headPosition.left + length(0.1), headPosition.top + length(0.1));
                ctx.moveTo(headPosition.left + length(0.1), headPosition.top - length(0.1));
                ctx.lineTo(headPosition.left - length(0.1), headPosition.top + length(0.1));
                ctx.stroke();
            }
        };

        // Short name to scale a length relative to config.pointSize
        var length = function(value){
            return value * config.pointSize;
        };

        var getPointPivotPosition = function(point) {
            var position = {
                    left : point.left * length(1) + length(.5),
                    top : point.top * length(1) + length(.5)
            };
            return position;
        };

        // Connect two points in opposite sides of the grid. Makes lines like Snake went through the wall
        // Presumes that the "pencil" is moved to position of p1
        var connectWallPoints = function(p1, p2) {

            // The position of these points in screen pixels
            var p2Position = getPointPivotPosition(p2);

            // This holds -1 or 1 if points are separated horizontally, else 0
            var leftOffset = utilities.sign(p2.left - p1.left);
            // This holds -1 or 1 if points are separated vertically, else 0
            var topOffset = utilities.sign(p2.top - p1.top);

            // First let's look at p1
            // Create a fake end point outside the grid, next to p1
            var fakeEndPoint = new Point(p1.left - leftOffset, p1.top - topOffset);
            // And get the screen position
            var fakeEndPointPosition = getPointPivotPosition(fakeEndPoint);
            // End the current line (which was initially drawn outside this method) in this fake point
            ctx.lineTo(fakeEndPointPosition.left, fakeEndPointPosition.top);

            // Let's look at p2. Create a fakepoint again and get it's position...
            var fakeStartPoint = new Point(p2.left + leftOffset, p2.top + topOffset);
            var fakeStartPointPosition = getPointPivotPosition(fakeStartPoint);
            // ...But this time, first move the pencil (without making a line) to the fake point
            ctx.moveTo(fakeStartPointPosition.left, fakeStartPointPosition.top);
            // Then make a line to p2. Note that these lines are not drawn, since this method
            // only connects the lines, the drawing is handled outside this method
            ctx.lineTo(p2Position.left, p2Position.top);
        };
    }

    /**
     * INPUTINTERFACE OBJECT
     * 
     * Takes input from the user, typically key strokes to steer the snake but also window events
     * 
     * @param pauseFn A callback function to be executed when the window is blurred
     * @param resumeFn A callback function which executes when the window is in focus again
     * @param autoPlayFn A callback function which executes when any arrow key is pressed
     */
    function InputInterface(pauseFn, resumeFn, autoPlayFn){

        var arrowKeys = [37, 38, 39, 40],   // Key codes for the arrow keys on a keyboard
            listening = false,              // Listening right now for key strokes etc?
            lastDirection = null;           // Corresponds to the last arrow key pressed

        /**
         * Public methods below
         */

        this.lastDirection = function(){
            return lastDirection;
        };

        // Start listening for player events
        this.startListening = function(){
            if (!listening) {
                window.addEventListener("keydown", handleKeyDown, true);
                window.addEventListener("keypress", disableKeyPress, true);
                pause_btn.addEventListener("click", handlePauseBtnClick, true);
                listening = true;
            }
        };

        // Stop listening for events. Typically called at game end
        this.stopListening = function(){
            if (listening) {
                window.removeEventListener("keydown", handleKeyDown, true);
                window.removeEventListener("keypress", disableKeyPress, true);
                pause_btn.removeEventListener("click", handlePauseBtnClick, true);
                listening = false;
            }
        };

        /**
         * Private methods below
         */

        var handlePauseBtnClick = function(event) {
            pauseFn() || resumeFn();
            this.blur();
        };
      
        var handleKeyDown = function(event){
            // If the key pressed is an arrow key
            if (arrowKeys.indexOf(event.keyCode) >= 0) {
                handleArrowKeyPress(event);
            } else if (event.keyCode === 13) {
                pauseFn() || resumeFn(); 
            }
        };

        var disableKeyPress = function(event){
            // If the key pressed is an arrow key
            if (arrowKeys.indexOf(event.keyCode) >= 0) {
                event.preventDefault();
            }
        };

        var handleArrowKeyPress = function(event){
            with (constants) {
                switch (event.keyCode) {
                case 37:
                    lastDirection = DIRECTION_LEFT;
                    break;
                case 38:
                    lastDirection = DIRECTION_UP;
                    break;
                case 39:
                    lastDirection = DIRECTION_RIGHT;
                    break;
                case 40:
                    lastDirection = DIRECTION_DOWN;
                    break;
                }
            }
            // Arrow keys usually makes the browser window scroll. Prevent this evil behavior
            event.preventDefault();
            // Call the auto play function
            autoPlayFn();
        };
    }

    if (config.autoInit) {
        this.init();
    }
};


function loadResources(callback) {
    let counter = 0;
    
    function load_resource(resource) {
        let img = new Image();
        img.onload = img.onerror = function() {
            resource.img = img;
            counter--;
            if (counter <= 0) {
                callback();
            }
        }
        img.src = resource.src;
    }
    
    for (let i = 0; i < SNAKE_SETTINGS.length; i++) {
        if (SNAKE_SETTINGS[i].tiles) {
            for (let key in SNAKE_SETTINGS[i].tiles) {
                counter++;
                load_resource(SNAKE_SETTINGS[i].tiles[key]);
            }
        }
    }
}

// If you are using jQuery, use < $(document).ready(function(){ ... }) > instead
document.addEventListener("DOMContentLoaded", function(){
    // The DOM-element which will hold the playfield
    // If you are using jQuery, you can use < var element = $("#parent"); > instead
    var parentElement = document.getElementById("parent");

    // User defined settings overrides default settings.
    // See snake-js.js for all available options.
    var settings = {
            frameInterval : 120,
            backgroundColor : "#f3e698"
    };

    // Create the game object. The settings object is NOT required.
    // The parentElement however is required
    var game;
    loadResources(function() {
        game = new SnakeJS(parentElement, settings);
    });
    document.querySelector('#new_game').addEventListener('click', function(event) {
        this.blur();
        game.forceGameOver();
    });
}, true);

/**
 * switchClasses
 * @param   string      selector        DOM element selector
 * @param   array       removedClasses  array with class names to remove.   Example: remove--*, remove_this_class.  * means any non-space characters
 * @param   array       addedClasses    array with class names to add       Example: add_this_class
 * @param   int         selector_idx    idx of selector if selector isnt unique (default 0)
 *
 * @return  object      {"result":(boolean), "reason":(string)}
 * 
 * @example     switchClasses('.sudoku-square', [], ['sudoku-square--static']) 
 *              switchClasses('#typewriter', ['active'], ['typed'])
 */
function switchClasses(selector, removedClasses, addedClasses, selector_idx = 0) {
    let targets = document.querySelectorAll(selector);
    if (targets.length > 0) {
        if (selector_idx >= 0 && selector_idx < targets.length) {
            let target = targets[selector_idx];
            let rmc = [];
            for (let i = 0; i < removedClasses.length; i++) {
                rmc.push(removedClasses[i].replace(/\*/g, '\\S*'));
            }
            let reason = "";
            // remove existing classes
            for (let i = 0; i < rmc.length; i++) {
                let rc = target.className.match(rmc[i]);
                if (rc) {
                    for (let j = 0; j < rc.length; j++) {
                        target.className = target.className.replace(rc[j], "").trim();
                        reason += `${rc[j]} was removed.`;
                    }
                }
            }
            // added new classes
            for (let i = 0; i < addedClasses.length; i++) {
                if (target.className.indexOf(addedClasses[i]) === -1) {
                    target.className = `${target.className} ${addedClasses[i]}`.trim();
                    reason += `${addedClasses[i]} was added.`;
                } else {
                    reason += `${addedClasses[i]} already exist.`;
                }
            }
            return {"result" : true, "reason" : reason};
        } else if (selector_idx === -1) {
            let reason = "";
            for (let p = 0; p < targets.length; p++) {
                let target = targets[p];
                let rmc = [];
                for (let i = 0; i < removedClasses.length; i++) {
                    rmc.push(removedClasses[i].replace(/\*/g, '\\S*'));
                }
                // remove existing classes
                for (let i = 0; i < rmc.length; i++) {
                    let rc = target.className.match(rmc[i]);
                    for (let j = 0; j < rc.length; j++) {
                        target.className = target.className.replace(rc[j], "").trim();
                        reason += `${rc[j]} was removed.`;
                    }
                }
                // added new classes
                for (let i = 0; i < addedClasses.length; i++) {
                    if (target.className.indexOf(addedClasses[i]) === -1) {
                        target.className = `${target.className} ${addedClasses[i]}`.trim();
                        reason += `${addedClasses[i]} was added.`;
                    } else {
                        reason += `${addedClasses[i]} already exist.`;
                    }
                }
            }
            return {"result" : true, "reason" : reason};
        } else {
            return {"result" : false, "reason" : `Out of Range selector_idx(${selector_idx}). Cannot find document.querySelectorAll(${selector})[${selector_idx}]. MUST be in [0, ${targets.length - 1}]`};
        }
    } else {
        return {"result" : false, "reason" : `Incorrect selector(${selector}). Cannot find document.querySelectorAll(${selector}).`};
    }
}

/**
 * @param   string      theme_container_selector 
 * @param   string      active_class_name   
 * @param   array       radio btns                  [{"selector":(string), "class":(string)}...]
 */
function createRadioForTheme(theme_container_selector, active_class_name, radio_btns) {
    for (let i = 0; i < radio_btns.length; i++) {
        document.querySelector(radio_btns[i].selector).onclick = (event) => {
            this.blur();
            let rmc = [];
            for (let j = 0; j < radio_btns.length; j++) {
                switchClasses(radio_btns[j].selector, [active_class_name], []);
                rmc.push(radio_btns[j].class);
            }
            snake_setting_id = i;
            Storage.setValue('ssi_theme', snake_setting_id);
            switchClasses(radio_btns[i].selector, [], [active_class_name]);
            switchClasses(theme_container_selector, rmc, [radio_btns[i].class]);
        }
    }
    snake_setting_id = Storage.getValue('ssi_theme') != undefined ? Storage.getValue('ssi_theme') : snake_setting_id;
    let rmc = [];
    for (let j = 0; j < radio_btns.length; j++) {
        switchClasses(radio_btns[j].selector, [active_class_name], []);
        rmc.push(radio_btns[j].class);
    }
    switchClasses(radio_btns[snake_setting_id].selector, [], [active_class_name]);
    switchClasses(theme_container_selector, rmc, [radio_btns[snake_setting_id].class]);
}

createRadioForTheme('.extension_wrapper', 'themes-item--active',
    [
        {"selector": '#grass',   "class": 'theme-grass'},
        {"selector": '#cyan',   "class": 'theme-cyan'},
        {"selector": '#pink',   "class": 'theme-pink'},
        {"selector": '#yellow', "class": 'theme-yellow'},
    ]
);