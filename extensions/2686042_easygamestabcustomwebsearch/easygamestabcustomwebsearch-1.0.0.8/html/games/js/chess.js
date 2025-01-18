"use strict";

/**
 * Chess namespace, constants and utility functions.
 * @constructor
 */
function Chess() {
}

/**
 * Number of ranks (rows) in a chess board.
 * Notice that we store a rank as 0-7 and display it as 1-8.
 * @const
 * @type {number}
 */
Chess.RANKS = 8;

/**
 * @const
 * @type {number}
 */
Chess.LAST_RANK = Chess.RANKS - 1;

/**
 * Number of files (columns) in a chess board
 * Notice that we store a file as 0-7 and display it as a-h.
 * @const
 * @type {number}
 *
 */
Chess.FILES = 8;

/**
 * @const
 * @type {number}
 */
Chess.LAST_FILE = Chess.FILES - 1;

/**
 * @const
 * @type {string}
 */
Chess.FILE_CHARACTERS = "abcdefgh";

/**
 * @const
 * @type {string}
 */
Chess.RANK_CHARACTERS = "12345678";

/** @enum {number} */
Chess.Piece = {
	PAWN: 0,
	KNIGHT: 1,
	BISHOP: 2,
	ROOK: 3,
	QUEEN: 4,
	KING: 5
};

/** @enum {number} */
Chess.PieceColor = {
	WHITE: 0,
	BLACK: 1
};

/**
 * @const
 * @type {!Array.<string>}
 */
Chess.PIECE_NAMES = [ "pawn", "knight", "bishop", "rook", "queen", "king" ];

/**
 * @const
 * @type {string}
 */
Chess.PIECE_ALGEBRAIC_NAMES = " NBRQK";

/**
 * @const
 * @type {string}
 * @see http://goo.gl/OHlAI
 */
Chess.PIECE_CHARACTERS = "\u2659\u265F\u2658\u265E\u2657\u265D\u2656\u265C\u2655\u265B\u2654\u265A";

/**
 * @param {number} index 0-63
 * @return {number} rank 0-7
 */
Chess.getRank = function(index) {
	return index >>> 3;
};

/**
 * @param {number} index 0-63
 * @return {number} file 0-7
 */
Chess.getFile = function(index) {
	return index & 7;
};

/**
 * @param {number} rank
 * @param {number} file
 * @return {boolean} true if rank >= 0 && rank < 8 && file >= 0 && file < 8
 */
Chess.isInsideBoard = function(rank, file) {
	return !((rank | file) & ~7);
};

/**
 * Least significant file index
 * @see http://goo.gl/9frpl
 * @param {number} rank 0-7
 * @param {number} file 0-7
 * @return {number} 0-63
 */
Chess.getIndex = function(rank, file) {
	return file + rank * Chess.FILES;
};

/**
 * @param {number} rank 0-7
 * @param {number} file 0-7
 * @return {boolean} true if the Chess square at rank, file is light
 */
Chess.isLight = function(rank, file) {
	return !!((rank + file) % 2);
};

/**
 * @param {number} rank 0-7
 * @param {number} file 0-7
 * @return {string} a1-h8
 */
Chess.getAlgebraic = function(rank, file) {
	return Chess.FILE_CHARACTERS[file] + Chess.RANK_CHARACTERS[rank];
};

/**
 * @param {string} algebraic a1-h8
 * @return {number} index 0-63
 */
Chess.getIndexFromAlgebraic = function(algebraic) {
	var file = Chess.FILE_CHARACTERS.indexOf(algebraic[0]);
	var rank = Chess.RANK_CHARACTERS.indexOf(algebraic[1]);
	return Chess.getIndex(rank, file);
};

/**
 * @param {number} index 0-63
 * @return {string} a1-h8
 */
