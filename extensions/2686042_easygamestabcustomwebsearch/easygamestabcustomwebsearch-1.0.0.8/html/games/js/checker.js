// Checker class, holds the logic of checker
class Checker {
  /**
   * @param {Node} element Linked DOM lement
   * @param {number[]} position Position on board
   * @param {Board} board Board where checker is located
   */
  constructor(element, position, board) {
      this.element = element;
      this.position = position;
      // By default checker is not a king
      this.king = false;
      // To whom this checker belongs
      this.player;
      this.board = board;

      // Depending on the 'id' attribute set 'player' property
      if (this.element.getAttribute('id') < 20) {
          this.player = 1;
      } else {
          this.player = 2;
      }
  };

  /**
   * Makes checker a king by changing 'king' property to true and adding specific style
  */
  MakeKing() {
      let kingStyle = document.createElement('i');
      kingStyle.classList.add('em', 'em-crown');

      this.element.appendChild(kingStyle);
      this.king = true;
  };

  /**
   * Used to move our checkers
   * @param {Tile} tile Tile to move
   * @returns {boolean} True if we moved
   */
  Move(tile) {
      if (!this.board.IsValidPlacetoMove(tile.position[0], tile.position[1])) {
          return false;
      }

      this.element.classList.remove('selected');

      // To be sure that checker can't go backwards if it's not a king
      if (this.player === 1 && !this.king) {
          if (tile.position[0] < this.position[0]) {
              return false;
          }
      } else if (this.player === 2 && !this.king) {
          if (tile.position[0] > this.position[0]) {
              return false;
          }
      }

      // Change place of checker on the board
      this.board.board[this.position[0]][this.position[1]] = 0;
      this.board.board[tile.position[0]][tile.position[1]] = this.player;

      gameManager.drawManager.MoveChecker(this, tile);

      this.position = [tile.position[0], tile.position[1]];

      // If the checker reached the end of the board then make it a king
      if (!this.king && (this.position[0] === 0 || this.position[0] === this.board.boardSize - 1)) {
          this.MakeKing();

          Logger.Log((this.player === 1 ? '1st' : '2nd') + ' player: ' + DrawManger.GetTileName(this.position[0], this.position[1]) +
                      ' became king');
      }

      //this.board.Print();
      return true;
  };

  /**
   * To check can we move anywhere at all
   * @returns {boolead} True if we can move anywhere
  */
  CanMove() {
      if (this.position.length === 0) {
          return false;
      }

      if (this.CanAttack([this.position[0] + 2, this.position[1] + 2]) ||
          this.CanAttack([this.position[0] + 2, this.position[1] - 2]) ||
          this.CanAttack([this.position[0] - 2, this.position[1] + 2]) ||
          this.CanAttack([this.position[0] - 2, this.position[1] - 2])) {
          return true;
      } else {
          return false;
      }
  };

  /**
   * To check if we can attack an enemy checker
   * @param {Array} newPosition New position to jump
   * @returns {*} false if we cannot attack, otherwise an enemy cheker
   */
  CanAttack(newPosition) {
      if (newPosition === undefined) {
          return false;
      }

      if (isNaN(newPosition[0] || isNaN(newPosition[1]))) {
          return false;
      }

      // To be sure that we can't go out of boundaries
      if (newPosition[0] > this.board.boardSize || newPosition[1] > this.board.boardSize || newPosition[0] < 0 || newPosition[1] < 0) {
          return false;
      }
  
      let dx = newPosition[1] - this.position[1];
      let dy = newPosition[0] - this.position[0];

      // To be sure that checker can't go backwards if it's not a king
      if (this.player === 1 && !this.king) {
          if (newPosition[0] < this.position[0]) {
              return false;
          }
      } else if (this.player === 2 && !this.king) {
          if (newPosition[0] > this.position[0]) {
              return false;
          }
      }

      // The enemy checker
      let checkTileX = Math.floor(this.position[1] + dx / 2);
      let checkTileY = Math.floor(this.position[0] + dy / 2);

      // If there's an enemy checker and the next tile is empty
      if (!this.board.IsValidPlacetoMove(checkTileY, checkTileX) && this.board.IsValidPlacetoMove(newPosition[0], newPosition[1])) {
          // Get enemy checker
          for (let checkerIndex in this.board.checkers) {
              if (this.board.checkers[checkerIndex].position[0] === checkTileY && this.board.checkers[checkerIndex].position[1] === checkTileX) {
                  if (this.player !== this.board.checkers[checkerIndex].player) {
                      // Return it
                      return this.board.checkers[checkerIndex];
                  }
              }
          }
      }

      return false;
  };

