let getLocalsMessage = (messagename) => { return chrome.i18n.getMessage(messagename); }

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

document.querySelector('h1').textContent = getLocalsMessage('appName');

var gameState = "init";
var intervalTimer;

var levelSpeed = 3;
var interval = 150;

var canvas, ctx, player;
var obstacles = [];
var score = 0;
var highscore = Storage.getValue('highscore') ? Storage.getValue('highscore') : 0;
var frame = 0;

var imgBg = new Image();
imgBg.src = './files/bg.png';
var imgGround = new Image();
imgGround.src = './files/ground.png';

var muted = Storage.getValue('muted') ? Storage.getValue('muted') : false;
var audioBg = new Audio('./files/bg.mp3');
var audioJump = new Audio('./files/jump.mp3');
var audioExplode = new Audio('./files/explode.mp3');
var groundCtx;

function init(){
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "30px Ubuntu";
  ctx.textAlign = "center";

  groundCtx = document.getElementById("ground").getContext("2d");

  player = new elementPlayer(30, 30, 50, canvas.height - 30);
  player.gravity = 0.3;

  ctx.fillStyle = "white";
  ctx.fillText(getLocalsMessage("lblAnyKey"), canvas.width/2, canvas.height/2);

  document.getElementById("score").textContent = `${getLocalsMessage('lblScore')}: ${score}`;
  document.getElementById("highscore").textContent = `${getLocalsMessage('lblHighScore')}: ${highscore}`;
  document.querySelector('#mute').className = `sound ${muted? 'unmute': 'mute'}`;
}

function start(){
  gameState = "play";
  audioBg.currentTime = 0;
  audioBg.loop = true;
  !muted && audioBg.play();
  intervalTimer = setInterval(function() { tick(); }, 10);
}

function tick(){

  // score
  score ++;
  if (score > highscore) {
    highscore = score;
    Storage.setValue('highscore', highscore);
  }
  document.getElementById("score").textContent = `${getLocalsMessage('lblScore')}: ${score}`;
  document.getElementById("highscore").textContent = `${getLocalsMessage('lblHighScore')}: ${highscore}`;
  // collision
  for (i = 0; i < obstacles.length; i++) {
    if (player.crashWith(obstacles[i])){
      !muted && audioExplode.play();
      gameState = "over";
      score = 0;
      ctx.fillStyle = "#DC3522";
      ctx.fillText(getLocalsMessage('lblRestart'), canvas.width/2, canvas.height/2);
      !muted && audioBg.pause();
      clearInterval(intervalTimer);
      return;
    }
  }

  // adding obstacles
  var minInterval = 80;
  var maxInterval = 120;
  var minWidth = 20;
  var maxWidth = 80;
  
  frame++;
  if (frame == 1 || everyinterval(interval)) {
    frame = 2;
    levelSpeed += 0.2;
    interval = Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval);
    var x = canvas.width;
    var width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    var height = Math.floor(Math.random() * (50 - 10 + 1) + 10);
    obstacles.push(new element(width, height, x, canvas.height - height));
  }

  // updating elements
  for (i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= levelSpeed;
    obstacles[i].tick();
  }

  player.tick();

  render();
}

var shiftBg = 0;
var shiftGround = 0;

function render(){
  (shiftBg > -800) ? shiftBg -= 0.5 : shiftBg = 0;
  (shiftGround > -200) ? shiftGround -= 2 : shiftGround = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgBg, shiftBg, 0);
  ctx.drawImage(imgBg, 800 + shiftBg, 0);
  groundCtx.drawImage(imgGround, shiftGround, 0);
  groundCtx.drawImage(imgGround, 200 + shiftGround, 0);
  groundCtx.drawImage(imgGround, 400 + shiftGround, 0);
  groundCtx.drawImage(imgGround, 600 + shiftGround, 0);
  groundCtx.drawImage(imgGround, 800 + shiftGround, 0);
  ctx.fillStyle = "#DC3522";
  player.render();

  ctx.fillStyle = "white";
  for (i = 0; i < obstacles.length; i++) obstacles[i].render();
}

function click(){
  if (gameState == "init") start();
  else if (gameState == "play"){
    if (player.gravitySpeed == 0){
      audioJump.currentTime = 0;
      !muted && audioJump.play();
      airborne = true;
      player.gravitySpeed = -8;
    }
  }
  else if (gameState == "over") reset();
}

function reset(){
  obstacles = [];
  levelSpeed = 3;
  player = new elementPlayer(30, 30, 50, canvas.height - 30);
  player.gravity = 0.3;
  start();
}

function element(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;

  this.tick = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }

  this.render = function() {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#0000aa";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width/4, this.y + this.height/2);
    ctx.lineTo(this.x + this.width/2, this.y + this.height);
    ctx.lineTo(this.x + 3 * this.width/4, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  this.hitBottom = function() {
    var rockbottom = canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  }

  this.crashWith = function(otherobj) {
    var left = this.x;
    var right = this.x + (this.width);
    var top = this.y;
    var bottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) return false;
    return true;
  }
}

function elementPlayer(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;

  this.tick = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }

  this.render = function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.save();
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(this.x + this.width/5, this.y + this.width/5, this.width/5, this.height/5);
    ctx.fillRect(this.x + 3 * this.width/5, this.y + this.width/5, this.width/5, this.height/5);
    ctx.fillRect(this.x + this.width/5, this.y + 3 * this.width/5, 3 * this.width/5, this.height/5);
    ctx.restore();
  }

  this.hitBottom = function() {
    var rockbottom = canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  }

  this.crashWith = function(otherobj) {
    var left = this.x;
    var right = this.x + (this.width);
    var top = this.y;
    var bottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) return false;
    return true;
  }
}

function everyinterval(n) {
  if (frame % n == 0) return true;
  return false;
}
