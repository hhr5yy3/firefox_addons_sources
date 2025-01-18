let tmrCounter = -1;
let isFinished = false;
let minesCounter = 0;
const DIFICULTY_LEVEL = [[9, 9, 10],[16, 16, 40],[16, 30, 99]];
// chrome.i18n.getMessage("messagename")
let getLocalsMessage = (messagename) => { return chrome.i18n.getMessage(messagename); }

function GUILocalization(){
    document.querySelector("#new_game").textContent = getLocalsMessage("appLabelNewGame");
    document.querySelector(".state-lose").textContent = getLocalsMessage("appLabelLose");
    document.querySelector(".state-win").textContent = getLocalsMessage("appLabelWin");
    document.querySelector("option[value='beginner']").textContent = getLocalsMessage("appLabelBeginner");
    document.querySelector("option[value='intermediate']").textContent = getLocalsMessage("appLabelIntermediate");
    document.querySelector("option[value='advanced']").textContent = getLocalsMessage("appLabelAdvanced");
    document.querySelector("#gameStyle").textContent = getLocalsMessage("appLabelClassicStyle");
    document.querySelector("#gameTheme").textContent = getLocalsMessage("appLabelDarkWhiteStyle");
}
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

let UI_Theme = Storage.getValue("UI_Theme") ? Storage.getValue("UI_Theme") : "classic";
let UI_SubTheme = Storage.getValue("UI_SubTheme") ? Storage.getValue("UI_SubTheme") : "white";

let tmrSecs = Storage.getValue('tmrSecs') ? Storage.getValue('tmrSecs') : 0;
let savedSecs = Storage.getValue('tmrSecs') ? Storage.getValue('tmrSecs') : 0;

const STATE = Object.freeze({
    'MINE'  : -1,
    'EMPTY' :  0,
    'MARK'  : 100,
    'SHOW'  : 1000
});

const CONDITION = Object.freeze({
    'WIN'       :  1,
    'LOSE'      : -1,
    'CONTINUE'  :  0,
    'FLAG'      :  2,
    'UNFLAG'    :  3
});

const DIRECTION = Object.freeze({
    'L'  : Object.freeze({dx:  0, dy: -1}),
    'LU' : Object.freeze({dx: -1, dy: -1}),
    'U'  : Object.freeze({dx: -1, dy:  0}),
    'UR' : Object.freeze({dx: -1, dy: +1}),
    'R'  : Object.freeze({dx:  0, dy: +1}),
    'RD' : Object.freeze({dx: +1, dy: +1}),
    'D'  : Object.freeze({dx: +1, dy:  0}),
    'DL' : Object.freeze({dx: +1, dy: -1})
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// width + heigh + 1 = maximum depth
// TODO : rework with additional resources
function openChainState(matrix, x, y, state) {
    x = parseInt(x);
    y = parseInt(y);
    let amount = 0;
    if (matrix[x][y] >= STATE.SHOW)
        return 0;
    if ((matrix[x][y] !== state) && (matrix[x][y] !== (state + STATE.MARK))) {
        matrix[x][y] += (matrix[x][y] < STATE.SHOW - 1 ? matrix[x][y] >= STATE.MARK ? STATE.SHOW - STATE.MARK : STATE.SHOW: 0); 
        return 0;
    } else {
        matrix[x][y] = STATE.SHOW; 
        let directions = [DIRECTION.L, DIRECTION.LU, DIRECTION.U, DIRECTION.UR, DIRECTION.R, DIRECTION.RD, DIRECTION.D, DIRECTION.DL];
        let count = 0;
        for (let k = 0; k < directions.length; k++) {
            if ((x + directions[k].dx >= 0) && 
                (x + directions[k].dx < matrix.length) &&
                (y + directions[k].dy >= 0) &&
                (y + directions[k].dy < matrix[x].length)) {
                amount += openChainState(matrix, x + directions[k].dx, y + directions[k].dy, state);
            }
        }
    }
    return amount;
}

function finish(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < STATE.SHOW + STATE.MINE) {
                if (matrix[i][j] < STATE.MARK + STATE.MINE) {
                    matrix[i][j] += STATE.SHOW;
                } else {
                    matrix[i][j] += (STATE.SHOW - STATE.MARK);
                }
            }
        }
    }
}