  /**
   * Attack an enemy checker
   * @param {Tile} tile Checker on this tile to remove
   * @returns {boolean} true if we attacked
   */
  Attack(tile) {
      let checkerToRemove = this.CanAttack(tile.position);

      // If there's a checker to remove then remove it
      if (checkerToRemove) {
          this.Remove(this.board.checkers[checkerToRemove.element.getAttribute('id')]);
          return true;
      }

      return false;
  };

  /**
   * To remvoe the checker from board
   * @param {Checker} checker Checker to remove
   */
  Remove(checker) {
      // Remove it from the board and from the game
      checker.element.parentElement.removeChild(checker.element.parentElement.childNodes.item(1));
      this.board.board[checker.position[0]][checker.position[1]] = 0;

      Logger.Log((this.player === 1 ? '1st' : '2nd') + ' player: ' + DrawManger.GetTileName(this.position[0], this.position[1]) + ' attacked ' +
          DrawManger.GetTileName(checker.position[0], checker.position[1]));

      // Reset position of this checker
      checker.position = [];
  };
};
// Tile class
class Tile {
  /**
   * @param {object} element Linked DOM lement
   * @param {array} position Position on board
   */
  constructor(element, position) {
      this.element = element;
      this.position = position;
  };

  /**
   * To check if the tile is in the range of checker
   * @param {Checker} checker Checker to check
   * @returns {number} 1 if we can do jump, 2 if just regular move, otherwise 0
   */
  InRange(checker) {
      if (checker.position.length === 0) {
          return 0;
      }

      let distance = Board.Distance(this.position[0], this.position[1], checker.position[0], checker.position[1]);

      if (distance === Math.sqrt(2)) {
          return 1;
      } else if (distance === Math.sqrt(2) * 2) {
          return 2;
      }
      
      return 0;
  };
};
// Board class, holds the board, tiles and checkers
class Board {
  constructor() {
      // Set board size
      this.boardSize = 10;
      // Initialize new matrix
      this.board = this.Initialize();
      // Place checkers for 1st player
      this.PlaceCheckers(1, 0, Math.floor(this.boardSize / 2) - 1);
      // Place checkers for 2nd player
      this.PlaceCheckers(2, this.boardSize - (Math.floor(this.boardSize / 2) - 1), this.boardSize);
      this.tiles = [];
      this.checkers = [];
  };

  /**
   * Initializes new board
   * @returns {number[]} Initialized board
  */
  Initialize() {
      let board = [];

      for (let i = 0; i < this.boardSize; i++) {
          board[i] = [];

          for (let j = 0; j < this.boardSize; j++) {
              board[i][j] = 0;
          }
      }

      return board;
  };

  /**
    * Places checkers on board
    * @param {number} player Player
    * @param {number} startPoint Start point from which to place chekers
    * @param {number} endPoint End point to where to place chekers
   */
  PlaceCheckers(player, startPoint, endPoint) {
      let skip = true;

      for (let i = startPoint; i < endPoint; i++) {
          for (let j = 0; j < this.boardSize; j++) {
              if (skip) {
                  skip = !skip;
              } else {
                  this.board[i][j] = player;
                  skip = !skip;
              }
          }

          skip = !skip;
      }
  };