Chess.getAlgebraicFromIndex = function(index) {
	return Chess.getAlgebraic(Chess.getRank(index), Chess.getFile(index));
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color
 * @return {string} A Unicode character corresponding to the piece and color
 */
Chess.getPieceCharacter = function(piece, color) {
	return Chess.PIECE_CHARACTERS.charAt(piece * 2 + color);
};

/**
 * @param {!Chess.PieceColor} color
 * @return {!Chess.PieceColor}
 */
Chess.getOtherPieceColor = function(color) {
	return /** @type {!Chess.PieceColor} */(color ^ 1);
};
"use strict";

/**
 * Chess.Bitboard is an unsigned 64 bit integer, each bit representing a boolean value on the corresponding chessboard square.
 * The boolean values represent existence of a piece on the square.
 * The 64 bit unsigned integer is implemented as combination of two 32 bit unsigned integers.
 * @constructor
 * @param {number} low Lower 32 bits of the 64 bit value
 * @param {number} high Upper 32 bits of the 64 bit value
 * TODO: test using three numbers here instead of two: 31 bit integers are faster than 32 bit ones in chrome (https://v8-io12.appspot.com/#35)
 */
Chess.Bitboard = function(low, high) {
	/**
	 * Lower 32 bits of the 64 bit value
	 * @type {number}
	 */
	this.low = low >>> 0;

	/**
	 * Upper 32 bits of the 64 bit value
	 * @type {number}
	 */
	this.high = high >>> 0;
};

/**
 * @see http://goo.gl/pyzBq (Bit Twiddling Hacks)
 * @see http://goo.gl/dnqDn (Bit-peeking bits of JavaScript)
 * @param {number} v 32 bit integer
 * @return {number} 0-32 number of bits set in v
 */
Chess.Bitboard.popcnt32 = function(v) {
	v >>>= 0;
	v -= (v >>> 1) & 0x55555555;
	v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
	return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
};

/**
 * @param {number} v 32 bit integer
 * @return {number} v with its lowest bit cleared
 */
Chess.Bitboard.popLowestBit32 = function (v) {
	v >>>= 0;
	return (v & (v - 1)) >>> 0;
};

/**
 * @param {number} v 32 bit integer, non-zero. Undefined behavior if v is zero.
 * @return {number} 0-31 Position of first set bit
 */
Chess.Bitboard.getLowestBitPosition32 = function(v) {
	v >>>= 0;
	return Chess.Bitboard.popcnt32((v & -v) - 1);
};

/** @return {number} 0-64 number of bits set in this Chess.Bitboard */
Chess.Bitboard.prototype.popcnt = function() {
	return Chess.Bitboard.popcnt32(this.low) + Chess.Bitboard.popcnt32(this.high);
};

/**
 * Clears the lowest set bit.
 * @return {!Chess.Bitboard} this with the lowest bit cleared
 */
Chess.Bitboard.prototype.popLowestBit = function() {
	if (this.low) {
		this.low = Chess.Bitboard.popLowestBit32(this.low);
	} else {
		this.high = Chess.Bitboard.popLowestBit32(this.high);
	}

	return this;
};

/** @return {number} 0-63 position of the first set bit. Undefined behavior if this Chess.Bitboard is empty. */
Chess.Bitboard.prototype.getLowestBitPosition = function() {
	if (this.low) {
		return Chess.Bitboard.getLowestBitPosition32(this.low);
	}

	return 32 + Chess.Bitboard.getLowestBitPosition32(this.high);
};

/**
 * Clears the lowest set bit and returns its position.
 * @return {number} 0-63 position of the first set bit. Undefined behavior if this Chess.Bitboard is empty.
 */
Chess.Bitboard.prototype.extractLowestBitPosition = function() {
	var index = this.getLowestBitPosition();
	this.popLowestBit();
	return index;
};

/** @return {boolean} true if all the bits in this Chess.Bitboard are zero */
Chess.Bitboard.prototype.isEmpty = function() {
	return !this.low && !this.high;
};

/**
 * @param {number} index 0-63
 * @return {boolean} true if the bit at index is 0
 */
Chess.Bitboard.prototype.isClear = function(index) {
	index >>>= 0;

	if (index < 32) {
		return !(this.low & (1 << index));
	}

	return !(this.high & (1 << (index - 32)));
};

/**
 * @param {number} index 0-63
 * @return {boolean} true if the bit at index is 1
 */
Chess.Bitboard.prototype.isSet = function(index) {
	return !this.isClear(index);
};

/**
 * @param {number} index 0-63
 * @return {!Chess.Bitboard} this or 1 << index
 */
Chess.Bitboard.prototype.setBit = function(index) {
	index >>>= 0;

	if (index < 32) {
		this.low = (this.low | (1 << index)) >>> 0;
	} else {
		this.high = (this.high | (1 << (index - 32))) >>> 0;
	}

	return this;
};

/**
 * @param {number} index 0-63
 * @return {!Chess.Bitboard} this and not 1 << index
 */
Chess.Bitboard.prototype.clearBit = function(index) {
	index >>>= 0;

	if (index < 32) {
		this.low = (this.low & ~(1 << index)) >>> 0;
	} else {
		this.high = (this.high & ~(1 << (index - 32))) >>> 0;
	}

	return this;
};

/**
 * @param {!Chess.Bitboard} other
 * @return {!Chess.Bitboard} this and other
 */
Chess.Bitboard.prototype.and = function(other) {
	this.low = (this.low & other.low) >>> 0;
	this.high = (this.high & other.high) >>> 0;

	return this;
};

/**
 * @param {!Chess.Bitboard} other
 * @return {!Chess.Bitboard} this and not other
 */
Chess.Bitboard.prototype.and_not = function(other) {
	this.low = (this.low & ~other.low) >>> 0;
	this.high = (this.high & ~other.high) >>> 0;

	return this;
};

/**
 * @param {!Chess.Bitboard} other
 * @return {!Chess.Bitboard} this or other
 */
Chess.Bitboard.prototype.or = function(other) {
	this.low = (this.low | other.low) >>> 0;
	this.high = (this.high | other.high) >>> 0;

	return this;
};

/**
 * @param {!Chess.Bitboard} other
 * @return {!Chess.Bitboard} this xor other
 */
Chess.Bitboard.prototype.xor = function(other) {
	this.low = (this.low ^ other.low) >>> 0;
	this.high = (this.high ^ other.high) >>> 0;

	return this;
};

/** @return {!Chess.Bitboard} not this */
Chess.Bitboard.prototype.not = function() {
	this.low = (~this.low) >>> 0;
	this.high = (~this.high) >>> 0;

	return this;
};

/**
 * Shifts this Chess.Bitboard left v bits. Undefined behavior if v is not in 0-63.
 * @param {number} v 0-63 number of bits to shift
 * @return {!Chess.Bitboard} this << v
 */
Chess.Bitboard.prototype.shl = function(v) {
	v >>>= 0;

	if (v > 31) {
		this.high = (this.low << (v - 32)) >>> 0;
		this.low = 0 >>> 0;
	} else if (v > 0) {
		this.high = ((this.high << v) | (this.low >>> (32 - v))) >>> 0;
		this.low = (this.low << v) >>> 0;
	}

	return this;
};

/**
 * Shifts this Chess.Bitboard right v bits. Undefined behavior if v is not in 0-63.
 * @param {number} v 0-63 number of bits to shift
 * @return {!Chess.Bitboard} this >>> v
 */
Chess.Bitboard.prototype.shr = function(v) {
	v >>>= 0;

	if (v > 31) {
		this.low = this.high >>> (v - 32);
		this.high = 0 >>> 0;
	} else if (v > 0) {
		this.low = ((this.low >>> v) | (this.high << (32 - v))) >>> 0;
		this.high >>>= v;
	}

	return this;
};

/**
 * Shifts this Chess.Bitboard left v bits, where v can be negative for right shift.
 * @param {number} v number of bits to shift
 * @return {!Chess.Bitboard} this << v
 */
Chess.Bitboard.prototype.shiftLeft = function(v) {
	if (v > 63 || v < -63) {
		this.low = this.high = 0 >>> 0;
	} else if (v > 0) {
		this.shl(v);
	} else if (v < 0) {
		this.shr(-v);
	}

	return this;
};

/**
 * @param {!Chess.Bitboard} other
 * @return {boolean} 'this' equals 'other'
 */
Chess.Bitboard.prototype.isEqual = function(other) {
	return this.low === other.low && this.high === other.high;
};

/** @return {!Chess.Bitboard} copy of this */
Chess.Bitboard.prototype.dup = function() {
	return Chess.Bitboard.make(this.low, this.high);
};

/**
 * @param {number} low Lower 32 bits of the 64 bit value
 * @param {number} high Upper 32 bits of the 64 bit value
 * @return {!Chess.Bitboard}
 */
Chess.Bitboard.make = function(low, high) {
	return new Chess.Bitboard(low, high);
};

/** @return {!Chess.Bitboard} bitboard of all zeros */
Chess.Bitboard.makeZero = function() {
	return Chess.Bitboard.make(0, 0);
};

/** @return {!Chess.Bitboard} bitboard of all ones */
Chess.Bitboard.makeOne = function() {
	return Chess.Bitboard.make(0xFFFFFFFF, 0xFFFFFFFF);
};

/** @return {!Chess.Bitboard} bitboard of ones in light (white) squares, zeros in dark (black) squares */
Chess.Bitboard.makeLightSquares = function() {
	return Chess.Bitboard.make(0x55AA55AA, 0x55AA55AA);
};

/** @return {!Chess.Bitboard} bitboard of ones in dark squares, zeros in light squares */
Chess.Bitboard.makeDarkSquares = function() {
	return Chess.Bitboard.make(0xAA55AA55, 0xAA55AA55);
};

/**
 * @param {number} file
 * @return {!Chess.Bitboard} bitboard of ones in file, zeros elsewhere
 */
Chess.Bitboard.makeFile = function(file) {
	return Chess.Bitboard.make(0x01010101, 0x01010101).shl(file);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for each file */
Chess.Bitboard.makeFiles = function() {
	var b = [];
	for (var i = 0; i < 8; ++i) {
		b.push(Chess.Bitboard.makeFile(i));
	}
	return b;
};

/**
 * @param {number} rank
 * @return {!Chess.Bitboard} bitboard of ones in rank, zeros elsewhere
 */
Chess.Bitboard.makeRank = function(rank) {
	return Chess.Bitboard.make(0xFF, 0).shl(rank * 8);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for each rank */
Chess.Bitboard.makeRanks = function() {
	var b = [];
	for (var i = 0; i < 8; ++i) {
		b.push(Chess.Bitboard.makeRank(i));
	}
	return b;
};

/**
 * @param {number} index 0-63
 * @return {!Chess.Bitboard} bitboard of 1 at index, zero elsewhere
 */
Chess.Bitboard.makeIndex = function(index) {
	return Chess.Bitboard.makeZero().setBit(index);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for each index */
Chess.Bitboard.makeIndices = function() {
	var b = [];
	for (var i = 0; i < 64; ++i) {
		b.push(Chess.Bitboard.makeIndex(i));
	}
	return b;
};

/**
 * 0 diagonal is the main diagonal, positive numbers are superdiagonals, negative numbers subdiagonals.
 * @param {number} diagonal (-7)-7
 * @return {!Chess.Bitboard} bitboard with ones on diagonal, zeros elsewhere
 */
Chess.Bitboard.makeDiagonal = function(diagonal) {
	return Chess.Bitboard.make(0x10204080, 0x01020408).and(Chess.Bitboard.makeOne().shiftLeft(diagonal * 8)).shiftLeft(diagonal);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for each diagonal */
Chess.Bitboard.makeDiagonals = function() {
	var b = [];
	for (var i = -7; i < 8; ++i) {
		b.push(Chess.Bitboard.makeDiagonal(i));
	}
	return b;
};

/**
 * 0 diagonal is the main antidiagonal, positive numbers are subantidiagonals (below the main antidiagonal on the chessboard), negative numbers superantidiagonals.
 * @param {number} antidiagonal (-7)-7
 * @return {!Chess.Bitboard} bitboard with ones on antidiagonal, zeros elsewhere
 */
Chess.Bitboard.makeAntidiagonal = function(antidiagonal) {
	return Chess.Bitboard.make(0x08040201, 0x80402010).and(Chess.Bitboard.makeOne().shiftLeft(-antidiagonal * 8)).shiftLeft(antidiagonal);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for each antidiagonal */
Chess.Bitboard.makeAntidiagonals = function() {
	var b = [];
	for (var i = -7; i < 8; ++i) {
		b.push(Chess.Bitboard.makeAntidiagonal(i));
	}
	return b;
};

/**
 * @see http://goo.gl/MRA5s (Knight Pattern)
 * @param {number} index 0-63 chessboard square of the knight
 * @return {!Chess.Bitboard} knight target squares
 */
Chess.Bitboard.makeKnightMovement = function(index) {
	var b = Chess.Bitboard.makeZero().setBit(index);
	var l1 = b.dup().shr(1).and_not(Chess.Bitboard.FILES[7]);
	var l2 = b.dup().shr(2).and_not(Chess.Bitboard.FILES[7]).and_not(Chess.Bitboard.FILES[6]);
	var r1 = b.dup().shl(1).and_not(Chess.Bitboard.FILES[0]);
	var r2 = b.dup().shl(2).and_not(Chess.Bitboard.FILES[0]).and_not(Chess.Bitboard.FILES[1]);
	var v1 = l2.or(r2);
	var v2 = l1.or(r1);
	return v1.dup().shl(8).or(v1.shr(8)).or(v2.dup().shl(16)).or(v2.shr(16));
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for knight movement from each square */
Chess.Bitboard.makeKnightMovements = function() {
	var b = [];
	for (var i = 0; i < 64; ++i) {
		b.push(Chess.Bitboard.makeKnightMovement(i));
	}
	return b;
};

/**
 * @param {number} index 0-63 chessboard square of the king
 * @return {!Chess.Bitboard} king target squares
 */
Chess.Bitboard.makeKingMovement = function(index) {
	var b = Chess.Bitboard.makeZero().setBit(index);
	var c = b.dup().shr(1).and_not(Chess.Bitboard.FILES[7]).or(b.dup().shl(1).and_not(Chess.Bitboard.FILES[0]));
	var u = b.dup().or(c).shr(8);
	var d = b.dup().or(c).shl(8);
	return c.or(u).or(d);
};

/** @return {!Array.<!Chess.Bitboard>} bitboard for king movement from each square */
Chess.Bitboard.makeKingMovements = function() {
	var b = [];
	for (var i = 0; i < 64; ++i) {
		b.push(Chess.Bitboard.makeKingMovement(i));
	}
	return b;
};

/**
 * Chess.Bitboard of all zeros
 * @const
 * @type {!Chess.Bitboard}
 */
Chess.Bitboard.ZERO = Chess.Bitboard.makeZero();

/**
 * Chess.Bitboard of all ones
 * @const
 * @type {!Chess.Bitboard}
 */
Chess.Bitboard.ONE = Chess.Bitboard.makeOne();

/**
 * Chess.Bitboard of ones in light squares, zeros in dark squares
 * @const
 * @type {!Chess.Bitboard}
 */
Chess.Bitboard.LIGHT_SQUARES = Chess.Bitboard.makeLightSquares();

/**
 * Chess.Bitboard of ones in dark squares, zeros in light squares
 * @const
 * @type {!Chess.Bitboard}
 */
Chess.Bitboard.DARK_SQUARES = Chess.Bitboard.makeDarkSquares();

/**
 * Chess.Bitboards ones in corresponding file, zeros elsewhere
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.FILES = Chess.Bitboard.makeFiles();

/**
 * Chess.Bitboards ones in corresponding rank, zeros elsewhere
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.RANKS = Chess.Bitboard.makeRanks();

/**
 * Chess.Bitboards ones in corresponding diagonal, zeros elsewhere. Chess.Bitboard.DIAGONALS[7] = main diagonal, 0-6 = subdiagonals, 8-15 = superdiagonals
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.DIAGONALS = Chess.Bitboard.makeDiagonals();

/**
 * Chess.Bitboards ones in corresponding antidiagonal, zeros elsewhere. Chess.Bitboard.ANTIDIAGONALS[7] = main antidiagonal, 0-6 = superantidiagonals, 8-15 = subantidiagonals
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.ANTIDIAGONALS = Chess.Bitboard.makeAntidiagonals();

/**
 * 64 bitboards, one per chessboard square, for positions where knights can move from the corresponding square.
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.KNIGHT_MOVEMENTS = Chess.Bitboard.makeKnightMovements();

/**
 * 64 bitboards, one per chessboard square, for positions where kings can move from the corresponding square.
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Bitboard.KING_MOVEMENTS = Chess.Bitboard.makeKingMovements();
"use strict";

/**
 * Chess.Zobrist is a 64 bit Zobrist hash value.
 * Updates to the value can be easily reverted by making the same update again.
 * The idea is to maintain a hash of the chess position, so that detecting repeating states and caching information about seen states is faster.
 * The 64 bit value is implemented as two 32 bit integers, similarly to Bitboard.js.
 * @constructor
 * @param {number} low lower 32 bits of the 64 bit value
 * @param {number} high upper 32 bits of the 64 bit value
 * @see http://goo.gl/WNBQp (Zobrist hashing)
 */
Chess.Zobrist = function(low, high) {
	/** @type {number} */
	this.low = low >>> 0;

	/** @type {number} */
	this.high = high >>> 0;
};

/** @enum {number} */
Chess.Zobrist.Count = {
	TURN: 1 * 2,
	PIECE_COLOR_SQUARE: 6 * 2 * 64 * 2,
	CASTLING_RIGHTS: 16 * 2,
	EN_PASSANT_FILE: 8 * 2
};

/** @enum {number} */
Chess.Zobrist.Position = {
	TURN: 0,
	PIECE_COLOR_SQUARE: Chess.Zobrist.Count.TURN,
	CASTLING_RIGHTS: Chess.Zobrist.Count.TURN + Chess.Zobrist.Count.PIECE_COLOR_SQUARE,
	EN_PASSANT_FILE: Chess.Zobrist.Count.TURN + Chess.Zobrist.Count.PIECE_COLOR_SQUARE + Chess.Zobrist.Count.CASTLING_RIGHTS
};

/**
 * @param {number} count
 * @return {!Array.<number>}
 */
Chess.Zobrist.createRandomValues = function(count) {
	var a = [];
	for (var i = 0; i < count; ++i) {
		a.push((1 + Math.random() * 0xFFFFFFFF) >>> 0);
	}
	return a;
};

/**
 * @const
 * @type {!Array.<number>}
 */
Chess.Zobrist.RANDOM_VALUES = Chess.Zobrist.createRandomValues(Chess.Zobrist.Position.EN_PASSANT_FILE + Chess.Zobrist.Count.EN_PASSANT_FILE);

/**
 * @return {!Chess.Zobrist}
 */
Chess.Zobrist.prototype.dup = function() {
	return new Chess.Zobrist(this.low, this.high);
};

/**
 * @return {number} 32 bit key
 */
Chess.Zobrist.prototype.getHashKey = function() {
	return (this.low ^ this.high) >>> 0;
};

/**
 * @param {!Chess.Zobrist} zobrist
 * @return {boolean}
 */
Chess.Zobrist.prototype.isEqual = function(zobrist) {
	return (this.low === zobrist.low && this.high === zobrist.high);
};

/**
 * Xors Chess.Zobrist.RANDOM_VALUES[position .. position + RANDOM_VALUES_PER_ITEM] into this Zobrist hash key.
 * @param {number} position
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.update = function(position) {
	this.low = (this.low ^ Chess.Zobrist.RANDOM_VALUES[position]) >>> 0;
	this.high = (this.high ^ Chess.Zobrist.RANDOM_VALUES[position + 1]) >>> 0;
	return this;
};

/**
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updateTurn = function() {
	return this.update(Chess.Zobrist.Position.TURN);
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color
 * @param {number} index 0-63
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updatePieceColorSquare = function(piece, color, index) {
	return this.update(Chess.Zobrist.Position.PIECE_COLOR_SQUARE + piece + color * 6 + index * 6 * 2);
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color
 * @param {!Chess.Bitboard} bitboard
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updatePieceColorBitboard = function(piece, color, bitboard) {
	var bb = bitboard.dup();
	while (!bb.isEmpty()) {
		this.updatePieceColorSquare(piece, color, bb.extractLowestBitPosition());
	}
	return this;
};

/**
 * @param {number} castlingRights 0-15
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updateCastlingRights = function(castlingRights) {
	return this.update(Chess.Zobrist.Position.CASTLING_RIGHTS + castlingRights);
};

/**
 * @param {number} enPassantFile 0-7
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updateEnPassantFile = function(enPassantFile) {
	return this.update(Chess.Zobrist.Position.EN_PASSANT_FILE + enPassantFile);
};

/**
 * @param {number} enPassantSquare 0-63
 * @return {!Chess.Zobrist} this
 */
Chess.Zobrist.prototype.updateEnPassantSquare = function(enPassantSquare) {
	if (enPassantSquare >= 0) {
		return this.updateEnPassantFile(Chess.getFile(enPassantSquare));
	}
	return this;
};
"use strict";

/**
 * Representation of a chess move; a piece moves from square to another, possibly capturing another piece in the process.
 * @constructor
 * @param {number} from 0-63
 * @param {number} to 0-63
 * @param {!Chess.Move.Kind} kind
 * @param {!Chess.Piece} piece moving piece
 * @param {?Chess.Piece} capturedPiece N.B. null is stored as pawn
 */
Chess.Move = function(from, to, kind, piece, capturedPiece) {
	/**
	 * An integer value containing the source and destination square indices, the move kind, the moving piece, etc.
	 * @type {number}
	 */
	this.value = (to & 0x3F) | ((from & 0x3F) << 6) | ((kind & 0xF) << 12) | ((piece & 0x7) << 16) | (((capturedPiece | 0) & 0x7) << 19);
};

/**
 * @enum {number}
 * @see http://goo.gl/z5Rpl (Encoding Moves)
 */
Chess.Move.Kind = {
	POSITIONAL: 0,
	DOUBLE_PAWN_PUSH: 1,
	KING_CASTLE: 2, // kingside castle
	QUEEN_CASTLE: 3, // queenside castle
	CAPTURE: 4,
	EN_PASSANT_CAPTURE: 5,
	KNIGHT_PROMOTION: 8,
	BISHOP_PROMOTION: 9,
	ROOK_PROMOTION: 10,
	QUEEN_PROMOTION: 11,
	KNIGHT_PROMOTION_CAPTURE: 12,
	BISHOP_PROMOTION_CAPTURE: 13,
	ROOK_PROMOTION_CAPTURE: 14,
	QUEEN_PROMOTION_CAPTURE: 15
};

/** @return {number} 0-63 */
Chess.Move.prototype.getTo = function() {
	return this.value & 0x3F;
};

/** @return {number} 0-63 */
Chess.Move.prototype.getFrom = function() {
	return (this.value >>> 6) & 0x3F;
};

/** @return {!Chess.Move.Kind} */
Chess.Move.prototype.getKind = function() {
	return /** @type {!Chess.Move.Kind} */ ((this.value >>> 12) & 0xF);
};

/** @return {!Chess.Piece} */
Chess.Move.prototype.getPiece = function() {
	return /** @type {!Chess.Piece} */ ((this.value >>> 16) & 0x7);
};

/** @return {boolean} */
Chess.Move.prototype.isCapture = function() {
	return !!(this.getKind() & 4);
};

/**
 * @return {!Chess.Piece}
 */
Chess.Move.prototype.getCapturedPiece = function() {
	return /** @type {!Chess.Piece} */ ((this.value >>> 19) & 0x7);
};

/** @return {boolean} */
Chess.Move.prototype.isPromotion = function() {
	return !!(this.getKind() & 8);
};

/** @return {boolean} */
Chess.Move.prototype.isCastle = function() {
	return this.getKind() === Chess.Move.Kind.KING_CASTLE || this.getKind() === Chess.Move.Kind.QUEEN_CASTLE;
};

/** @return {!Chess.Piece} */
Chess.Move.prototype.getPromotedPiece = function() {
	if (this.isPromotion()) {
		return /** @type {!Chess.Piece} */ (Chess.Piece.KNIGHT + (this.getKind() & 3));
	}

	return Chess.Piece.PAWN;
};

/** @return {number} 0-63 */
Chess.Move.prototype.getCaptureSquare = function() {
	if (this.getKind() !== Chess.Move.Kind.EN_PASSANT_CAPTURE) {
		return this.getTo();
	}

	return this.getTo() + ((this.getFrom() < this.getTo()) ? -Chess.FILES : Chess.FILES);
};

/**
 * @return {string} long algebraic notation
 * @see http://goo.gl/h8hhf (Long algebraic notation)
 * We don't require the chess position here, so shorter notation is not used, and check, checkmate and game end are not reported.
 */
Chess.Move.prototype.getString = function() {
	if (!this.isCastle()) {
		return Chess.PIECE_ALGEBRAIC_NAMES.charAt(this.getPiece()) +
			Chess.getAlgebraicFromIndex(this.getFrom()) +
			(this.isCapture() ? "x" : "-") +
			Chess.getAlgebraicFromIndex(this.getTo()) +
			((this.getKind() === Chess.Move.Kind.EN_PASSANT_CAPTURE) ? "e.p." : "") +
			(this.isPromotion() ? Chess.PIECE_ALGEBRAIC_NAMES.charAt(this.getPromotedPiece()) : "");
	}

	return "0-0" + ((this.getKind() === Chess.Move.Kind.QUEEN_CASTLE) ? "-0" : "");
};
"use strict";

/**
 * Chess.Position contains current piece positions, player turn, etc; the game state.
 * It can generate a list of possible moves in the current game state, and apply moves to change state.
 * @constructor
 */
Chess.Position = function() {
	/**
	 * @type {!Chess.Zobrist}
	 */
	this.hashKey = new Chess.Zobrist(0, 0);

	/**
	 * Bitboards for each piece type, and for any white and black pieces.
	 * TODO: replace with a Uin32Array or a straight array of numbers? (then implement 64 bit bitboard operations on top of that)
	 * TODO: store kings as two indices? (there can only be one king per color)
	 * @type {!Array.<!Chess.Bitboard>}
	 */
	this.bitboards = [
		Chess.Bitboard.RANKS[1].dup().or(Chess.Bitboard.RANKS[6]), // pawns
		Chess.Bitboard.makeIndex(1).or(Chess.Bitboard.makeIndex(6)).or(Chess.Bitboard.makeIndex(57)).or(Chess.Bitboard.makeIndex(62)), // knights
		Chess.Bitboard.makeIndex(2).or(Chess.Bitboard.makeIndex(5)).or(Chess.Bitboard.makeIndex(58)).or(Chess.Bitboard.makeIndex(61)), // bishops
		Chess.Bitboard.makeIndex(0).or(Chess.Bitboard.makeIndex(7)).or(Chess.Bitboard.makeIndex(56)).or(Chess.Bitboard.makeIndex(63)), // rooks
		Chess.Bitboard.makeIndex(3).or(Chess.Bitboard.makeIndex(59)), // queens
		Chess.Bitboard.makeIndex(4).or(Chess.Bitboard.makeIndex(60)), // kings
		Chess.Bitboard.RANKS[0].dup().or(Chess.Bitboard.RANKS[1]), // white pieces
		Chess.Bitboard.RANKS[6].dup().or(Chess.Bitboard.RANKS[7]) // black pieces
	];

	/**
	 * 64 entry lookup table, holds a piece or null for each board square
	 * @type {!Array.<?Chess.Piece>}
	 */
	this.pieces = [];

	/**
	 * @type {!Chess.PieceColor}
	 */
	this.turn = Chess.PieceColor.WHITE;

	/**
	 * 1st bit: white can castle kingside
	 * 2nd bit: black can castle kingside
	 * 3rd bit: white can castle queenside
	 * 4th bit: black can castle queenside
	 * @type {number} 0-15
	 */
	this.castlingRights = 15;

	/**
	 * @type {number} 0-63
	 */
	this.enPassantSquare = -1;

	/**
	 * @type {number}
	 * @see http://goo.gl/xGY6o (Fifty-move rule)
	 */
	this.halfmoveClock = 0;

	/**
	 * @type {!Array.<!Chess.Move>}
	 */
	this.madeMoves = [];

	/**
	 * @type {!Array.<number>}
	 */
	this.irreversibleHistory = [];

	this.fillPiecesFromBitboards();
	this.updateHashKey();

	/**
	 * @type {!Array.<!Chess.Zobrist>}
	 */
	 this.hashHistory = [];

	// TODO: checking pieces?
	// TODO: separate occupied squares bitboard?
	// TODO: store kings as indices instead of bitboards?
};

/**
 * Chess.Bitboard for squares with white pieces in them
 * @const
 * @type {number}
 */
Chess.Position.ANY_WHITE = Chess.Piece.KING + 1;

/**
 * Chess.Bitboard for squares with black pieces in them
 * @const
 * @type {number}
 */
Chess.Position.ANY_BLACK = Chess.Position.ANY_WHITE + 1;

/**
 * Initial rook indices
 * @const
 * @type {!Array.<number>}
 */
Chess.Position.ROOK_INDICES = [7, 63, 0, 56];

/**
 * Bitmasks for avoiding sliding piece wrapping.
 * @const
 * @type {!Array.<!Chess.Bitboard>}
 */
Chess.Position.SLIDING_MASKS = [Chess.Bitboard.makeFile(Chess.LAST_FILE).not(), Chess.Bitboard.ONE, Chess.Bitboard.makeFile(0).not()];

/** @enum {number} */
Chess.Position.Status = {
	NORMAL: 0,
	CHECKMATE: 1,
	STALEMATE_DRAW: 2,
	FIFTY_MOVE_RULE_DRAW: 3,
	THREEFOLD_REPETITION_RULE_DRAW: 4,
	INSUFFICIENT_MATERIAL_DRAW: 5
};

/**
 * Perft: performance test
 * @param {number} depth how many half-moves to make
 * @param {Chess.Position=} chessPosition start position
 * @return {number} how many leaf nodes does the game tree have at the depth
 */
Chess.Position.perft = function(depth, chessPosition) {
	if (!depth) {
		return 1;
	}

	if (!chessPosition) {
		chessPosition = new Chess.Position;
	}

	/** @type {number} */ 
	var nodes = 0;

	chessPosition.getMoves(true).forEach(/** @param {!Chess.Move} move */ function(move) {
		if (chessPosition.makeMove(move)) {
			nodes += Chess.Position.perft(depth - 1, chessPosition);
			chessPosition.unmakeMove();
		}
	});

	return nodes;
};

/**
 * @param {boolean=} pseudoLegal true: also return moves that may not be possible (leave king in check)
 * @param {boolean=} onlyCaptures
 * @return {!Array.<!Chess.Move>} Possible moves in this chess position
 */
Chess.Position.prototype.getMoves = function(pseudoLegal, onlyCaptures) {
	var moves = this.generateMoves(!!onlyCaptures);
	return pseudoLegal ? moves : moves.filter(Chess.Position.prototype.isMoveLegal, this);
};

/**
 * @param {!Chess.PieceColor} color Chess.PieceColor.WHITE or Chess.PieceColor.BLACK
 * @return {!Chess.Bitboard} Squares occupied by any piece of the specified color
 */
Chess.Position.prototype.getColorBitboard = function(color) {
	return this.bitboards[Chess.Position.ANY_WHITE + color];
};

/**
 * @param {!Chess.Piece} piece
 * @return {!Chess.Bitboard} Bits set where specified piece exists
 */
Chess.Position.prototype.getPieceBitboard = function(piece) {
	return this.bitboards[piece];
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color
 * @return {!Chess.Bitboard} Bits set where specified piece with the specified color exists
 */
Chess.Position.prototype.getPieceColorBitboard = function(piece, color) {
	return this.bitboards[piece].dup().and(this.getColorBitboard(color));
};

/**
 * @param {!Chess.PieceColor} color
 * @return {number} 0-63
 */
Chess.Position.prototype.getKingPosition = function(color) {
	return this.getPieceColorBitboard(Chess.Piece.KING, color).getLowestBitPosition();
};

/** @return {!Chess.Bitboard} Squares occupied by any piece */
Chess.Position.prototype.getOccupiedBitboard = function() {
	return this.bitboards[Chess.Position.ANY_WHITE].dup().or(this.bitboards[Chess.Position.ANY_BLACK]);
};

/** @return {!Chess.Bitboard} Empty squares */
Chess.Position.prototype.getEmptyBitboard = function() {
	return this.getOccupiedBitboard().not();
};

/** @return {!Chess.PieceColor} */
Chess.Position.prototype.getTurnColor = function() {
	return this.turn;
};

/**
 * @param {number} index 0-63
 * @return {?Chess.Piece}
 */
Chess.Position.prototype.findPieceAtOrNull = function(index) {
	for (var piece = Chess.Piece.PAWN; piece <= Chess.Piece.KING; ++piece) {
		if (this.getPieceBitboard(piece).isSet(index)) {
			return piece;
		}
	}

	return null;
};

/**
 * @param {number} index 0-63
 * @return {?Chess.Piece}
 */
Chess.Position.prototype.getPieceAtOrNull = function(index) {
	return this.pieces[index];
};

/** Fills the piece lookup table from bitboards */
Chess.Position.prototype.fillPiecesFromBitboards = function() {
	this.pieces.length = 0;
	for (var index = 0; index < 64; ++index) {
		this.pieces.push(this.findPieceAtOrNull(index));
	}
};

/** Updates the hash key from turn, bitboards, castling rights and en passant square. Halfmove clock is not part of the hash */
Chess.Position.prototype.updateHashKey = function() {
	this.hashKey = new Chess.Zobrist(0, 0);

	if (this.getTurnColor()) {
		this.hashKey.updateTurn();
	}

	for (var color = Chess.PieceColor.WHITE; color <= Chess.PieceColor.BLACK; ++color) {
		for (var piece = Chess.Piece.PAWN; piece <= Chess.Piece.KING; ++piece) {
			this.hashKey.updatePieceColorBitboard(piece, color, this.getPieceColorBitboard(piece, color));
		}
	}

	this.hashKey.updateCastlingRights(this.castlingRights);
	this.hashKey.updateEnPassantSquare(this.enPassantSquare);
};

/**
 * @return {boolean}
 */
Chess.Position.prototype.isKingInCheck = function() {
	return this.isAttacked(Chess.getOtherPieceColor(this.getTurnColor()), this.getKingPosition(this.getTurnColor()));
};

/**
 * @param {!Chess.PieceColor} color white = attacks by white pieces
 * @param {!Chess.Bitboard} pawns
 * @return {!Chess.Bitboard}
 * N.B. no en passant attacks
 */
Chess.Position.makePawnAttackMask = function(color, pawns) {
	var white = (color === Chess.PieceColor.WHITE);
	var attacks1 = pawns.dup().and_not(Chess.Bitboard.FILES[0]).shiftLeft(white ? 7 : -9);
	var attacks2 = pawns.dup().and_not(Chess.Bitboard.FILES[Chess.LAST_FILE]).shiftLeft(white ? 9 : -7);
	return attacks1.or(attacks2);
};

/**
 * @param {!Chess.Bitboard} fromBB
 * @param {!Chess.Bitboard} occupied
 * @param {number} rankDirection
 * @param {number} fileDirection
 * @return {!Chess.Bitboard}
 * TODO: Kogge-Stone: http://chessprogramming.wikispaces.com/Kogge-Stone+Algorithm
 */
Chess.Position.makeSlidingAttackMask = function(fromBB, occupied, rankDirection, fileDirection) {
	var bb = Chess.Bitboard.makeZero();
	var direction = rankDirection * Chess.FILES + fileDirection;
	var mask = Chess.Position.SLIDING_MASKS[1 + fileDirection];

	for (fromBB.shiftLeft(direction); !fromBB.and(mask).isEmpty(); fromBB.and_not(occupied).shiftLeft(direction)) {
		bb.or(fromBB);
	}

	return bb;
};

/**
 * @param {!Chess.Bitboard} fromBB
 * @param {!Chess.Bitboard} occupied
 * @return {!Chess.Bitboard}
 */
Chess.Position.makeBishopAttackMask = function(fromBB, occupied) {
	return Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, 1, 1).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, 1, -1)).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, -1, 1)).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, -1, -1));
};

/**
 * @param {!Chess.Bitboard} fromBB
 * @param {!Chess.Bitboard} occupied
 * @return {!Chess.Bitboard}
 */
Chess.Position.makeRookAttackMask = function(fromBB, occupied) {
	return Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, 0, 1).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, 0, -1)).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, 1, 0)).or(
		Chess.Position.makeSlidingAttackMask(fromBB.dup(), occupied, -1, 0));
};