function getOpenedCellsAmount(matrix) {
    let amount = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= STATE.SHOW) {
                amount++;
            } else if (matrix[i][j] === STATE.SHOW + STATE.MINE) {
                return matrix.length * matrix[i].length;
            }
        }
    }
    return amount;
}

function getMarkedCellsAmount(matrix) {
    let amount = {mine: 0, total: 0};
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > STATE.MARK - 2 && matrix[i][j] < STATE.SHOW - 1) {
                amount.total++;
            }
            if (matrix[i][j] === STATE.MARK + STATE.MINE) {
                amount.mine++;
            }
        }
    }
    return amount;
}

function actionMark(matrix, x, y) {
    if (x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length) {
        let cond = CONDITION.CONTINUE;
        if (matrix[x][y] > STATE.MARK - 2 && matrix[x][y] < STATE.SHOW - 1) {
            matrix[x][y] -= STATE.MARK;
            cond = CONDITION.UNFLAG;
        } else if (matrix[x][y] < STATE.MARK - 1) {
            matrix[x][y] += STATE.MARK;
            cond = CONDITION.FLAG;
            let marked = getMarkedCellsAmount(matrix);
            if (marked.mine == marked.total && marked.mine === DIFICULTY_LEVEL[difficulty_level - 1][2]) 
                cond = CONDITION.WIN;
        }
        return {result: true, cond: cond};
    } else {
        return {result: false, cond: CONDITION.CONTINUE};
    }
}

function actionClick(matrix, x, y) {
    if (x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length) {
        let cond = CONDITION.CONTINUE;
        if (matrix[x][y] > STATE.MARK - 2)
            return {result: false, cond: CONDITION.CONTINUE};
        switch (matrix[x][y]) {
            case STATE.MINE:
            case STATE.MARK - 1:
                // TODO : open whole board
                finish(matrix);
                return {result: true, cond: CONDITION.LOSE};
                break;
            case STATE.EMPTY:
            case STATE.MARK:
                // TODO : open all empty cells
                openChainState(matrix, x, y, 0);
                break;
            case STATE.MARK + 1:
            case STATE.MARK + 2:
            case STATE.MARK + 3:
            case STATE.MARK + 4:
            case STATE.MARK + 5:
            case STATE.MARK + 6:
            case STATE.MARK + 7:
            case STATE.MARK + 8:
                matrix[x][y] += (STATE.SHOW - STATE.MARK);
                break;
            default:
                // TODO : open only selected cell
                matrix[x][y] += STATE.SHOW;
                break;
        };
        // TODO : get opened cells amount
        let opened = getOpenedCellsAmount(matrix);
        if (opened === matrix.length * matrix[0].length - DIFICULTY_LEVEL[difficulty_level - 1][2]) {
            cond = CONDITION.WIN;
        } else {
            cond = CONDITION.CONTINUE;
        }
        return {result: true, cond: cond};
    } else {
        return {result: false, cond: CONDITION.CONTINUE};
    }
}

function actionCheck(matrix, x, y) {
    if (x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length) {
        if (matrix[x][y] > STATE.SHOW) {
            let marked_mines_count = 0;
            let cells_to_check = [
                {x: x - 1, y: y - 1},
                {x: x + 0, y: y - 1},
                {x: x + 1, y: y - 1},
                {x: x - 1, y: y + 0},
                {x: x + 1, y: y + 0},
                {x: x - 1, y: y + 1},
                {x: x + 0, y: y + 1},
                {x: x + 1, y: y + 1}
            ].filter(function(el) {
                if (el.x >= 0 && el.y >= 0 && el.x < matrix.length && el.y < matrix[0].length) {
                    let cur_cell = matrix[el.x][el.y];
                    if (cur_cell > STATE.MARK - 2 && cur_cell < STATE.SHOW - 1) {
                        marked_mines_count++;
                    } else {
                        return el;
                    }
                }
            });
            if (marked_mines_count == matrix[x][y] - STATE.SHOW) {
                for (let i = 0; i < cells_to_check.length; i++) {
                    let cur_cell = matrix[cells_to_check[i].x][cells_to_check[i].y];
                    if (cur_cell == STATE.MINE || cur_cell == STATE.MARK - 1 || cur_cell == STATE.SHOW - 1) {
                        finish(matrix);
                        return {result: true, cond: CONDITION.LOSE};
                    }
                    openChainState(matrix, cells_to_check[i].x, cells_to_check[i].y, 0);
                }
            }
        }
    }
    
    return {result: false, cond: CONDITION.CONTINUE};
}