  /**
   * Counts the distance between two points
   * @param {number} x1 x coordinate of first point
   * @param {number} y1 y coordinate of first point
   * @param {number} x2 x coordinate of second point
   * @param {number} y2 y coordinate of second point
   * @returns {number} Distance between two points
   */
  static Distance(x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  /**
   * To check if there's no other checkers on tile
   * @param {number} row x coordinate of tile
   * @param {number} col y coordinate of tile
   * @returns {boolean} true if there's no other checkers
   */
  IsValidPlacetoMove(row, col) {
      if (row >= 10 || col >= 10) {
          return false;
      }

      if (this.board[row][col] === 0) {
          return true;
      } else {
          return false;
      }
  };

  /**
   * DEBUG: To trace board in console
  */
  Print() {
      let toPrint = '';

      for (let i = 0; i < this.boardSize; i++) {
          toPrint += '| ';

          for (let j = 0; j < this.boardSize; j++) {
              toPrint += (this.board[i][j] ? this.board[i][j] : ' ') + ' | ';
          }

          toPrint += '\r\n-----------------------------------------';
          toPrint += '\r\n';
      }

      console.log(toPrint);
  };

  /**
   * Gets all possible to move tiles to with checkers that can move there
   * @param {Tile[]} tiles Tiles to check
   * @param {Checker[]} checkers Checkers to check
   * @returns {Array} Returns array where 0 index is possible tiles, 1 index is possible checkers
   */
  GetPossibleMoves(tiles, checkers) {
      let possibleTiles = [];
      let possibleCheckers = [];

      for (let tile of tiles) {
          let setOfCheckers = checkers.filter(checker => {
              let inRange = tile.InRange(checker);

              if (inRange) {
                  if (inRange === 1) {
                      if (checker.player === 1 && !checker.king) {
                          if (tile.position[0] < checker.position[0]) {
                              return false;
                          }
                      } else if (checker.player === 2 && !checker.king) {
                          if (tile.position[0] > checker.position[0]) {
                              return false;
                          }
                      }

                      possibleTiles.push(tile);
                      return true;
                  }
              }
          });

          possibleCheckers = possibleCheckers.concat(setOfCheckers);
      }

      possibleTiles = Board.RemoveDuplicates(possibleTiles);
      possibleCheckers = Board.RemoveDuplicates(possibleCheckers);

      return [possibleTiles, possibleCheckers];
  };

  /**
   * Get all empty tiles
   * @param {Tile[]} tiles Array of black tiles
   * @returns {Tile[]} Array of empty tiles
   */
  GetAllEmptyTiles() {
      let tiles = this.GetAllPosibleTiles();

      let emptyTiles = tiles.filter(tile => {
          for (let checker of gameManager.gameBoard.checkers) {
              if (checker.position[0] === tile.position[0] &&
                  checker.position[1] === tile.position[1]) {
                  return false;
              }
          }

          return true;
      });

      return emptyTiles;
  }

  /**
   * Get all possible to move tiles (black one)
   * @returns {Tile[]} Array of tiles that player can move to
  */
  GetAllPosibleTiles() {
      let tiles = []
      let skip = true;
      let counter = 0;

      for (let i = 0; i < gameManager.gameBoard.boardSize; i++) {
          for (let j = 0; j < gameManager.gameBoard.boardSize; j++) {
              if (skip) {
                  skip = !skip;
              } else {
                  tiles.push(gameManager.gameBoard.tiles[counter]);
                  skip = !skip;
              }

              counter++;
          }

          skip = !skip;
      }

      return tiles;
  }

  /**
   * Checks if player needs to attack
   * @param {number} player Player
   * @returns {boolean} true if player don't need to attack, otherwise return checkers that can attack
   */
  MustAttack(player) {
      // Filter out just the checker that belongs to the 'player'
      let checkers = gameManager.gameBoard.checkers.filter(checker => checker.player === player);
      let attackCheckers = checkers.filter(checker => checker.CanMove());

      // If there's at least one checker that can attack return it
      if (attackCheckers.length === 0) {
          // Otherwise return true
          return true;
      } else {
          // If this is a player then help him to see with what checker he can attack
          if (player === gameManager.player) {
              attackCheckers.map((checker) => {
                  gameManager.drawManager.HelpPlayer(checker);
              });
          }

          return attackCheckers;
      }
  };

  /**
  * Removes duplicates from array and returns a new one
  * @param {Array} array Array to remove from
  * @returns {Array} New array without duplicates
  */
  static RemoveDuplicates(array) {
      let uniqueArray = [];

      for (let i = 0; i < array.length; i++) {
          if (uniqueArray.indexOf(array[i]) === -1) {
              uniqueArray.push(array[i])
          }
      }

      return uniqueArray;
  };
};
// Class used t odraw the board and checkers
class DrawManger {
  /**
   * @param {Board} board Board to draw
   */
  constructor(board) {
      this.board = board;
  };

