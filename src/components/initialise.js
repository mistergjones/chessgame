import Bishop from "../pieces/bishop.js";
import King from "../pieces/king.js";
import Knight from "../pieces/knight.js";
import Pawn from "../pieces/pawn.js";
import Queen from "../pieces/queen.js";
import Castle from "../pieces/castle.js";

export default function establishChessBoard() {
    // fill the 64 array with nulls
    const squares = Array(64).fill(null);

    // draw the black pawns by instantiating them and assign to the appropriate grid sqaures
    for (let i = 8; i < 16; i++) {
        squares[i] = new Pawn(2);
    }

    // draw the white pawns by instantiating them and assign to the appropriate grid sqaures
    for (let i = 48; i < 56; i++) {
        squares[i] = new Pawn(1);
    }

    // Instantiate and draw the other pieces on the respective squares
    squares[0] = new Castle(2);
    squares[1] = new Knight(2);
    squares[2] = new Bishop(2);
    squares[3] = new Queen(2);
    squares[4] = new King(2);
    squares[5] = new Bishop(2);
    squares[6] = new Knight(2);
    squares[7] = new Castle(2);

    squares[56] = new Castle(1);
    squares[57] = new Knight(1);
    squares[58] = new Bishop(1);
    squares[59] = new Queen(1);
    squares[60] = new King(1);
    squares[61] = new Bishop(1);
    squares[62] = new Knight(1);
    squares[63] = new Castle(1);

    return squares;
}