function createBoard(height, width, mines) {
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix[i] = [];
        for (let j = 0; j < width; j++) {
            matrix[i][j] = STATE.EMPTY;
        }
    }
    
    for (let i = 0; i < mines; i++) {
        let x, y;
        do {
            x = getRandomInt(0, height - 1);
            y = getRandomInt(0, width - 1);
        } while (matrix[x][y] !== STATE.EMPTY);
        matrix[x][y] = STATE.MINE;
    }

    let directions = [DIRECTION.L, DIRECTION.LU, DIRECTION.U, DIRECTION.UR, DIRECTION.R, DIRECTION.RD, DIRECTION.D, DIRECTION.DL];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== STATE.MINE) {
                let count = 0;
                for (let k = 0; k < directions.length; k++) {
                    if ((i + directions[k].dx >= 0) && 
                        (i + directions[k].dx < matrix.length) &&
                        (j + directions[k].dy >= 0) &&
                        (j + directions[k].dy < matrix[i].length)) {
                        if (matrix[i + directions[k].dx][j + directions[k].dy] === STATE.MINE) {
                            count++;
                        }
                    }
                }
                matrix[i][j] = count;
            }
        }
    }
    return matrix;
}

function clearBoard() {
    let element = document.querySelector('.play_field');
    while (element.firstChild) {
    //    element.firstChild.removeEventListener('mousedown', onClickCell, false);
        element.removeChild(element.firstChild);
    }
    element.removeEventListener('mousedown', onDownCell, false);
    element.removeEventListener('mousemove', onMoveCell, false);
    element.removeEventListener('mouseup', onUpCell, false);
}

function handleCellClick(cell, key) {
    if (isFinished)
        return false;
    if (tmrCounter === -1)
        getStartState(tmrSecs);
    let tid = cell.id;
    let x = parseInt(tid.split('_')[1]);
    let y = parseInt(tid.split('_')[2]);
    switch(key) {
        case 1: 
            var win = actionClick(game, x, y);
            if (win.cond === CONDITION.WIN) {
                showWinState();
            } else if (win.cond === CONDITION.LOSE) {
                showLoseState();
            }
            drawBoard(game);
            break;
        case 2:
            var win = actionCheck(game, x, y);
            if (win.cond === CONDITION.LOSE) {
                showLoseState();
            }
            drawBoard(game);
            break;
        case 3:
            var win = actionMark(game, x, y);
            if (win.cond === CONDITION.WIN) {
                showWinState();
            } else if (win.cond === CONDITION.FLAG || win.cond === CONDITION.WIN) {
                minesCounter--;
                counterMines(minesCounter);
            } else if (win.cond === CONDITION.UNFLAG) {
                minesCounter++;
                counterMines(minesCounter);
            }
            drawBoard(game);
            if (win.cond === CONDITION.WIN) {
                showWinState();
            }
            break;
        default:
            break;
    }
    
    Storage.setValue('game', game);
    Storage.setValue('minesCounter', minesCounter);
    Storage.setValue('isFinished', isFinished);
    return false;
}

let downed_keys = {};
function onDownCell(event) {
    downed_keys[event.which] = true;
}

function onMoveCell(event) {
    
}

function onUpCell(event) {
    let key = event.which;
    if (downed_keys[1] && downed_keys[3]) {
        key = 2;
    } 
    handleCellClick(event.target, key);
    downed_keys[event.which] = false;
}