  /**
   * To remove all highlighted tiles
  */
  RemoveMovedTilesHighlight() {
      let beenHereAllAlong = document.querySelectorAll('div.beenhereallalong'); // ¡Apagando las luces!

      for (let element of beenHereAllAlong) {
          element.classList.remove('beenhereallalong');
      }
  };

  /**
   * Draws checker on the other tile
   * @param {Checker} checker Checker to move
   * @param {Tile} tile Tile to move to
   */
  MoveChecker(checker, tile) {
      let beenHereAllAlong = document.querySelectorAll('div.beenhereallalong');

      Logger.Log((checker.player === 1 ? '1st' : '2nd') + ' player: ' + DrawManger.GetTileName(checker.position[0], checker.position[1]) + ' > ' +
          DrawManger.GetTileName(tile.position[0], tile.position[1]));

      let tiles = document.querySelector('div.tiles');
      checker.element.parentElement.classList.add('beenhereallalong');
      tiles.childNodes[tile.position[0]].childNodes[tile.position[1]].classList.add('beenhereallalong');
      tiles.childNodes[tile.position[0]].childNodes[tile.position[1]].appendChild(checker.element);
  };

  /**
   * 
   * @param {Checker} thisChecker The checker from which we don't need to remove 'selected' class
   * @param {Checker[]} checkers Array of all player's checkers
   */
  Deselect(thisChecker, checkers) {
      for (let checker of checkers) {
          if (thisChecker) {
              if (thisChecker !== checker) {
                  checker.classList.remove('selected');
              }
          } else {
              checker.classList.remove('selected');
          }
      }
  };

  /**
   * Used by 'click' event on checker to select/deselect
  */
  Select() {
      if (gameManager.gameBoard.checkers[this.getAttribute('id')].player !== gameManager.player) {
          return;
      }

      let isPlayersTurn = gameManager.gameBoard.checkers[this.getAttribute('id')].player === gameManager.playerTurn;

      if (isPlayersTurn) {
          let checkers = document.getElementsByClassName('checker');
          let attackCheckers = gameManager.gameBoard.MustAttack(gameManager.player);

          // If the player don't need to attack
          if (attackCheckers === true) {
              // If this element already selected
              if (this.classList.contains('selected')) {
                  // Then deselect it
                  this.classList.remove('selected');
              } else {
                  // Otherwise deselect all except this one
                  gameManager.drawManager.Deselect(this, checkers);
                  this.classList.add('selected');
              }
          } else {
              // But if he must attack and he selects wrong checker give him a warning
              if (attackCheckers.filter((checker) => gameManager.gameBoard.checkers[this.getAttribute('id')] === checker).length === 0) {
                  new Message('You must attack when it possible!').Show();
              } else {
                  gameManager.drawManager.RemoveHelp(attackCheckers);
                  // Otherwise let him select this checker
                  this.classList.add('selected');
              }
          }
      }
  };

  /**
   * To help player to see what checker must attack
   * @param {Checker} checker The checker to select
   */
  HelpPlayer(checker) {
      checker.element.classList.add('help');
  };

  /**
   * To remove help marks on the checkers
   * @param {Checker[]} checkers Array of checkers to remove 'help' from
  */
  RemoveHelp(checkers) {
      for (let checker of checkers) {
          checker.element.classList.remove('help');
      }
  }

  /**
   * To get name of the tile
   * @param {number} row x of tile
   * @param {number} col y of tile
   * @returns {sring} String of type 'A2', 'G7' and so on
   */
  static GetTileName(row, col) {
      return String.fromCharCode('A'.charCodeAt(0) + parseInt(col)) + (parseInt(row) + 1);
  };

