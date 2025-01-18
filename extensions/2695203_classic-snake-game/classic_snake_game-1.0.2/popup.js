
class Game {
  constructor() {
    this.canvas = document.getElementById("board");
    this.canvas.width = 246;
    this.canvas.height = 246;
    this.context = this.canvas.getContext("2d");
    var self = this;
    browser.storage.local.get({highscore : 0}).then(item => {
      self.highscore = item.highscore;
      $("#highscore-value").html(self.highscore);
      $("#score").html(0);
      self.context.fillStyle = "#fff";
      self.context.font = "40px Pixel";
      self.context.textAlign = "center";
      self.context.fillText("Snake", self.canvas.width/2, self.canvas.height/2);
      self.context.font = "16px Pixel";
      self.context.fillText("Click  to  start", self.canvas.width/2, self.canvas.height/2 + 25);
      var func = (e) => {
        self.canvas.removeEventListener('click', func);
        self.start();
      }
      self.canvas.addEventListener('click', func);
    }, error => {console.log("Error");});
  }
  start() {
    this.snake = new Snake();
    this.fruit = new Fruit();
    var self = this;
    $("#highscore-value").html(this.highscore);
    $("#score").html(0);
    this.keyListener = e => {self.keypress(self, e);};
    window.addEventListener('keydown', this.keyListener);
    this.interval = setInterval(this.update, 30-$("#speedSlider").val(), this);
    $("#speedSlider").attr('disabled', true);
    console.log(30-$("#speedSlider").val());
    this.canvas.focus();
  }
  keypress(self, e) {
    switch (e.keyCode) {
      case 40:
        if (this.snake.speedY!=-1)
          this.snake.down();
        break;
      case 39:
        if (this.snake.speedX!=-1)
          this.snake.right();
        break;
      case 38:
        if (this.snake.speedY!=1)
          this.snake.up();
        break;
      case 37:
        if (this.snake.speedX!=1)
          this.snake.left();
        break;
      default:
        break;
    }
  }
  clear() {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }
  update(self) {
    self.clear();
    self.snake.update(self.context);
    if (self.snake.x < 0 || self.snake.x + self.snake.CELL_SIZE > self.canvas.width || self.snake.y < 0 || self.snake.y + self.snake.CELL_SIZE > self.canvas.width) {
      self.gameOver();
      return;
    }
    var cell = self.snake.cell;
    var leftX, leftY, rightX, rightY;
    while (cell!==null) {
      if (self.snake.speedX==1) {
        leftX = self.snake.x + self.snake.CELL_SIZE;
        leftY = self.snake.y;
        rightX = self.snake.x + self.snake.CELL_SIZE;
        rightY = self.snake.y + self.snake.CELL_SIZE;
      } else if (self.snake.speedX==-1) {
        leftX = self.snake.x;
        leftY = self.snake.y + self.snake.CELL_SIZE;
        rightX = self.snake.x;
        rightY = self.snake.y;
      } else if (self.snake.speedY==1) {
        leftX = self.snake.x;
        leftY = self.snake.y + self.snake.CELL_SIZE;
        rightX = self.snake.x + self.snake.CELL_SIZE;
        rightY = self.snake.y + self.snake.CELL_SIZE;
      } else if (self.snake.speedY==-1) {
        leftX = self.snake.x;
        leftY = self.snake.y;
        rightX = self.snake.x + self.snake.CELL_SIZE;
        rightY = self.snake.y;
      }
      if ((leftX>cell.x && leftX<cell.x+cell.CELL_SIZE && leftY>cell.y && leftY<cell.y+cell.CELL_SIZE) || (rightX>cell.x && rightX<cell.x+cell.CELL_SIZE && rightY>cell.y && rightY<cell.y+cell.CELL_SIZE)) {
        self.gameOver();
        return;
      }
      cell = cell.cell;
    }
    self.fruit.update(self.snake, self.context);
  }
  stop() {
    clearInterval(this.interval);
    $("#speedSlider").attr('disabled', false);
    window.removeEventListener('keydown', this.keyListener);
  }
  gameOver() {
    this.stop();
    this.clear();
    this.context.fillStyle = "#fff";
    this.context.font = "40px Pixel";
    this.context.textAlign = "center";
    if (this.snake.score > this.highscore) {
      this.highscore = this.snake.score;
      browser.storage.local.set({"highscore" : this.highscore}).then(()=>{},(e)=>{});
      this.context.fillText("High Score", this.canvas.width/2, this.canvas.height/2);
      $("#highscore-value").html(this.highscore);
    } else {
      this.context.fillText("Game Over", this.canvas.width/2, this.canvas.height/2);
    }
    this.context.font = "16px Pixel";
    this.context.fillText("Click  to  play  again", this.canvas.width/2, this.canvas.height/2 + 25);
    var self = this;
    var func = (e) => {
      self.canvas.removeEventListener('click', func);
      self.start();
    }
    self.canvas.addEventListener('click', func);
  }
}
class Fruit {
  constructor() {
    this.x, this.y;
    this.visible = false;
    this.RADIUS = 3;
    this.framesToNewFruit = 1;
  }
  update(snake, ctx) {
    if (!(this.visible)) {
      //this.framesToNewFruit-=1;
      if (--this.framesToNewFruit <= 0) {
        this.visible = true;
        this.framesToNewFruit = Math.floor((Math.random() * 100) + 1);
        this.x = Math.floor((Math.random() * 195) + 5);
        this.y = Math.floor((Math.random() * 195) + 5);
      }
    } else {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.RADIUS, 0, 2 * Math.PI);
      ctx.fill(); 
      if (((this.x-this.RADIUS >= snake.x && this.x-this.RADIUS <= snake.x + snake.CELL_SIZE) || (this.x+this.RADIUS <= snake.x + snake.CELL_SIZE && this.x+this.RADIUS >= snake.x)) &&
          ((this.y-this.RADIUS >= snake.y && this.y-this.RADIUS <= snake.y + snake.CELL_SIZE) || (this.y+this.RADIUS <= snake.y + snake.CELL_SIZE && this.y+this.RADIUS >= snake.y))) {
        this.visible = false;
        snake.grow(Math.floor((Math.random() * 9) + 1));
      }
    }
  }
}
class Cell {
  constructor(x,y,children) {
    this.CELL_SIZE = 6;
    this.x = x;
    this.y = y;
    this.speedX, this.speedY;
    this.history = [];
    this.next = [0, 0];
    this.cell = children > 0 ? new Cell(this.x,this.y,children-1) : null;
  }
  update(ctx, history) {
    this.speedX = history[0];
    this.speedY = history[1];
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.CELL_SIZE, this.CELL_SIZE);
    if (this.cell !== null)
      this.cell.update(ctx, this.next);
    this.history.push([this.speedX, this.speedY]);
    this.next = this.history.shift();
    if (this.cell === null)
      this.next = [0,0];
  }
  last() {
    if (this.cell===null) {
      return this;
    } else {
      return this.cell.last();
    }
  }
}
class Snake {
  constructor() {
    this.CELL_SIZE = 6;
    this.x = this.CELL_SIZE;
    this.y = 0;
    this.speedY = 0;
    this.speedX = 1;
    this.next_speedY = 0;
    this.next_speedX = 1;
    this.history = [[0, 0]];
    this.next = [0, 0];
    this.cell = new Cell(this.x,this.y, 10);
    this.last = this.cell.last();
    this.score = 0;
  }
  update(ctx) {
    if (this.x % this.CELL_SIZE == 0 && this.y % this.CELL_SIZE == 0) {
      this.speedY = this.next_speedY;
      this.speedX = this.next_speedX;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, this.CELL_SIZE, this.CELL_SIZE);
    if (this.cell !== null)
      this.cell.update(ctx, this.next);
    this.history.push([this.speedX, this.speedY]);
    this.next = this.history.shift();
  }
  grow(n = 10) {
    this.last = this.cell.last();
    this.last.cell = new Cell(this.last.x,this.last.y, 3*n-1);
    this.score+=n;
    $("#score").text(this.score);
  }
  down() {this.next_speedY = 1; this.next_speedX = 0;}
  up() {this.next_speedY = -1; this.next_speedX = 0;}
  right() {this.next_speedY = 0; this.next_speedX = 1;}
  left() {this.next_speedY = 0; this.next_speedX = -1;}
}
var f = new FontFace('Pixel', 'url(external/font.ttf)');

f.load().finally(function() {
  var game = new Game();
  //game.start();
});