function drawEmptyBoard(matrix) {
    let matrixElement = document.querySelector('.play_field');
    for (let i = 0; i < matrix.length; i++) {
        let rowElement = document.createElement('div');
        rowElement.className = "row";
        for (let j = 0; j < matrix[i].length; j++) {
            let cellElement = document.createElement('div');
            cellElement.className = "cell cell--unknown";
            cellElement.id = "c_" + i + "_" + j;
        //    cellElement.addEventListener('mousedown', onClickCell, false);
            cellElement.oncontextmenu=() => { return false;};
            rowElement.append(cellElement);
        }
        matrixElement.append(rowElement);
    }
    matrixElement.addEventListener('mousedown', onDownCell, false);
    matrixElement.addEventListener('mousemove', onMoveCell, false);
    matrixElement.addEventListener('mouseup', onUpCell, false);
}

function drawCell(cellDOM, x, y) {
    let className = "cell";
    switch (game[x][y]) {
        case STATE.MARK - 1:
        case STATE.MARK:
        case STATE.MARK + 1:
        case STATE.MARK + 2:
        case STATE.MARK + 3:
        case STATE.MARK + 4:
        case STATE.MARK + 5:
        case STATE.MARK + 6:
        case STATE.MARK + 7:
        case STATE.MARK + 8: 
            className = "cell cell--flag";
            break;
        case STATE.SHOW - 1:
            className = "cell cell--boom";
            break;
        case STATE.SHOW:
            className = "cell";
            break;
        case STATE.SHOW + 1:
            className = "cell cell--one";
            break;
        case STATE.SHOW + 2:
            className = "cell cell--two";
            break;
        case STATE.SHOW + 3:
            className = "cell cell--three";
            break;
        case STATE.SHOW + 4:
            className = "cell cell--four";
            break;
        case STATE.SHOW + 5:
            className = "cell cell--five";
            break;
        case STATE.SHOW + 6:
            className = "cell cell--six";
            break;
        case STATE.SHOW + 7:
            className = "cell cell--seven";
            break;
        case STATE.SHOW + 8:
            className = "cell cell--eight";
            break;
        default:
            className = "cell cell--unknown";
            break;
    };
    cellDOM.className = className;
}

function drawBoard(matrix) {
    let matrixElement = document.querySelector('.play_field');
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let cellElement = document.querySelector(`#c_${i}_${j}`);
            drawCell(cellElement, i, j);   
        }
    }
}

/**
 * restartGame
 * @param   integer     _difficulty     difficulty level
 * @param   DOM         _difficultyDOM  difficulty level DOM element
 */
function restartGame(_difficulty, _difficultyDOM) {
    hideState();
    clearBoard();
    game = [];
    minesCounter = DIFICULTY_LEVEL[_difficulty - 1][2];
    Storage.setValue("level", _difficulty);
    let rows = DIFICULTY_LEVEL[_difficulty - 1][0];
    let cols = DIFICULTY_LEVEL[_difficulty - 1][1];
    let mines = DIFICULTY_LEVEL[_difficulty - 1][2];
    game = createBoard(rows,cols,mines);
    counterMines(minesCounter);
    drawEmptyBoard(game);
    resizeWindow(_difficulty);
}

/**
 * switchDifficulty
 * @param   integer     _difficulty     difficulty level
 * @param   DOM         _difficultyDOM  difficulty level DOM element
 */
function switchDifficulty(_difficulty, _difficultyDOM) {
    restartGame(_difficulty, _difficultyDOM);
    document.querySelector('select').selectedIndex = _difficulty - 1;
    difficulty_level = _difficulty;
}

let game = null;
let difficulty_level = Storage.getValue('level') != undefined ? Storage.getValue('level') : 1;
document.querySelector('select').selectedIndex = difficulty_level - 1;
restartGame(difficulty_level, null);

/**
 * getEndState
 */