  /**
   * Draws the board and checkers
  */
  DrawBoard() {
      let tiles = document.querySelector('div.tiles');
      let tilesCount = 0;
      let chekersCount = 0;

      for (let row in this.board.board) {
          let horizontal = document.createElement('div');
          horizontal.classList.add('tileRow');

          for (let col in this.board.board[row]) {
              // New tile
              let tile = document.createElement('div');
              tile.classList.add('tile');
              tile.setAttribute('id', 'tile' + tilesCount);
              // Add event to select tile
              tile.addEventListener('click', gameManager.Select);

              // Tooltip to show tile name
              let tooltip = document.createElement('span');
              tooltip.classList.add('tooltiptext');
              tooltip.innerText = DrawManger.GetTileName(row, col);
              tile.appendChild(tooltip);

              horizontal.appendChild(tile);
              this.board.tiles[tilesCount] = new Tile(tile, [+row, +col]);
              tilesCount++;

              // New cheker
              let checker = document.createElement('div');
              checker.classList.add('checker');
              checker.setAttribute('id', chekersCount);
              // Add event to select checker
              checker.addEventListener('click', this.Select);

              if (this.board.board[row][col] === 1) {
                  checker.classList.add('black');
                  tile.appendChild(checker);
                  this.board.checkers[chekersCount] = new Checker(checker, [+row, +col], this.board);
                  chekersCount++;
              } else if (this.board.board[row][col] === 2) {
                  checker.classList.add('white');
                  tile.appendChild(checker);
                  this.board.checkers[chekersCount] = new Checker(checker, [+row, +col], this.board);
                  chekersCount++;
              }
          }

          tiles.appendChild(horizontal);
      }
  };
};
// Class that controls the game itself, it's responsible for whole game process
class GameManager {
  /**
   * @param {number} player Player's checkers, default value is 2
   * @param {number} AIplayer Which one (black or white) checkers the AI will be playing, default value is 1
   */
  constructor(player = 2, AIplayer = 1) {
      // Game board
      this.gameBoard = new Board();
      // Draw manager
      this.drawManager = new DrawManger(this.gameBoard);
      this.playerTurn = 2;
      this.player = player;
      // AI
      this.AI = new AI(AIplayer);
  };

  /**
   * Initializes by drawing the board and checkers
  */
  Initialize() {
      // Draw board
      this.drawManager.DrawBoard();
  };

  /**
   * Stops the game
  */
  Stop() {
      this.AI.Stop();
  }

  /**
   * Called by 'click' event on tile, performs move action and moves selected checker
  */
  Select() {
      // Get all checkers with 'selected' class
      let checkers = document.querySelectorAll('div.tile div.selected');

      // If there's none then return
      if (checkers.length === 0) {
          return;
      } else {
          // Lets check if the player can move at all
          let possible = gameManager.gameBoard.GetPossibleMoves(gameManager.gameBoard.GetAllEmptyTiles(),
              gameManager.gameBoard.checkers.filter(checker => checker.player === gameManager.player));

          if (possible[1].length === 0 || possible[0].length === 0) {
              // If not then he loses
              gameManager.EndTheGame(1);
              return;
          }

          let tileId = this.getAttribute('id').replace('tile', '');
          let tile = gameManager.gameBoard.tiles[tileId];
          let checker = gameManager.gameBoard.checkers[checkers.item(0).getAttribute('id')];

          // Is this in range?
          let inRange = tile.InRange(checker);

          if (inRange) {
              gameManager.drawManager.RemoveMovedTilesHighlight();

              // To check if we can do more than one jump
              if (inRange === 2) {
                  if (checker.Attack(tile)) {
                      checker.Move(tile);

                      if (checker.CanMove()) {
                          checker.element.classList.add('selected');
                      } else {
                          setTimeout(() => {
                              gameManager.AI.TryToMove();
                          }, 1000);

                          gameManager.ChangePlayerTurn();
                      }
                  }
                  // Otherwise just move
              } else if (inRange === 1) {
                  if (!checker.CanMove()) {
                      if (checker.Move(tile)) {
                          setTimeout(() => {
                              gameManager.AI.TryToMove();
                          }, 1000);

                          gameManager.ChangePlayerTurn();
                      }
                  }
              }
          }
      }
  };

  /**
   * Ends the game, logs and displays the winner
   * @param {number} player Player who won 
   */
  EndTheGame(player) {
      let messageText = 'Player ' + player + ' wins!';

      Logger.Log(messageText);

      let message = document.createElement('p');

      if (player === 1) {
          message.innerText = messageText;
      } else {
          message.innerText = 'Congratulations';
      }

      new Message(message, player === 1 ? 'You lose!' : 'You win!').ShowWithHeader();

      // Stop the game
      this.Stop();
  }