/**
 * @param {!Chess.PieceColor} color attacked by color
 * @param {number} index
 * @return {boolean}
 * @see http://goo.gl/UYzOw (Square Attacked By)
 */
Chess.Position.prototype.isAttacked = function(color, index) {
	var pawns = this.getPieceColorBitboard(Chess.Piece.PAWN, color);
	if (Chess.Position.makePawnAttackMask(color, pawns).isSet(index)) {
		return true;
	}

	var knights = this.getPieceColorBitboard(Chess.Piece.KNIGHT, color);
	if (!Chess.Bitboard.KNIGHT_MOVEMENTS[index].dup().and(knights).isEmpty()) {
		return true;
	}

	var king = this.getPieceColorBitboard(Chess.Piece.KING, color);
	if (!Chess.Bitboard.KING_MOVEMENTS[index].dup().and(king).isEmpty()) {
		return true;
	}

	var occupied = this.getOccupiedBitboard();
	var queens = this.getPieceColorBitboard(Chess.Piece.QUEEN, color);

	var bq = this.getPieceColorBitboard(Chess.Piece.BISHOP, color).dup().or(queens);
	if (Chess.Position.makeBishopAttackMask(bq, occupied).isSet(index)) {
		return true;
	}

	var rq = this.getPieceColorBitboard(Chess.Piece.ROOK, color).dup().or(queens);
	if (Chess.Position.makeRookAttackMask(rq, occupied).isSet(index)) {
		return true;
	}

	return false;
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * @return {number} 0-3 index to castling rights
 */
Chess.Position.getCastlingIndex = function(color, kingSide) {
	return color + (kingSide ? 0 : 2);
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * @return {number} home square of the castling rook
 */
Chess.Position.getCastlingRookSquare = function(color, kingSide) {
	return Chess.Position.ROOK_INDICES[Chess.Position.getCastlingIndex(color, kingSide)];
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * @return {boolean}
 */
Chess.Position.prototype.hasCastlingRight = function(color, kingSide) {
	return 0 !== (this.castlingRights & (1 << Chess.Position.getCastlingIndex(color, kingSide)));
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 */
Chess.Position.prototype.clearCastlingRight = function(color, kingSide) {
	this.hashKey.updateCastlingRights(this.castlingRights);
	this.castlingRights &= ~(1 << Chess.Position.getCastlingIndex(color, kingSide));
	this.hashKey.updateCastlingRights(this.castlingRights);
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * @param {boolean} onlyLegal true = check that king's route is not attacked
 * @return {boolean}
 * TODO: allow pseudo-legal castle moves, i.e. don't check attacked until makeMove
 */
Chess.Position.prototype.canCastle = function(color, kingSide, onlyLegal) {
	if (!this.hasCastlingRight(color, kingSide)) {
		return false;
	}

	var direction = kingSide ? 1 : -1;
	var kingPosition = (color === Chess.PieceColor.WHITE) ? 4 : 60;
	var occupied = this.getOccupiedBitboard();

	if (occupied.isSet(kingPosition + direction) || occupied.isSet(kingPosition + 2 * direction)) {
		return false;
	}

	if (!kingSide && occupied.isSet(kingPosition + 3 * direction)) {
		return false;
	}

	if (onlyLegal && !this.isCastlingLegal(color, kingSide)) {
		return false;
	}

	return true;
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * @return {boolean}
 */
Chess.Position.prototype.isCastlingLegal = function(color, kingSide) {
	var otherColor = Chess.getOtherPieceColor(color);
	var direction = kingSide ? 1 : -1;
	var kingPosition = (color === Chess.PieceColor.WHITE) ? 4 : 60;

	return !this.isAttacked(otherColor, kingPosition) && !this.isAttacked(otherColor, kingPosition + direction) && !this.isAttacked(otherColor, kingPosition + 2 * direction);
};

/** @return {boolean} */
Chess.Position.prototype.canEnPassant = function() {
	return this.getEnPassantSquare() >= 0;
};

/** @return {number} */
Chess.Position.prototype.getEnPassantSquare = function() {
	return this.enPassantSquare;
};

/** @return {boolean} */
Chess.Position.prototype.isFiftyMoveRuleDraw = function() {
	return this.halfmoveClock >= 100;
};

/** @return {boolean} */
Chess.Position.prototype.isThreefoldRepetitionRuleDraw = function() {
	var currentHashKey = this.hashKey;
	return this.hashHistory.reduce(
		/**
		 * @param {number} previousValue
		 * @param {!Chess.Zobrist} currentValue
		 * @param {number} index (unused; please the Closure Compiler)
		 * @param {Array} array (unused; please the Closure Compiler)
		 * @return {number}
		 */
		function(previousValue, currentValue, index, array) { return previousValue + (currentValue.isEqual(currentHashKey) ? 1 : 0); }, 0) >= 3;
};

/**
 * @return {boolean}
 * TODO: find a good source for how this is supposed to work
 */
Chess.Position.prototype.isInsufficientMaterialDraw = function() {
	if (!this.getPieceBitboard(Chess.Piece.PAWN).isEmpty()) {
		return false;
	}

	if (!this.getPieceBitboard(Chess.Piece.ROOK).isEmpty()) {
		return false;
	}

	if (!this.getPieceBitboard(Chess.Piece.QUEEN).isEmpty()) {
		return false;
	}

	// only kings, knights and bishops on the board
	var whiteCount = this.getColorBitboard(Chess.PieceColor.WHITE).popcnt();
	var blackCount = this.getColorBitboard(Chess.PieceColor.BLACK).popcnt();

	if (whiteCount + blackCount < 4) {
		// king vs king, king&bishop vs king, king&knight vs king
		return true;
	}

	if (!this.getPieceBitboard(Chess.Piece.KNIGHT).isEmpty()) {
		return false;
	}

	// only kings and bishops on the board
	var bishops = this.getPieceBitboard(Chess.Piece.BISHOP);
	if (bishops.dup().and(Chess.Bitboard.LIGHT_SQUARES).isEqual(bishops) || bishops.dup().and(Chess.Bitboard.DARK_SQUARES).isEqual(bishops)) {
		return true;
	}

	return false;
};

/** @return {boolean} */
Chess.Position.prototype.isDraw = function() {
	return this.isFiftyMoveRuleDraw() || this.isThreefoldRepetitionRuleDraw() || this.isInsufficientMaterialDraw();
};

/** @return {!Chess.Position.Status} */
Chess.Position.prototype.getStatus = function() {
	if (!this.getMoves().length) {
		return this.isKingInCheck() ? Chess.Position.Status.CHECKMATE : Chess.Position.Status.STALEMATE_DRAW;
	}

	if (this.isFiftyMoveRuleDraw()) {
		return Chess.Position.Status.FIFTY_MOVE_RULE_DRAW;
	}

	if (this.isThreefoldRepetitionRuleDraw()) {
		return Chess.Position.Status.THREEFOLD_REPETITION_RULE_DRAW;
	}

	if (this.isInsufficientMaterialDraw()) {
		return Chess.Position.Status.INSUFFICIENT_MATERIAL_DRAW;
	}

	return Chess.Position.Status.NORMAL;
};

/**
 * @param {boolean} onlyCaptures
 * @return {!Array.<!Chess.Move>} pseudo-legal moves in this chess position
 * TODO: special-case move generation when king is check
 */
Chess.Position.prototype.generateMoves = function(onlyCaptures) {
	var moves = [];

	var turnColor = this.getTurnColor();
	var opponentBB = this.getColorBitboard(Chess.getOtherPieceColor(turnColor));
	var occupied = this.getOccupiedBitboard();
	var chessPosition = this;

	// Pawn moves: double pushes, positional moves, captures, promotions, en passant
	/**
	 * @param {!Chess.Bitboard} toMask
	 * @param {number} movement
	 * @param {!Chess.Move.Kind} kind
	 */
	function addPawnMoves(toMask, movement, kind) {
		while (!toMask.isEmpty()) {
			var index = toMask.extractLowestBitPosition();
			moves.push(new Chess.Move(index - movement, index, kind, Chess.Piece.PAWN, chessPosition.getPieceAtOrNull(index)));
		}
	}

	/**
	 * @param {!Chess.Bitboard} toMask
	 * @param {number} movement
	 * @param {boolean} capture
	 */
	function addPawnPromotions(toMask, movement, capture) {
		addPawnMoves(toMask.dup(), movement, capture ? Chess.Move.Kind.QUEEN_PROMOTION_CAPTURE : Chess.Move.Kind.QUEEN_PROMOTION);
		addPawnMoves(toMask.dup(), movement, capture ? Chess.Move.Kind.ROOK_PROMOTION_CAPTURE : Chess.Move.Kind.ROOK_PROMOTION);
		addPawnMoves(toMask.dup(), movement, capture ? Chess.Move.Kind.BISHOP_PROMOTION_CAPTURE : Chess.Move.Kind.BISHOP_PROMOTION);
		addPawnMoves(toMask.dup(), movement, capture ? Chess.Move.Kind.KNIGHT_PROMOTION_CAPTURE : Chess.Move.Kind.KNIGHT_PROMOTION);
	}

	var fileDirection = 1 - 2 * turnColor;
	var rankDirection = Chess.FILES * fileDirection;
	var turnPawns = this.getPieceColorBitboard(Chess.Piece.PAWN, turnColor);
	var lastRow = Chess.Bitboard.RANKS[turnColor ? 0 : Chess.LAST_RANK];

	if (!onlyCaptures) {
		// Double pawn pushes: pawns that are at their initial position, with nothing in the next two rows
		var doublePawnPushed = turnPawns.dup().and(Chess.Bitboard.RANKS[turnColor ? 6 : 1]).shiftLeft(2 * rankDirection).and_not(occupied).and_not(occupied.dup().shiftLeft(rankDirection));
		addPawnMoves(doublePawnPushed, 2 * rankDirection, Chess.Move.Kind.DOUBLE_PAWN_PUSH);

		// Positional pawn moves: advance one square to an empty square; not to the last row
		// Pawn promotion: to the last row
		var positionalPawnMoved = turnPawns.dup().shiftLeft(rankDirection).and_not(occupied);
		addPawnMoves(positionalPawnMoved.dup().and_not(lastRow), rankDirection, Chess.Move.Kind.POSITIONAL);
		addPawnPromotions(positionalPawnMoved.dup().and(lastRow), rankDirection, false);
	}

	// Pawn captures: advance diagonally to the next row to a square occupied by an opponent piece; not to the last row. Also, don't wrap the board from left/right.
	// Pawn promotion w/ capture: to the last row
	var leftFile = Chess.Bitboard.FILES[turnColor ? Chess.LAST_FILE : 0];
	var leftCaptureMovement = rankDirection - fileDirection;
	var pawnLeftCaptured = turnPawns.dup().and_not(leftFile).shiftLeft(leftCaptureMovement).and(opponentBB);
	addPawnMoves(pawnLeftCaptured.dup().and_not(lastRow), leftCaptureMovement, Chess.Move.Kind.CAPTURE);
	addPawnPromotions(pawnLeftCaptured.dup().and(lastRow), leftCaptureMovement, true);

	var rightFile = Chess.Bitboard.FILES[turnColor ? 0 : Chess.LAST_FILE];
	var rightCaptureMovement = rankDirection + fileDirection;
	var pawnRightCaptured = turnPawns.dup().and_not(rightFile).shiftLeft(rightCaptureMovement).and(opponentBB);
	addPawnMoves(pawnRightCaptured.dup().and_not(lastRow), rightCaptureMovement, Chess.Move.Kind.CAPTURE);
	addPawnPromotions(pawnRightCaptured.dup().and(lastRow), rightCaptureMovement, true);

	// Pawn en passant captures: opponent has just double pawn pushed in the last move next to our pawn, we move diagonally behind the opponent pawn, capturing it
	if (this.canEnPassant()) {
		var pawnLeftEnPassant = Chess.Bitboard.makeIndex(this.getEnPassantSquare() + fileDirection).and(turnPawns).and_not(leftFile).shiftLeft(leftCaptureMovement);
		addPawnMoves(pawnLeftEnPassant, leftCaptureMovement, Chess.Move.Kind.EN_PASSANT_CAPTURE);
		var pawnRightEnPassant = Chess.Bitboard.makeIndex(this.getEnPassantSquare() - fileDirection).and(turnPawns).and_not(rightFile).shiftLeft(rightCaptureMovement);
		addPawnMoves(pawnRightEnPassant, rightCaptureMovement, Chess.Move.Kind.EN_PASSANT_CAPTURE);
	}

	// Positional and capture moves for knight, bishop, rook, queen, king
	/**
	 * @param {number} from 0-63
	 * @param {!Chess.Bitboard} toMask
	 * @param {!Chess.Piece} piece
	 */
	function addNormalMoves(from, toMask, piece) {
		while (!toMask.isEmpty()) {
			var to = toMask.extractLowestBitPosition();
			moves.push(new Chess.Move(from, to, opponentBB.isSet(to) ? Chess.Move.Kind.CAPTURE : Chess.Move.Kind.POSITIONAL, piece, chessPosition.getPieceAtOrNull(to)));
		}
	}

	var mask = this.getColorBitboard(turnColor).dup().not();
	if (onlyCaptures) {
		mask.and(opponentBB);
	}

	var turnKnights = this.getPieceColorBitboard(Chess.Piece.KNIGHT, turnColor).dup();
	while (!turnKnights.isEmpty()) {
		var knightPosition = turnKnights.extractLowestBitPosition();
		addNormalMoves(knightPosition, Chess.Bitboard.KNIGHT_MOVEMENTS[knightPosition].dup().and(mask), Chess.Piece.KNIGHT);
	}

	var turnQueens = this.getPieceColorBitboard(Chess.Piece.QUEEN, turnColor).dup();
	while (!turnQueens.isEmpty()) {
		var queenPosition = turnQueens.extractLowestBitPosition();
		addNormalMoves(queenPosition, Chess.Position.makeBishopAttackMask(Chess.Bitboard.makeIndex(queenPosition), occupied).or(
			Chess.Position.makeRookAttackMask(Chess.Bitboard.makeIndex(queenPosition), occupied)).and(mask), Chess.Piece.QUEEN);
	}

	var turnBishops = this.getPieceColorBitboard(Chess.Piece.BISHOP, turnColor).dup();
	while (!turnBishops.isEmpty()) {
		var bishopPosition = turnBishops.extractLowestBitPosition();
		addNormalMoves(bishopPosition, Chess.Position.makeBishopAttackMask(Chess.Bitboard.makeIndex(bishopPosition), occupied).and(mask), Chess.Piece.BISHOP);
	}

	var turnRooks = this.getPieceColorBitboard(Chess.Piece.ROOK, turnColor).dup();
	while (!turnRooks.isEmpty()) {
		var rookPosition = turnRooks.extractLowestBitPosition();
		addNormalMoves(rookPosition, Chess.Position.makeRookAttackMask(Chess.Bitboard.makeIndex(rookPosition), occupied).and(mask), Chess.Piece.ROOK);
	}

	var kingPosition = this.getKingPosition(turnColor);
	addNormalMoves(kingPosition, Chess.Bitboard.KING_MOVEMENTS[kingPosition].dup().and(mask), Chess.Piece.KING);

	if (!onlyCaptures) {
		// King & queen side castle
		if (this.canCastle(turnColor, true, true)) {
			moves.push(new Chess.Move(kingPosition, kingPosition + 2, Chess.Move.Kind.KING_CASTLE, Chess.Piece.KING, null));
		}

		if (this.canCastle(turnColor, false, true)) {
			moves.push(new Chess.Move(kingPosition, kingPosition - 2, Chess.Move.Kind.QUEEN_CASTLE, Chess.Piece.KING, null));
		}
	}

	return moves;
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color of the captured piece
 * @param {number} index
 */
Chess.Position.prototype.capturePiece = function(piece, color, index) {
	this.getPieceBitboard(piece).clearBit(index);
	this.getColorBitboard(color).clearBit(index);
	this.pieces[index] = null;
	this.hashKey.updatePieceColorSquare(piece, color, index);
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color of the captured piece
 * @param {number} index
 */
Chess.Position.prototype.unCapturePiece = function(piece, color, index) {
	this.getPieceBitboard(piece).setBit(index);
	this.getColorBitboard(color).setBit(index);
	this.pieces[index] = /** @type {!Chess.Piece} */(piece);
	this.hashKey.updatePieceColorSquare(piece, color, index);
};

/**
 * @param {!Chess.Piece} piece
 * @param {!Chess.PieceColor} color
 * @param {number} from 0-63
 * @param {number} to 0-63
 */
Chess.Position.prototype.movePiece = function(piece, color, from, to) {
	var fromToBB = Chess.Bitboard.makeIndex(from).or(Chess.Bitboard.makeIndex(to));
	this.getPieceBitboard(piece).xor(fromToBB);
	this.getColorBitboard(color).xor(fromToBB);
	this.pieces[from] = null;
	this.pieces[to] = /** @type {!Chess.Piece} */(piece);
	this.hashKey.updatePieceColorSquare(piece, color, from);
	this.hashKey.updatePieceColorSquare(piece, color, to);
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * N.B. only moves the rook, not the king
 */
Chess.Position.prototype.castleRook = function(color, kingSide) {
	var from = Chess.Position.getCastlingRookSquare(color, kingSide);
	var to = from + (kingSide ? -2 : 3);
	this.movePiece(Chess.Piece.ROOK, color, from, to);
};

/**
 * @param {!Chess.PieceColor} color
 * @param {boolean} kingSide true = castle kingside, false = castle queenside
 * N.B. only moves the rook, not the king
 */
Chess.Position.prototype.unCastleRook = function(color, kingSide) {
	var to = Chess.Position.getCastlingRookSquare(color, kingSide);
	var from = to + (kingSide ? -2 : 3);
	this.movePiece(Chess.Piece.ROOK, color, from, to);
};

/**
 * @param {!Chess.Piece} pieceOld
 * @param {!Chess.Piece} pieceNew
 * @param {!Chess.PieceColor} color
 * @param {number} index 0-63
 * @see http://goo.gl/jkRj9 (Update by Move)
 */
Chess.Position.prototype.promotePiece = function(pieceOld, pieceNew, color, index) {
	this.getPieceBitboard(pieceOld).clearBit(index);
	this.getPieceBitboard(pieceNew).setBit(index);
	this.pieces[index] = /** @type {!Chess.Piece} */(pieceNew);
	this.hashKey.updatePieceColorSquare(pieceOld, color, index);
	this.hashKey.updatePieceColorSquare(pieceNew, color, index);
};

/**
 * Changes the chess pieces according to move
 * @param {!Chess.Move} move to make
 */
Chess.Position.prototype.updatePieces = function(move) {
	if (move.isCapture()) {
		this.capturePiece(move.getCapturedPiece(), Chess.getOtherPieceColor(this.getTurnColor()), move.getCaptureSquare());
	}

	if (move.isCastle()) {
		this.castleRook(this.getTurnColor(), move.getKind() === Chess.Move.Kind.KING_CASTLE);
	}

	this.movePiece(move.getPiece(), this.getTurnColor(), move.getFrom(), move.getTo());

	if (move.isPromotion()) {
		this.promotePiece(Chess.Piece.PAWN, move.getPromotedPiece(), this.getTurnColor(), move.getTo());
	}
};

/**
 * Reverts the chess pieces to the positions before making move
 * @param {!Chess.Move} move to unmake
 */
Chess.Position.prototype.revertPieces = function(move) {
	if (move.isPromotion()) {
		this.promotePiece(move.getPromotedPiece(), Chess.Piece.PAWN, this.getTurnColor(), move.getTo());
	}

	this.movePiece(move.getPiece(), this.getTurnColor(), move.getTo(), move.getFrom());

	if (move.isCastle()) {
		this.unCastleRook(this.getTurnColor(), move.getKind() === Chess.Move.Kind.KING_CASTLE);
	}

	if (move.isCapture()) {
		this.unCapturePiece(move.getCapturedPiece(), Chess.getOtherPieceColor(this.getTurnColor()), move.getCaptureSquare());
	}
};

/**
 * Checks a pseudo-legal move's legality
 * @param {!Chess.Move} move to test
 * @return {boolean}
 */
Chess.Position.prototype.isMoveLegal = function(move) {
	this.updatePieces(move);
	var kingInCheck = this.isKingInCheck();
	this.revertPieces(move);
	return !kingInCheck;
};

/**
 * Changes the pieces according to the move, and adds the move to the move history list
 * @param {!Chess.Move} move to make
 * @return {boolean} true if the move was made
 */
Chess.Position.prototype.makeMove = function(move) {
	this.hashHistory.push(this.hashKey.dup());
	this.updatePieces(move);

	if (this.isKingInCheck()) {
		this.revertPieces(move);
		this.hashHistory.pop();
		return false;
	}

	this.madeMoves.push(move);
	this.irreversibleHistory.push(this.enPassantSquare);
	this.irreversibleHistory.push(this.castlingRights);
	this.irreversibleHistory.push(this.halfmoveClock);

	this.hashKey.updateEnPassantSquare(this.enPassantSquare);
	if (move.getKind() === Chess.Move.Kind.DOUBLE_PAWN_PUSH) {
		this.enPassantSquare = move.getTo();
	} else {
		this.enPassantSquare = -1;
	}
	this.hashKey.updateEnPassantSquare(this.enPassantSquare);

	var turnColor = this.getTurnColor();

	if (move.getPiece() === Chess.Piece.KING) {
		this.clearCastlingRight(turnColor, true);
		this.clearCastlingRight(turnColor, false);
	} else if (move.getPiece() === Chess.Piece.ROOK) {
		if (move.getFrom() === Chess.Position.getCastlingRookSquare(turnColor, true)) {
			this.clearCastlingRight(turnColor, true);
		} else if (move.getFrom() === Chess.Position.getCastlingRookSquare(turnColor, false)) {
			this.clearCastlingRight(turnColor, false);
		}
	}

	var otherColor = Chess.getOtherPieceColor(turnColor);

	if (move.getCapturedPiece() === Chess.Piece.ROOK) {
		if (move.getCaptureSquare() === Chess.Position.getCastlingRookSquare(otherColor, true)) {
			this.clearCastlingRight(otherColor, true);
		} else if (move.getCaptureSquare() === Chess.Position.getCastlingRookSquare(otherColor, false)) {
			this.clearCastlingRight(otherColor, false);
		}
	}

	if (move.isCapture() || move.getPiece() === Chess.Piece.PAWN) {
		this.halfmoveClock = 0;
	} else {
		++this.halfmoveClock;
	}

	this.turn = otherColor;
	this.hashKey.updateTurn();

	return true;
};

/**
 * @return {number} number of moves made
 */
Chess.Position.prototype.getMadeMoveCount = function() {
	return this.madeMoves.length;
};

/**
 * @return {boolean} if a move has been made
 */
Chess.Position.prototype.canUndo = function() {
	return !!this.getMadeMoveCount();
};

/**
 * @return {?Chess.Move} the latest move or null if the board was at the initial state
 */
Chess.Position.prototype.getLastMove = function() {
	if (!this.canUndo()) {
		return null;
	}

	return this.madeMoves[this.madeMoves.length - 1];
};

/**
 * Unmakes the latest move made 
 * @return {?Chess.Move} the unmade move or null if the board was at the initial state
 */
Chess.Position.prototype.unmakeMove = function() {
	if (!this.canUndo()) {
		return null;
	}

	var move = /** @type {!Chess.Move} */(this.madeMoves.pop());
	this.turn = Chess.getOtherPieceColor(this.getTurnColor());
	this.hashKey.updateTurn();
	this.revertPieces(move);
	this.halfMoveClock = /** @type {number} */(this.irreversibleHistory.pop());
	this.hashKey.updateCastlingRights(this.castlingRights);
	this.castlingRights = /** @type {number} */(this.irreversibleHistory.pop());
	this.hashKey.updateCastlingRights(this.castlingRights);
	this.hashKey.updateEnPassantSquare(this.enPassantSquare);
	this.enPassantSquare = /** @type {number} */(this.irreversibleHistory.pop());
	this.hashKey.updateEnPassantSquare(this.enPassantSquare);
	this.hashHistory.pop();

	return move;
};
"use strict";

/**
 * Parser for chess moves in algebraic notation, e.g. "1. e4 c5 (comment here) 2. Nf3 d6".
 * The idea is to parse a list of moves starting from the initial state, yielding a valid chess position.
 * @constructor
 * @see http://goo.gl/B39TC (Algebraic notation)
 */
Chess.Parser = function() {
};

/**
 * Cleans uninteresting parts of a move string
 * @param {string} text
 * @return {string}
 * @see http://goo.gl/uAijB (Dashes and hyphens)
 */
Chess.Parser.clean = function(text) {
	text = text.replace(/[\r\n\t]/gm, " "); // normalize whitespace to spaces
	text = text.replace(/[\u002D\u05BE\u1806\u2010\u2011\u2012\u2013\u2014\u2015\u207B\u208B\u2212\u2E3A\u2E3B\uFE58\uFE63\uFF0D]/g, "-"); // normalize dashes
	while (true) { // remove comments, i.e. (nested) parentheses and characters between them
		var replaced = text.replace(/\([^()]*\)/g, "");
		if (replaced === text) {
			break;
		}
		text = replaced;
	}
	text = text.replace(/[^ a-z0-9.=:\u00BD-]/gi, " "); // only keep interesting characters
	text = text.replace(/  +/g, " "); // normalize whitespace to one space
	return text;
};

/**
 * @param {!Chess.Position} chessPosition
 * @param {string} text
 * @return {?Array.<!Chess.Move>}
 */
Chess.Parser.parseOneMove = function(chessPosition, text) {
	var legalMoves = chessPosition.getMoves();

	var castling = text.match(/0-0(?:-0)?|O-O(?:-O)?/i);
	if (castling) {
		var kind = (castling[0].length === 3) ? Chess.Move.Kind.KING_CASTLE : Chess.Move.Kind.QUEEN_CASTLE;
		return legalMoves.filter(/** @param {!Chess.Move} move */function(move) { return move.getKind() === kind; });
	}

	var move = text.match(/([NBRQK])?([a-h])?([1-8])?-?([x:])?([a-h])([1-8])?(?:[=(]([NBRQ]))?/);
	if (move) {
		var piece = move[1];
		var fromFile = move[2];
		var fromRank = move[3];
		var capture = move[4];
		var toFile = move[5];
		var toRank = move[6];
		var promotedPiece = move[7];
		return legalMoves.filter(/** @param {!Chess.Move} move */function(move) {
			if (piece !== undefined && Chess.PIECE_ALGEBRAIC_NAMES[move.getPiece()] !== piece) {
				return false;
			}

			if (piece === undefined && move.getPiece() !== Chess.Piece.PAWN) {
				return false;
			}

			if (fromFile !== undefined && Chess.FILE_CHARACTERS[Chess.getFile(move.getFrom())] !== fromFile) {
				return false;
			}

			if (fromRank !== undefined && Chess.RANK_CHARACTERS[Chess.getRank(move.getFrom())] !== fromRank) {
				return false;
			}

			if (capture !== undefined && !move.isCapture()) {
				return false;
			}

			if (toFile !== undefined && Chess.FILE_CHARACTERS[Chess.getFile(move.getTo())] !== toFile) {
				return false;
			}

			if (toRank !== undefined && Chess.RANK_CHARACTERS[Chess.getRank(move.getTo())] !== toRank) {
				return false;
			}

			if (promotedPiece !== undefined && Chess.PIECE_ALGEBRAIC_NAMES[move.getPromotedPiece()] !== promotedPiece) {
				return false;
			}

			return true;
		});
	}

	return null;
};

/**
 * @param {string} text
 * @return {!Chess.Position}
 * @throws {Error}
 */
Chess.Parser.parseMoves = function(text) {
	var chessPosition = new Chess.Position;

	Chess.Parser.clean(text).split(" ").every(/** @param {string} moveText */function(moveText) {
		var moveNumber = moveText.match(/\d+\./);
		if (moveNumber) {
			return true;
		}

		var gameOver = moveText.match(/1-0|0-1|\u00BD-\u00BD/);
		if (gameOver) {
			return false;
		}

		var moves = Chess.Parser.parseOneMove(chessPosition, moveText);
		if (!moves || moves.length !== 1) {
			throw new Error("Parse error in '" + moveText + "'");
		}
		chessPosition.makeMove(moves[0]);

		return true;
	});

	return chessPosition;
};
"use strict";

/**
 * AI (artificial intelligence) is a computer player for chess.
 * The implementation is an alpha-beta pruned minimax with a simple evaluation function.
 * AI takes a chess position, evaluates possible moves up to a certain depth, and returns the move it considers best (or null if the game is lost).
 * @constructor
 * TODO: add some sort of randomness; per side so that two computers playing against each other act differently (and don't know how the other is acting).
 * TODO: static exchange evaluation (see)
 * TODO: transposition table
 * TODO: iterative deepening
 * TODO: negamax formulation
 */
Chess.AI = function() {
};

/**
 * @const
 * @type {!Array.<number>}
 * @see http://goo.gl/zxAE9 (Chess piece relative value)
 */
Chess.AI.PIECE_VALUES = [100, 300, 300, 500, 900, 20000];

/**
 * @const
 * @type {!Array.<!Array.<number>>}
 * @see http://goo.gl/X326e (Simplified evaluation function)
 */
Chess.AI.PIECE_SQUARE_TABLES = [
	// pawn
	[
		0, 0, 0, 0, 0, 0, 0, 0,
		50, 50, 50, 50, 50, 50, 50, 50,
		10, 10, 20, 30, 30, 20, 10, 10,
		5, 5, 10, 25, 25, 10, 5, 5,
		0, 0, 0, 20, 20, 0, 0, 0,
		5, -5, -10, 0, 0, -10, -5, 5,
		5, 10, 10, -20, -20, 10, 10, 5,
		0, 0, 0, 0, 0, 0, 0, 0
	],
	// knight
	[
		-50, -40, -30, -30, -30, -30, -40, -50,
		-40, -20, 0, 0, 0, 0, -20, -40,
		-30, 0, 10, 15, 15, 10, 0, -30,
		-30, 5, 15, 20, 20, 15, 5, -30,
		-30, 0, 15, 20, 20, 15, 0, -30,
		-30, 5, 10, 15, 15, 10, 5, -30,
		-40, -20, 0, 5, 5, 0, -20, -40,
		-50, -40, -30, -30, -30, -30, -40, -50
	],
	// bishop
	[
		-20, -10, -10, -10, -10, -10, -10, -20,
		-10, 0, 0, 0, 0, 0, 0, -10,
		-10, 0, 5, 10, 10, 5, 0, -10,
		-10, 5, 5, 10, 10, 5, 5, -10,
		-10, 0, 10, 10, 10, 10, 0, -10,
		-10, 10, 10, 10, 10, 10, 10, -10,
		-10, 5, 0, 0, 0, 0, 5, -10,
		-20, -10, -10, -10, -10, -10, -10, -20
	],
	// rook
	[
		0, 0, 0, 0, 0, 0, 0, 0,
		5, 10, 10, 10, 10, 10, 10, 5,
		-5, 0, 0, 0, 0, 0, 0, -5,
		-5, 0, 0, 0, 0, 0, 0, -5,
		-5, 0, 0, 0, 0, 0, 0, -5,
		-5, 0, 0, 0, 0, 0, 0, -5,
		-5, 0, 0, 0, 0, 0, 0, -5,
		0, 0, 0, 5, 5, 0, 0, 0
	],
	// queen
	[
		-20, -10, -10, -5, -5, -10, -10, -20,
		-10, 0, 0, 0, 0, 0, 0, -10,
		-10, 0, 5, 5, 5, 5, 0, -10,
		-5, 0, 5, 5, 5, 5, 0, -5,
		0, 0, 5, 5, 5, 5, 0, -5,
		-10, 5, 5, 5, 5, 5, 0, -10,
		-10, 0, 5, 0, 0, 0, 0, -10,
		-20, -10, -10, -5, -5, -10, -10, -20
	],
	// king middle game
	[
		-30, -40, -40, -50, -50, -40, -40, -30,
		-30, -40, -40, -50, -50, -40, -40, -30,
		-30, -40, -40, -50, -50, -40, -40, -30,
		-30, -40, -40, -50, -50, -40, -40, -30,
		-20, -30, -30, -40, -40, -30, -30, -20,
		-10, -20, -20, -20, -20, -20, -20, -10,
		 20, 20, 0, 0, 0, 0, 20, 20,
		 20, 30, 10, 0, 0, 10, 30, 20
	]/*,
	// king end game
	[
		-50, -40, -30, -20, -20, -30, -40, -50,
		-30, -20, -10, 0, 0, -10, -20, -30,
		-30, -10, 20, 30, 30, 20, -10, -30,
		-30, -10, 30, 40, 40, 30, -10, -30,
		-30, -10, 30, 40, 40, 30, -10, -30,
		-30, -10, 20, 30, 30, 20, -10, -30,
		-30, -30, 0, 0, 0, 0, -30, -30,
		-50, -30, -30, -30, -30, -30, -30, -50
	]*/
];

/**
 * @const
 * @type {number}
 * @see http://goo.gl/adkwe (Bishop pair)
 */
Chess.AI.BISHOP_PAIR_VALUE = Chess.AI.PIECE_VALUES[Chess.Piece.PAWN] / 2;

/**
 * @param {!Chess.Position} chessPosition
 * @param {!Chess.PieceColor} color
 * @return {number}
 */
Chess.AI.getMaterialValue = function(chessPosition, color) {
	var value = 0;
	for (var piece = Chess.Piece.PAWN; piece < Chess.Piece.KING; ++piece) {
		value += chessPosition.getPieceColorBitboard(piece, color).popcnt() * Chess.AI.PIECE_VALUES[piece];
	}
	if (chessPosition.getPieceColorBitboard(Chess.Piece.BISHOP, color).popcnt() > 1) {
		value += Chess.AI.BISHOP_PAIR_VALUE;
	}
	return value;
};

/**
 * @param {!Chess.Position} chessPosition
 * @return {number}
 */
Chess.AI.evaluateMaterial = function(chessPosition) {
	return Chess.AI.getMaterialValue(chessPosition, Chess.PieceColor.WHITE) - Chess.AI.getMaterialValue(chessPosition, Chess.PieceColor.BLACK);
};

/**
 * @param {!Chess.Position} chessPosition
 * @param {!Chess.PieceColor} color
 * @return {number}
 * TODO: game phase
 */
Chess.AI.getPieceSquareValue = function(chessPosition, color) {
	var value = 0;
	for (var piece = Chess.Piece.PAWN; piece <= Chess.Piece.KING; ++piece) {
		var pieces = chessPosition.getPieceColorBitboard(piece, color).dup();
		while (!pieces.isEmpty()) {
			var index = pieces.extractLowestBitPosition();
			value += Chess.AI.PIECE_SQUARE_TABLES[piece][color ? index : (56 ^ index)];
		}
	}
	return value;
};

/**
 * @param {!Chess.Position} chessPosition
 * @return {number}
 */
Chess.AI.evaluateLocations = function(chessPosition) {
	return Chess.AI.getPieceSquareValue(chessPosition, Chess.PieceColor.WHITE) - Chess.AI.getPieceSquareValue(chessPosition, Chess.PieceColor.BLACK);
};

/**
 * @param {!Chess.PieceColor} color white = attacks by white pieces
 * @param {!Chess.Bitboard} pawns
 * @param {!Chess.Bitboard} empty
 * @return {!Chess.Bitboard}
 */
Chess.AI.makePawnPositionalMask = function(color, pawns, empty) {
	var white = (color === Chess.PieceColor.WHITE);
	var positional = pawns.dup().shiftLeft(white ? 8 : -8).and(empty);
	var doublePush = pawns.dup().and(Chess.Bitboard.RANKS[white ? 1 : 6]).shiftLeft(white ? 16 : -16).and(empty).and(empty.dup().shiftLeft(white ? 8 : -8));
	return positional.or(doublePush);
};

/**
 * @param {!Chess.Position} chessPosition
 * @param {!Chess.PieceColor} color
 * @return {number}
 * TODO: it's easy to give bonuses for attack and defend here by and(us) or and(opponent)
 * TODO: legality
 * TODO: does not count all moves; e.g. two pawns can capture the same square, ditto two rooks, two queens
 */
Chess.AI.getMobilityValue = function(chessPosition, color) {
	var us = chessPosition.getColorBitboard(color);
	var opponent = chessPosition.getColorBitboard(Chess.getOtherPieceColor(color));
	var occupied = chessPosition.getOccupiedBitboard();
	var empty = chessPosition.getEmptyBitboard();
	var mobility = 0;

	mobility += Chess.AI.makePawnPositionalMask(color, chessPosition.getPieceColorBitboard(Chess.Piece.PAWN, color), empty).popcnt();
	mobility += Chess.Position.makePawnAttackMask(color, chessPosition.getPieceColorBitboard(Chess.Piece.PAWN, color)).and(opponent).popcnt();

	var knights = chessPosition.getPieceColorBitboard(Chess.Piece.KNIGHT, color).dup();
	while (!knights.isEmpty()) {
		mobility += Chess.Bitboard.KNIGHT_MOVEMENTS[knights.extractLowestBitPosition()].dup().and_not(us).popcnt();
	}

	mobility += Chess.Bitboard.KING_MOVEMENTS[chessPosition.getKingPosition(color)].dup().and_not(us).popcnt();

	var queens = chessPosition.getPieceColorBitboard(Chess.Piece.QUEEN, color);

	var bq = chessPosition.getPieceColorBitboard(Chess.Piece.BISHOP, color).dup().or(queens);
	mobility += Chess.Position.makeBishopAttackMask(bq, occupied).and_not(us).popcnt();

	var rq = chessPosition.getPieceColorBitboard(Chess.Piece.ROOK, color).dup().or(queens);
	mobility += Chess.Position.makeRookAttackMask(rq, occupied).and_not(us).popcnt();

	return mobility * Chess.AI.PIECE_VALUES[Chess.Piece.PAWN] / 100;
};

/**
 * @param {!Chess.Position} chessPosition
 * @return {number}
 */
Chess.AI.evaluate = function(chessPosition) {
	return Chess.AI.evaluateMaterial(chessPosition) + Chess.AI.evaluateLocations(chessPosition);
};

/**
 * @param {!Chess.Position} chessPosition
 * @return {?Chess.Move}
 */
Chess.AI.prototype.search = function(chessPosition) {
	/**
	 * @param {!Array.<!Chess.Move>} moves
	 * @return {!Array.<!Chess.Move>}
	 */
	function sortMoves(moves) {
		/**
		 * @param {!Chess.Move} move
		 * @return {number}
		 * TODO: killer heuristic, history, etc
		 */
		function scoreMove(move) {
			var score = move.isCapture() ? ((1 + move.getCapturedPiece()) / (1 + move.getPiece())) : 0;
			score = 6 * score + move.getPiece();
			score = 16 * score + move.getKind();
			score = 64 * score + move.getTo();
			score = 64 * score + move.getFrom();
			return score;
		}

		/**
		 * @param {!Chess.Move} a
		 * @param {!Chess.Move} b
		 * @return {number}
		 */
		function compareMoves(a, b) {
			return scoreMove(b) - scoreMove(a);
		}

		moves.sort(compareMoves);
		return moves;
	}

	var evaluations = 0;

	/**
	 * @param {!Chess.Position} chessPosition
	 * @param {number} alpha
	 * @param {number} beta
	 * @return {number}
	 */
	function quiescenceSearch(chessPosition, alpha, beta) {
		if (chessPosition.isDraw()) {
			// always assume the draw will be claimed
			return 0;
		}

		var standPatValue = Chess.AI.evaluate(chessPosition);
		++evaluations;

		var white = (chessPosition.getTurnColor() === Chess.PieceColor.WHITE);

		if (white) {
			if (standPatValue >= beta) {
				return beta;
			}
			alpha = (standPatValue > alpha) ? standPatValue : alpha;
		} else {
			if (standPatValue <= alpha) {
				return alpha;
			}
			beta = (standPatValue < beta) ? standPatValue : beta;
		}

		var moves = sortMoves(chessPosition.getMoves(true, !chessPosition.isKingInCheck()));

		for (var i = 0; i < moves.length; ++i) {
			if (chessPosition.makeMove(moves[i])) {
				var value = quiescenceSearch(chessPosition, alpha, beta);
				chessPosition.unmakeMove();

				if (white) {
					if (value >= beta) {
						return beta;
					}
					alpha = (value > alpha) ? value : alpha; // max player (white)
				} else {
					if (value <= alpha) {
						return alpha;
					}
					beta = (value < beta) ? value : beta; // min player (black)
				}
			}
		}

		return /** @type {number} */(white ? alpha : beta);
	}

	/**
	 * @param {!Chess.Position} chessPosition
	 * @param {number} depth
	 * @param {number} alpha
	 * @param {number} beta
	 * @return {number}
	 */
	function alphaBeta(chessPosition, depth, alpha, beta) {
		if (depth < 1) {
			return quiescenceSearch(chessPosition, alpha, beta);
		}

		var moves = sortMoves(chessPosition.getMoves(true, false));
		var white = (chessPosition.getTurnColor() === Chess.PieceColor.WHITE);
		var legal = false;

		for (var i = 0; i < moves.length; ++i) {
			if (chessPosition.makeMove(moves[i])) {
				legal = true;

				var value = alphaBeta(chessPosition, depth - 1, alpha, beta);
				chessPosition.unmakeMove();

				if (white) {
					alpha = (value > alpha) ? value : alpha; // max player (white)
				} else {
					beta = (value < beta) ? value : beta; // min player (black)
				}

				if (beta <= alpha) {
					break;
				}
			}
		}

		if (!legal) {
			// no legal moves
			if (!chessPosition.isKingInCheck()) {
				// stalemate, draw
				return 0;
			}
			// checkmate, the player in turn loses
			var mate = Chess.AI.PIECE_VALUES[Chess.Piece.KING];// - chessPosition.getMadeMoveCount(); TODO: punish longer games
			return white ? -mate : mate;
		}

		// TODO: avoid the search above before checking this, just check for checkmate
		if (chessPosition.isDraw()) {
			// always assume the draw will be claimed
			return 0;
		}

		return /** @type {number} */(white ? alpha : beta);
	}

	var bestMove = null;
	var alpha = -Infinity;
	var beta = Infinity;
	var moves = sortMoves(chessPosition.getMoves(true));
	for (var i = 0; i < moves.length; ++i) {
		if (chessPosition.makeMove(moves[i])) {
			var value = alphaBeta(chessPosition, 3, alpha, beta);
			chessPosition.unmakeMove();

			if (chessPosition.getTurnColor() === Chess.PieceColor.WHITE) {
				// max player (white)
				if (value > alpha) {
					alpha = value;
					bestMove = moves[i];
				}
			} else {
				// min player (black)
				if (value < beta) {
					beta = value;
					bestMove = moves[i];
				}
			}

			// Notice that alpha is always smaller than beta here, because we only update one one them
			// at the main level, the other stays infinite (+ or -)
		}
	}

	return bestMove;
};
"use strict";

// TODO: extract anonymous functions to Chess.UI member functions where it makes sense (e.g. drag&drop handlers)
// TODO: receive the div id as an argument
// TODO: implement getters for the most common selectors (which are now constants)
// TODO: show captured pieces next to the board
// TODO: tablet drag&drop
// TODO: click-click moving (=no drag&drop)

/**
 * Chess user interface implementation. A chessboard is created as a html table.
 * Chess pieces are created as html divs, and placed as children of the chessboard tds.
 * Dragging and dropping is implemented with jQuery UI's draggable.
 * Chess game state (position.js) and computer player (ai.js) are wired to the pieces. Computer is the black player.
 * @constructor
 */
Chess.UI = function() {
	/** @type {!Chess.Position} */
	this.chessPosition = new Chess.Position;

	/** @type {!Chess.AI} */
	this.ai = new Chess.AI;
};

/**
 * @const
 * @type {string}
 */
Chess.UI.CHESSBOARD_ID = "#chessboard";

/**
 * @const
 * @type {string}
 */
Chess.UI.CHESSBOARD_TABLE = Chess.UI.CHESSBOARD_ID + " table";

/**
 * @const
 * @type {string}
 */
Chess.UI.CHESSBOARD_SQUARE = Chess.UI.CHESSBOARD_ID + " table tr td";

/**
 * @const
 * @type {string}
 */
Chess.UI.CHESSBOARD_PIECE = Chess.UI.CHESSBOARD_SQUARE + " div";

/**
 * @const
 * @type {string}
 */
Chess.UI.CHESSBOARD_PIECES_AND_SQUARES = Chess.UI.CHESSBOARD_SQUARE + ", " + Chess.UI.CHESSBOARD_PIECE;

/** 
 * Creates a new chessboard table under an element with id="chessboard"
 */
Chess.UI.makeBoard = function() {
	var table = $("<table>");
	var filesRow = '<tr><th></th>' + "abcdefgh".split("").map(/** @param {string} x @return {string} */ function(x) { return '<th class="file">' + x + "</th>"; }).join("") + "<th></th></tr>";
	table.append(filesRow);

	for (var row = 0; row < Chess.RANKS; ++row) {
		var rank = Chess.LAST_RANK - row;
		var tr = $("<tr>");
		table.append(tr);

		var rankCell = '<th class="rank">' + (Chess.RANKS - row) + "</th>";
		tr.append(rankCell);

		for (var file = 0; file < Chess.FILES; ++file) {
			var td = $("<td>");
			var color = Chess.isLight(rank, file) ? "light" : "dark";
			td.attr("id", Chess.getAlgebraic(rank, file));
			td.attr("title",
				"Algebraic: " + Chess.getAlgebraic(rank, file) +
				"\nRank: " + rank +
				"\nFile: " + file +
				"\nIndex: " + Chess.getIndex(rank, file) +
				"\nColor: " + color);
			td.addClass(color);
			tr.append(td);
		}

		tr.append(rankCell);
	}

	table.append(filesRow);
	$(Chess.UI.CHESSBOARD_ID).append(table);
};

/**
 * Clears move related classes from chessboard table cells
 */
Chess.UI.clearMoving = function() {
	$(Chess.UI.CHESSBOARD_PIECES_AND_SQUARES).removeClass("from to positional capture double-push en-passant promotion castle king-castle queen-castle");
};

/**
 * Removes dragging and dropping capabilities from chessboard table cells
 */
Chess.UI.clearDragging = function() {
	$(Chess.UI.CHESSBOARD_PIECE + ".ui-draggable").draggable("destroy");
	$(Chess.UI.CHESSBOARD_SQUARE + ".ui-droppable").droppable("destroy");
};

/** Adds chess pieces to the chessboard
 */
Chess.UI.prototype.updatePieces = function() {
	$(Chess.UI.CHESSBOARD_PIECE).remove();
	$(Chess.UI.CHESSBOARD_SQUARE).removeClass("white black turn last-move " + Chess.PIECE_NAMES.join(" "));

	var whites = this.chessPosition.getColorBitboard(Chess.PieceColor.WHITE);
	var blacks = this.chessPosition.getColorBitboard(Chess.PieceColor.BLACK);

	for (var index = 0; index < Chess.RANKS * Chess.FILES; ++index) {
		var td = $("#" + Chess.getAlgebraicFromIndex(index));

		for (var piece = Chess.Piece.PAWN; piece <= Chess.Piece.KING; ++piece) {
			if (this.chessPosition.getPieceBitboard(piece).isSet(index)) {
				var isTurn = (this.chessPosition.getTurnColor() === Chess.PieceColor.WHITE) ? whites.isSet(index) : blacks.isSet(index);

				var div = $("<div>");
				div.attr("title", td.attr("title") + "\nPiece: " + Chess.PIECE_NAMES[piece] + "\nColor: " + (whites.isSet(index) ? "white" : "black"));
				div.text(Chess.getPieceCharacter(piece, whites.isSet(index) ? Chess.PieceColor.WHITE : Chess.PieceColor.BLACK));

				var elements = div.add(td);
				elements.addClass(Chess.PIECE_NAMES[piece]);
				elements.toggleClass("white", whites.isSet(index));
				elements.toggleClass("black", blacks.isSet(index));
				elements.toggleClass("turn", isTurn);

				td.append(div);

				break;
			}
		}
	}

	var lastMove = this.chessPosition.getLastMove();
	if (lastMove !== null) {
		$("#" + Chess.getAlgebraicFromIndex(lastMove.getFrom())).addClass("last-move");
		$("#" + Chess.getAlgebraicFromIndex(lastMove.getTo())).addClass("last-move");
		// TODO: en passant, castling
	}
};

/**
 * Adds chessboard cell hover, and chess piece dragging and dropping capabilities to the chessboard
 */
Chess.UI.prototype.updateMoves = function() {
	var moves = this.chessPosition.getMoves();

	$("#moves").html(
		'<a href="#" id="undo" class="' + (this.chessPosition.canUndo() ? "can" : "cannot") + '">undo</a><br/>' +
		'<a href="#" id="auto" class="' + ((moves.length > 0) ? "can" : "cannot") + '">auto</a><br/>' +
		moves.map(
			/**
			 * @param {!Chess.Move} move
			 * @param {number} index
			 * @return {string}
			 */
			function(move, index) {
				return '<a href="#" id="' + index + '">' + move.getString() + "</a><br/>";
			}).join(""));

	$(Chess.UI.CHESSBOARD_PIECES_AND_SQUARES).removeClass("can-move");
	moves.forEach(/** @param {!Chess.Move} move */ function(move) {
		var td = $("#" + Chess.getAlgebraicFromIndex(move.getFrom()));
		var elements = td.add(td.children());
		elements.addClass("can-move");
	});

	/** @type {boolean} */
	var dragging = false;
	var ui = this;

	$(Chess.UI.CHESSBOARD_PIECE + ".can-move").mouseenter(/** @this {!Element} */ function(event) {
		if (dragging) {
			return;
		}

		var div = $(this);
		var td = div.parent();
		var from = Chess.getIndexFromAlgebraic("" + td.attr("id"));
		var fromElements = td.add(div);
		fromElements.toggleClass("from", moves.some(/** @param {!Chess.Move} move @return {boolean} */ function(move) { return move.getFrom() === from; }));

		if (fromElements.hasClass("from")) {
			moves.forEach(/** @param {!Chess.Move} move */ function(move) {
				if (move.getFrom() === from) {
					var toElements = $("#" + Chess.getAlgebraicFromIndex(move.getTo()));
					toElements = toElements.add(toElements.children());
					toElements.addClass("to");
					toElements.addClass(move.getKind() === Chess.Move.Kind.POSITIONAL ? "positional" : "");
					toElements.addClass(move.isCapture() ? "capture" : "");
					toElements.addClass(move.getKind() === Chess.Move.Kind.DOUBLE_PAWN_PUSH ? "double-push" : "");
					toElements.addClass(move.getKind() === Chess.Move.Kind.EN_PASSANT_CAPTURE ? "en-passant" : "");
					toElements.addClass(move.isPromotion() ? "promotion" : "");
					toElements.addClass(move.isCastle() ? "castle" : "");
					toElements.addClass(move.getKind() === Chess.Move.Kind.KING_CASTLE ? "king-castle" : "");
					toElements.addClass(move.getKind() === Chess.Move.Kind.QUEEN_CASTLE ? "queen-castle" : "");
				}
			});

			Chess.UI.clearDragging();

			// Quote "drop", "start", "stop", etc to prevent the closure compiler from removing them
			$(Chess.UI.CHESSBOARD_SQUARE + ".to").droppable({
				"drop": /** @this {!Element} */ function() {
					var to = Chess.getIndexFromAlgebraic("" + $(this).attr("id"));
					var makeMoves = moves.filter(/** @param {!Chess.Move} move */ function(move) { return move.getFrom() === from && move.getTo() === to; });

					if (makeMoves.length > 0) {
						// TODO: it's possible that there is more than one move (promotions). Either ask the user here or have a droplist somewhere ("promote to")
						ui.chessPosition.makeMove(makeMoves[0]);
						ui.updateChessPosition();
					} else {
						// Dropped to an invalid square
						Chess.UI.clearMoving();
						Chess.UI.clearDragging();
					}
				}
			});

			div.draggable({
				"start": function() { dragging = true; },
				"stop": function() { dragging = false; },
				"containment": Chess.UI.CHESSBOARD_TABLE,
				"zIndex": 10,
				"revert": "invalid"
			});
		}
	}).mouseleave(function() {
		if (!dragging) {
			Chess.UI.clearMoving();
		}
	});

	$("#moves a").click(function() {
		var id = $(this).attr("id");
		if (id === "undo") {
			ui.chessPosition.unmakeMove(); // computer (black) move
			ui.chessPosition.unmakeMove(); // user (white) move
			ui.updateChessPosition();
		} else if (id === "auto") {
			ui.doComputerMove();
		} else {
			ui.chessPosition.makeMove(moves[parseInt(id, 10)]);
			ui.updateChessPosition();
		}
	});
};

/**
 * @throws {Error}
 */
Chess.UI.prototype.doComputerMove = function() {
	$("#moves").html("");
	var ui = this;
	var dim = $("#dim");
	dim.fadeIn(function() {
		var move = ui.ai.search(ui.chessPosition);
		if (!move) {
			// Mates should have been checked in updateChessPosition
			throw new Error("Move not found");
		}

		ui.chessPosition.makeMove(move);
		var from = $("#" + Chess.getAlgebraicFromIndex(move.getFrom()));
		var to = $("#" + Chess.getAlgebraicFromIndex(move.getTo()));
		var dx = (to.offset().left - from.offset().left);
		var dy = (to.offset().top - from.offset().top);
		var piece = from.children("div");
		piece.css({"position": "relative", "top": "0px", "left": "0px" });

		dim.fadeOut(function() {
			piece.animate({"top": dy + "px", "left": dx + "px"}, function() { ui.updateChessPosition(); });
		});
	});
};

/**
 * Updates the chessboard according to the current chess position
 */
Chess.UI.prototype.updateChessPosition = function() {
	Chess.UI.clearMoving();
	Chess.UI.clearDragging();
	this.updatePieces();

	var status = this.chessPosition.getStatus();
	if (status === Chess.Position.Status.NORMAL && this.chessPosition.getTurnColor() === Chess.PieceColor.BLACK) {
		this.doComputerMove();
	} else {
		this.updateMoves();
		$("#dim").css({"display": "none"});

		if (status === Chess.Position.Status.CHECKMATE) {
			$("#moves").append("&#35;<br/>" + (this.chessPosition.getTurnColor() ? "1-0" : "0-1"));
		} else if (status !== Chess.Position.Status.NORMAL) {
			$("#moves").append("&frac12;-&frac12;");
		}
	}
};

/**
 * Creates a new chessboard and sets up the game at the standard chess initial position.
 */
function makeChessGame() {
	Chess.UI.makeBoard();
	var ui = new Chess.UI;
	ui.updateChessPosition();
}
$(makeChessGame);
