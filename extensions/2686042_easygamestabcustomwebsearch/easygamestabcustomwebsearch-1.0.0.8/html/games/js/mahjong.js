/*
Copyright (c) 2021 by nagtkk (https://codepen.io/nagtkk/pen/bGGrVMg)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 */

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 下準備
var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    random = Math.random;

var pick = function pick(a) {
  return a.splice(a.length * random(), 1)[0];
};

var range = function range(start, stop, step) {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  step = step || (stop < start ? -1 : 1);
  var length = max(0, ceil((stop - start) / step));
  return Array.from({
    length: length
  }, function (_, i) {
    return start + step * i;
  });
}; // コピーして上書き、CodePen だと Spread Properties を変換できないようなので


var overwrite = function overwrite(a, b) {
  return Object.assign({}, a, b);
}; // 盤面設定


var W = 32; // 横

var H = 17; // 縦

var D = 5; // 高さ

var N = W * H * D; // マスの数
// 座標とインデックスの相互変換

var X = function X(p) {
  return p % W;
};

var Y = function Y(p) {
  return floor(p / W) % H;
};

var Z = function Z(p) {
  return floor(p / W / H);
};

var fromXYZ = function fromXYZ(x, y, z) {
  return (z * H + y) * W + x;
}; // 牌IDから牌の種類を取得


var group = function group(v) {
  return floor(v / 4);
}; // ゲーム状態の生成
// stage は牌の積み方。長さ W * H * D の 0 or 1 の配列


var create = function create(stage) {
  var tileCount = stage.reduce(function (n, v) {
    return n + (v ? 1 : 0);
  }, 0); // 無地上海を準備

  var temporal = stage.slice(0);

  var nextPositionPair = function nextPositionPair() {
    // 自由牌の集合を見つける
    var freePositions = range(N).filter(function (p) {
      return isFree(temporal, p);
    }); // 自由牌の個数

    var count = freePositions.length;

    if (count < 2) {
      throw new Error("unreachable"); // ここに来てたらそもそも積み方がおかしい or バグ
    }

    var p1 = freePositions[count - 1]; // 一番高いもの

    var p2 = freePositions[count - 2]; // 二番目に高いもの

    var diff = Z(p1) - Z(p2); // 高低差

    var p;

    if (diff + 2 >= count) {
      // 詰みルート突入の可能性アリ
      p = freePositions.pop(); // 最も高いものを取る (高低差を埋める)
    } else {
      p = pick(freePositions); // ランダムに取る
    }

    var q = pick(freePositions); // ランダムに取る

    temporal[p] = temporal[q] = 0; // 選んだ二つの組の位置を返す

    return [p, q];
  }; // 同種ペアの配列を作る。牌IDは4以上の整数。


  var tilePairs = range(tileCount / 2).map(function (i) {
    return [4 + 2 * i, 4 + 2 * i + 1];
  }); // 盤面を作る

  var board = []; // 初期値はすべて 0 (さぼって undefined のまま)

  range(tileCount / 2).forEach(function (_) {
    var _nextPositionPair = nextPositionPair(),
        _nextPositionPair2 = _slicedToArray(_nextPositionPair, 2),
        p1 = _nextPositionPair2[0],
        p2 = _nextPositionPair2[1]; // 無地上海を一手解いて位置を取得


    var _pick = pick(tilePairs),
        _pick2 = _slicedToArray(_pick, 2),
        v1 = _pick2[0],
        v2 = _pick2[1]; // 柄当てはめ


    board[p1] = v1; // 実際の上海の盤面に追加

    board[p2] = v2; // 実際の上海の盤面に追加
  });
  return {
    board: board,
    // 盤面
    target: -1,
    // 選択牌座標(未選択は-1)
    rest: tileCount // 残りの牌の数

  };
}; // 状態の更新, state: 前の状態, p: 選択インデックス


var update = function update(state, p) {
  var board = state.board,
      target = state.target,
      rest = state.rest; // 自由牌でないなら未選択に

  if (!isFree(board, p)) {
    return {
      board: board,
      rest: rest,
      target: -1
    };
  } // 選択済みの牌が無いなら選択状態に


  if (target < 0) {
    return {
      board: board,
      rest: rest,
      target: p
    };
  } // 条件を満たしていなければ未選択に


  if (p === target || group(board[p]) !== group(board[target])) {
    return {
      board: board,
      rest: rest,
      target: -1
    };
  } // ペアを取り除いて未選択に


  return {
    board: board.map(function (v, i) {
      return i === p || i === target ? 0 : v;
    }),
    target: -1,
    rest: rest - 2
  };
}; // 自由牌か否かを判定する