  /**
   * Checks victory for both players and displays it if someone won
   */
  CheckVictory() {
      if (this.CheckIfAnyLeft(1)) {
          this.EndTheGame(2);
      } else if (this.CheckIfAnyLeft(2)) {
          this.EndTheGame(1);
      }
  };

  /**
   * Checks if the player has any checkers left
   * @param {number} player Player to check
   * @returns {boolean} ture if the player lost
   */
  CheckIfAnyLeft(player) {
      let counter = 0;

      for (let i = 0; i < this.gameBoard.boardSize; i++) {
          if (!this.gameBoard.board[i].includes(player)) {
              counter++;
          }
      }

      if (counter === this.gameBoard.boardSize) {
          return true;
      } else {
          return false;
      }
  };

  /**
   * Changes turn between players
  */
  ChangePlayerTurn() {
      if (this.playerTurn === 1) {
          this.playerTurn = 2;
      } else {
          this.playerTurn = 1;
      }

      gameManager.CheckVictory();
  };
};
// AI class that you play against
class AI {
  /**
   * @param {number} player Which one (black or white) checkers the AI will be playing
   */
  constructor(player) {
      this.player = player;
      // Is AI active?
      this.active = true;
      // Used for storing possible tiles to move to
      this.possibleTiles;
      // Used to store possible checkers to move
      this.possibleCheckers;
  };

  /**
   * Stops the AI
  */
  Stop() {
      this.active = !this.active;
  }

  /**
   * Called by GameManager to let AI try to move
  */
  TryToMove() {
      // Only move if the AI is active
      if (this.active) {
          gameManager.drawManager.RemoveMovedTilesHighlight();

          // Get possible tiles
          let tiles = gameManager.gameBoard.GetAllEmptyTiles();

          // Chec if we attacked or just moved
          if (this.GetPossibleMoves(tiles)) {
              // If so then move
              this.Move();
          } else {
              // Otherwise change the turn
              setTimeout(() => gameManager.ChangePlayerTurn(), 1000);
          }
      }
  };

  /**
   * AI moves checker
  */
  Move() {
      let randomChecker;
      let randomTile;

      do {
          // Gather all kings
          let kings = this.possibleCheckers.filter(checker => checker.king);

          // If there's at least one king let AI prefer it with a 50% chance
          if (kings.length !== 0 && Math.random() >= 0.5) {
              randomChecker = kings[Math.floor(Math.random() * kings.length)];
              randomTile = this.possibleTiles[Math.floor(Math.random() * this.possibleTiles.length)];
          } else {
              // Otherwise go with common ones
              randomChecker = this.possibleCheckers[Math.floor(Math.random() * this.possibleCheckers.length)];
              randomTile = this.possibleTiles[Math.floor(Math.random() * this.possibleTiles.length)];
          }
      } while (randomTile.InRange(randomChecker) !== 1); // Do until we don't find tile to move to

      if (randomChecker.Move(randomTile)) {
          // If we moved then change the turn
          gameManager.ChangePlayerTurn();
      } else {
          // Otherwise try again
          this.Move();
      }
  };

  /**
   * AI tries to move his checkers
   * @param {Tile[]} tiles Possible tiles
   * @returns {bollean} true if AI just moved, false if attacked
   */
  GetPossibleMoves(tiles) {
      let checkers = gameManager.gameBoard.checkers.filter(checker => checker.player === this.player);

      // To check if we can attack
      if (gameManager.gameBoard.MustAttack(this.player) === true) {
          // If not then just move

          // Lets check if AI can move at all
          let possible = gameManager.gameBoard.GetPossibleMoves(tiles, checkers);

          this.possibleTiles = possible[0];
          this.possibleCheckers = possible[1];

          if (this.possibleCheckers.length === 0 || this.possibleTiles.length === 0) {
              // If the AI can't move at all then he loses
              gameManager.EndTheGame(2);
              return false;
          }

          return true;
      } else {
          // Otherwise attack
          if (this.DoJump(tiles, checkers)) {
              return true;
          } else {
              return false;
          }
      }
  };