function getEndState() {
    clearInterval(tmrCounter);
    tmrCounter = -1;
    tmrSecs = 0;
    //document.querySelector(".extension_wrapper").className = "extension_wrapper show_overlay";
}
/**
 * createNewGame
 */
function getStartState(secs = 0) {
    tmrSecs = secs;
    clearInterval(tmrCounter);
    tmrCounter = setInterval(() => { counter();}, 1E3);
    counter();
}
function counter() {
    drawNumber(document.querySelector('.timer-classic').getContext('2d'), document.querySelector('.timer-classic').width, document.querySelector('.timer-classic').height, tmrSecs, 0, 0);
    document.querySelector(".timer-modern").textContent = tmrSecs < 10 ? "00" + tmrSecs : (tmrSecs < 100 ? "0" + tmrSecs : tmrSecs);
    //document.querySelector(".time-text").textContent = getLocalsMessage("time"); 
    //document.querySelector(".time-num").textContent = tmrSecs + getLocalsMessage("sec"); 
    tmrSecs++;
    Storage.setValue('tmrSecs', tmrSecs);
}

function hideState() {
    isFinished = false;
    tmrSecs = 0;
    getEndState();
    counter();
    document.querySelector('.state-win').style = "display: none;";
    document.querySelector('.state-lose').style = "display: none;";
    document.querySelector('.state-btn').className = "state-btn classic_item";
}

function showWinState() {
    try {SocialModuleInstance && SocialModuleInstance.showSocial();} catch(e) {}
    getEndState();
    counterMines(0);
    isFinished = true;
    document.querySelector('.state-win').style = "display: block;";
    document.querySelector('.state-btn').className = "state-btn classic_item state-btn--win";
}

function showLoseState() {
    try {SocialModuleInstance && SocialModuleInstance.showSocial();} catch(e) {}
    getEndState();
    isFinished = true;
    document.querySelector('.state-lose').style = "display: block;";
    document.querySelector('.state-btn').className = "state-btn classic_item state-btn--lose";
}

function counterMines(counter) {
    if (counter < 0)
        counter = 0;
    drawNumber(document.querySelector('.counter-classic').getContext('2d'), document.querySelector('.counter-classic').width, document.querySelector('.counter-classic').height, counter, 0, 0);
    document.querySelector(".counter-modern").textContent = counter < 10 ? "0" + counter : counter;
}

/**
 */
function drawNumber(ctx, width, height, number, offsetX = 0, offsetY = 0) {
    number = number%1000;
    let digits = [0, 0, 0];
    let str = "" + number;
    for (let c = 0; c < str.length; c++) {
        digits[str.length - 1 - c] = parseInt(str[c]);
    }
    let digitWidth = width/digits.length;
    for (let i = digits.length - 1; i >= 0; i--) {
        drawDigit(ctx, digitWidth, height, offsetX + digitWidth * (digits.length - 1 - i), offsetY, digits[i]);
    }
}

function drawDigit(ctx, width = 100, height = 150, offsetX = 0, offsetY = 0, digit = 8) {
    ctx.clearRect(offsetX, offsetY, width, height);
    let numCoords = [
        [[2, 1], [11, 1], [8, 4], [5, 4]],
        [[1, 2], [4, 5], [4, 8], [1, 11]],
        [[9, 5], [12, 2], [12, 11], [9, 8]],
        [[5, 10], [8, 10], [11, 12], [8, 14], [5, 14], [2, 12]],
        [[1, 13], [4, 16], [4, 19], [1, 22]],
        [[9, 16], [12, 13], [12, 22], [9, 19]],
        [[2, 23], [5, 20], [8, 20], [11, 23]]
    ];
    let digits = [
        [0, 1, 2, 4, 5, 6],
        [2, 5], 
        [0, 2, 3, 4, 6],
        [0, 2, 3, 5, 6],
        [1, 2, 3, 5],
        [0, 1, 3, 5, 6],
        [0, 1, 3, 4, 5, 6],
        [0, 2, 5],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 5, 6]
    ];
    for (let n = 0; n < digits[digit].length; n++) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(offsetX + numCoords[digits[digit][n]][0][0] * width/13,offsetY + numCoords[digits[digit][n]][0][1] * height/23);
        for (let p = 1; p < numCoords[digits[digit][n]].length; p++) {
            ctx.lineTo(offsetX + numCoords[digits[digit][n]][p][0] * width/13,offsetY + numCoords[digits[digit][n]][p][1] * height/23);
        }
        ctx.fill();
    }
}