var isFree = function isFree(board, p) {
  // そもそも牌が無いなら false
  if (!board[p]) {
    return false;
  }

  var x = X(p);
  var y = Y(p);
  var z = Z(p);
  return ( // 左右どちらかが空いている
  range(-1, 2).every(function (dy) {
    return !board[fromXYZ(x - 2, y + dy, z)];
  }) || range(-1, 2).every(function (dy) {
    return !board[fromXYZ(x + 2, y + dy, z)];
  })) && // 牌の上に何も重なっていない
  range(-1, 2).every(function (dy) {
    return range(-1, 2).every(function (dx) {
      return !board[fromXYZ(x + dx, y + dy, z + 1)];
    });
  });
}; // とれる牌の組を探す


var findPair = function findPair(board) {
  var pairs = {};

  var _iterator = _createForOfIteratorHelper(board.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          p = _step$value[0],
          t = _step$value[1];

      if (!isFree(board, p)) continue;
      var v = group(t);

      if (pairs[v]) {
        return [p, pairs[v]];
      } else {
        pairs[v] = p;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}; // 牌の文字


var tileChar = function tileChar(t) {
  var v = group(t);
  return v < 1 ? '' : v < 8 ? '東南西北中發　'[v - 1] : v < 17 ? '一二三四五六七八九'[v - 8] : v < 26 ? String.fromCharCode(0x2160 + v - 17) : v < 35 ? String.fromCharCode(0x0031 + v - 26) : v == 35 ? '春夏秋冬'[t % 4] : '梅蘭菊竹'[t % 4];
}; // 牌の文字色


var tileColor = function tileColor(t) {
  var v = group(t);
  return v < 1 ? 'black' : v < 5 ? '#333' : v < 8 ? ['red', 'green', 'black'][v - 5] : v < 17 ? 'red' : v < 26 ? 'green' : v < 35 ? 'navy' : v === 35 ? 'sienna' : 'purple';
};

var main = function main() {
  // control
  // 状態はスタックで持つ (適当に作ったのでやや非効率)
  var stack = [];

  var getState = function getState() {
    return stack[stack.length - 1];
  };

  var setState = function setState(state) {
    while (stack.length && getState().rest <= state.rest) {
      stack.pop();
    }

    stack.push(state);
    render(state);
  }; // 各種操作


  var stage = TURTLE; // 牌の積み方、定義は下の方に

  var init = function init() {
    stack.length = 0;
    setState(create(stage));
  };

  var undo = function undo() {
    if (stack.length > 1) {
      setState(overwrite(stack[stack.length - 2], {
        target: -1
      }));
    }
  };

  var reset = function reset() {
    if (stack.length > 0) {
      setState(overwrite(stack[0], {
        target: -1
      }));
    }
  };

  var select = function select(p) {
    setState(update(getState(), p));
  }; // view

  $('head').append("<style>"+STYLE+"</style>");
  var message = document.createElement('p');

  var div = function div() {
    return document.createElement('div');
  };

  var view = div();
  view.classList.add('view');
  var cells = range(D).flatMap(function (z) {
    var table = div();
    view.append(table);
    return range(H).flatMap(function (y) {
      var row = div();
      table.append(row);
      return range(W).map(function (x) {
        var cell = div();
        cell.style.zIndex = x;
        row.append(cell);
        var p = fromXYZ(x, y, z);

        if (stage[p]) {
          var tile = div();
          tile.classList.add('tile');
          cell.append(tile);

          tile.onclick = function (e) {
            return select(p);
          };
        }

        return cell;
      });
    });
  });
  var actions = [['Undo', undo], ['Reset', reset], ['New', init]];
  var buttons = document.createElement('p');

  var _loop = function _loop() {
    var _actions$_i = _slicedToArray(_actions[_i2], 2),
        name = _actions$_i[0],
        action = _actions$_i[1];

    var button = document.createElement('button');
    button.type = 'button';
    button.innerText = escapeHtml(name);

    button.onclick = function (e) {
      button.blur();
      action(e);
    };

    buttons.append(button);
  };

  for (var _i2 = 0, _actions = actions; _i2 < _actions.length; _i2++) {
    _loop();
  }

  document.body.append(message, view, buttons);

  var render = function render(_ref) {
    var board = _ref.board,
        target = _ref.target,
        rest = _ref.rest;
    range(N).forEach(function (p) {
      var value = board[p];
      var cell = cells[p];
      var tile = cell.firstChild;
      if (!tile) return;
      tile.style.color = tileColor(escapeHtml(value));
      tile.innerText = tileChar(escapeHtml(value));
      var list = tile.classList;
      list.remove('selected', 'none');

      if (value === 0) {
        list.add('none');
      } else if (target === p) {
        list.add('selected');
      }
    });

    if (!rest) {
      message.innerText = 'clear!';
    } else if (!findPair(board)) {
      message.innerText = 'game over!';
    } else {
      message.innerText = escapeHtml((rest / 2)) + ' pairs left.';
    }
  };

  init();
};

var STYLE = "\nbody {\n  background: #242;\n}\n.tile {\n  /* font-family: serif; */\n  font-family: \"\u6E38\u660E\u671D\",\"Yu Mincho\",YuMincho,\"Hiragino Mincho ProN\",\"Hiragino Mincho Pro\",\"HGS\u660E\u671DE\",\u30E1\u30A4\u30EA\u30AA,Meiryo,serif;\n  font-weight: bold;\n  box-sizing: border-box;\n  width: 1.5em;\n  height: 2em;\n  line-height: 2em;\n  text-align: center;\n  background: #f8f8f8;\n  border-radius: 0.125em;\n  border: 1px solid #999;\n  position: relative;\n  box-shadow: 0.1em 0.1em 0px 0px #999, 0.2em 0.2em 0px 0px #963;\n  cursor: pointer;\n  user-select: none;\n  pointer-events: auto;\n  color: #333;\n  padding-left: 2px;\n  text-shadow: -1px 0px 0px #000, 1px 1px 0px #fff;\n  transition: border-color 0.05s linear, box-shadow 0.05s linear;\n  transition: visibility 0.1s linear, opacity 0.1s linear;\n}\n.tile.selected {\n  border-color: red;\n  box-shadow: 0px 0px 2px 2px #f33,\n    0.1em 0.1em 0px 0px #999,\n    0.2em 0.2em 0px 0px #963;\n}\n.tile:after,.tile:before {\n  position:absolute;\n  content: '';\n  width: 0.2em;\n  height: 0.2em;\n  background: #963;\n  z-index: -1;\n  transition: visibility 0.1s step-end, opacity 0.1s step-end;\n}\n.tile:after {\n  top:-1px;right:0;\n  transform-origin: top right;\n  transform: scale(1.4) rotate(-45deg);\n}\n.tile:before {\n  bottom:0;left:-1px;\n  transform-origin: bottom left;\n  transform: scale(1.4) rotate(45deg);\n}\n.view {\n  font-size: 125%;\n  position: relative;\n  pointer-events: none;\n  margin: 0 auto;\n  padding-bottom: 2em;\n  width: 24em;\n}\n.view > div {\n  display: block;\n}\n.view > div:not(:first-child) { position:absolute;top:0;left:0; }\n.view > div:nth-child(4) { transform: translate(0.25em, 0.25em); }\n.view > div:nth-child(3) { transform: translate(0.5em, 0.5em); }\n.view > div:nth-child(2) { transform: translate(0.75em, 0.75em); }\n.view > div:nth-child(1) { transform: translate(1em, 1em); }\n.view > div > div {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  height: 1em;\n}\n.view > div > div > div {\n  flex-shrink: 0;\n  display: inline-block;\n  width: 0.75em;\n  height: 1em;\n  overflow: visible;\n}\n.tile.none {\n  box-shadow: none;\n  visibility: hidden;\n  opacity: 0;\n}\n.tile.none:after,\n.tile.none:before {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0.1s step-start, opacity 0.1s step-start;\n}\np {\n  text-align: center;\n  font: bold 1.5rem serif;\n  margin: 0;\n  color: white;\n}\nbutton {\n  font: bold 1rem serif;\n  color: white;\n  background: transparent;\n  border: 2px solid transparent;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  user-select: none;\n  transition: border-color 0.1s ease-in;\n  margin: 0 1em;\n  padding: 0.25em 0.5em;\n}\nbutton:hover, button:active {\n  border-color: white;\n}\n";
var TURTLE = [// layer 1
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // layer2
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // layer3
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // layer4
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // layer5
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
main();