  /**
   * Attacks enemy
   * @param {Tile[]} tiles 
   * @param {Checker[]} checkers 
   */
  DoJump(tiles, checkers) {
      let found = false;

      for (let tile of tiles) {
          checkers.filter(checker => {
              if (!found) {
                  let inRange = tile.InRange(checker);

                  if (inRange) {
                      if (inRange === 2) {
                          if (checker.Attack(tile)) {
                              checker.Move(tile);

                              if (checker.CanMove()) {
                                  this.DoJump(tiles, [checker]);
                              }

                              found = !found;
                          }
                      }
                  }
              }
          });
      }

      return false;
  };
};
/**
* Removes message box
* @param {Node} messageBox DOM Node object of Message
*/
function OkButton(messageBox) {
  let mainInfoDivs = document.getElementById('mainBoardContainer')

  mainInfoDivs.removeChild(messageBox);
};

/**
* Reloads the window to play again
*/
function Play() {
  window.location.reload();
};

/**
* To show message with rules
*/
function Rules() {
  let rules = ['Unlimeted time',
      'You must attack if it\'s possible',
      'All checkers are played on black tiles',
      'Men can only go forward',
      'After reaching the end of the board man becomes a king',
      'King can go any direction',
      'Player wins when there\'s no enemy checkers left or if the enemy can\'t move'];
  let message = document.createElement('ul');

  rules.map((rule) => {
      let ruleElement = document.createElement('li');
      ruleElement.innerText = rule;
      message.appendChild(ruleElement);
  });

  new Message(message, 'Rules').ShowWithHeader();
};
// This class used to show messages instead of using alert
class Message {
  /**
   * @param {object} message Message ot diplay
   * @param {string} [header] Header to display, optional
   */
  constructor(message, header) {
      this.message = message;
      this.header = header;
  };

  /**
   * Shows the message box
  */
  Show() {
      let mainInfoDiv = document.getElementById('mainBoardContainer')
      let outerMessageBox = document.createElement('div');
      outerMessageBox.setAttribute('id', 'outerMessageBox');

      let button = document.createElement('button');
      button.classList.add('okbutton');
      button.innerText = 'Ok';

      let message = document.createElement('p');
      message.innerText = this.message;

      let messageBox = document.createElement('div');
      messageBox.setAttribute('id', 'messagebox');
      messageBox.appendChild(message);
      messageBox.appendChild(button);

      button.addEventListener('click', () => OkButton(outerMessageBox));
      outerMessageBox.appendChild(messageBox);
      mainInfoDiv.appendChild(outerMessageBox);
  };

  /**
   * Shows the message box with header without blinking
  */
  ShowWithHeader() {
    let mainInfoDiv1 = document.getElementById('mainBoardContainer');
      let outerMessageBox = document.createElement('div');
      outerMessageBox.setAttribute('id', 'outerMessageBox');

      let header = document.createElement('h1');
      
      header.innerText = this.header;

      let button = document.createElement('button');
      button.classList.add('okbutton');
      button.innerText = 'Ok';
       
      let messageBox = document.createElement('div');
      messageBox.setAttribute('id', 'messagebox');
      messageBox.classList.add('messageBoxWithHeader');
      messageBox.appendChild(header);
      messageBox.appendChild(this.message);
      messageBox.appendChild(button);

      button.addEventListener('click', () => OkButton(outerMessageBox));

      outerMessageBox.appendChild(messageBox);
      mainInfoDiv1.appendChild(outerMessageBox);
  };
};
// Class used for logging
class Logger {
  /**
   * Adds message to the log
   * @param {string} message Message to log
   */
  static Log(message) {
      let logMessage = document.createElement('p');
      logMessage.innerText = message;

      let log = document.getElementById('log');
      log.appendChild(logMessage);

      log.scrollTop = log.scrollHeight;
  };
};
// This is a main file that enables new instance of Game Manager and starts the game

// The only one global variable that we NEED
let gameManager;

// When window is loaded
window.onload = () => {
  // Create new GameManager
  gameManager = new GameManager();
  // Initialize the game
  gameManager.Initialize();
};
// Event Listners
document.getElementById('play').addEventListener('click',Play)