function resizeWindow(_difficulty) {
    //document.querySelector('.extension_wrapper').style.height = _difficulty === 1 ? "368px" : (_difficulty === 2 ? "458px" : "458px");
}

(() => {
    GUILocalization();
    clearBoard();
    drawEmptyBoard(game);
    if (Storage.getValue('isFinished') === false) {
        game = Storage.getValue('game');
        minesCounter = Storage.getValue('minesCounter');
        tmrSecs = savedSecs - 1;
        counter();
        drawBoard(game);
    }
    counterMines(minesCounter);
    resizeWindow(difficulty_level);
    document.querySelector(".extension_wrapper").className = `extension_wrapper theme-${UI_SubTheme} style-${UI_Theme}`;
    (UI_SubTheme === "dark") ? document.querySelector("#gameTheme").className = "game_theme modern_item game_theme--active" : document.querySelector("#gameTheme").className = "game_theme modern_item";
    document.querySelector("#gameStyle").onclick = (event) => {
        if (document.querySelector(".extension_wrapper").className.indexOf("style-classic") === -1) {
            document.querySelector("#gameStyle").className = "game_style game_theme--active";
            document.querySelector("#gameTheme").className = "game_theme modern_item";
            document.querySelector(".extension_wrapper").className = `extension_wrapper theme-${Storage.getValue("UI_SubTheme") ? Storage.getValue("UI_SubTheme") : "white"} style-classic`;
            Storage.setValue("UI_Theme", "classic");
        } else {
            document.querySelector("#gameStyle").className = "game_style";
            document.querySelector(".extension_wrapper").className = `extension_wrapper theme-${Storage.getValue("UI_SubTheme") ? Storage.getValue("UI_SubTheme") : "white"} style-modern`;
            Storage.setValue("UI_Theme", "modern");
        }
    }
    document.querySelector("#gameTheme").onclick = (event) => {
        if (document.querySelector(".extension_wrapper").className.indexOf("theme-dark") === -1) {
            document.querySelector("#gameTheme").className = "game_theme modern_item game_theme--active";
            document.querySelector(".extension_wrapper").className = `extension_wrapper theme-dark style-modern`;
            Storage.setValue("UI_SubTheme", "dark");
        } else {
            document.querySelector("#gameTheme").className = "game_theme modern_item";
            document.querySelector(".extension_wrapper").className = `extension_wrapper theme-white style-modern`;
            Storage.setValue("UI_SubTheme", "white");
        }
    }
    document.querySelector('#new_game').onclick = (event) => {
        restartGame(difficulty_level, null);
        Storage.setValue('game', game);
        Storage.setValue('minesCounter', minesCounter);
        Storage.setValue('isFinished', true);
    }
    document.querySelector('.state-btn').onclick = (event) => {
        restartGame(difficulty_level, null);
        Storage.setValue('game', game);
        Storage.setValue('minesCounter', minesCounter);
        Storage.setValue('isFinished', true);
    }
    document.querySelector('select').onchange = (event) => { 
        switch(event.target.value) {
            case 'beginner':
                switchDifficulty(1, event.target);
                break;
            case 'intermediate':
                switchDifficulty(2, event.target);
                break;
            case 'advanced':
                switchDifficulty(3, event.target);
                break;
            default:
                switchDifficulty(1, event.target);
                break;       
        }
        Storage.setValue('game', game);
        Storage.setValue('minesCounter', minesCounter);
        Storage.setValue('isFinished', true);
    }
    
    // fixing FF render problems
    if (window.navigator.userAgent.indexOf("Firefox/") > 0) {
        setTimeout(function() {
            document.body.classList.add('ff');
        }, 150);
    }
})();

