var determineMovement = function (
    chessPiece,
    whichSqaureNumberWasClicked,
    originatingSquare,
    isDestinationSquareOccupied,
    player
) {
    // cfeate a sentence that will evenutally hod the chess notation without spaces
    let chessNotation = "Player ";
    var squareDestination = determineNotation(originatingSquare);
    var squareOrigination = determineNotation(whichSqaureNumberWasClicked);

    switch (chessPiece.constructor.name) {
        case "Pawn": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }
        case "Bishop": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }

        case "Castle": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }
        case "King": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }

        case "Knight": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }
        case "Queen": {
            chessNotation = pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }

            return chessNotation;
        }
    }
};

// this function simply completes the notation sentence from each
var pieceStringTogether = function (
    chessNotation,
    player,
    chessPiece,
    squareOrigination,
    squareDestination
) {
    chessNotation =
        chessNotation +
        player +
        ": " +
        chessPiece.constructor.name +
        " from " +
        squareOrigination +
        " to " +
        squareDestination;

    return chessNotation;
};

var determineNotation = function (gridNumber) {
    if (gridNumber === 0) {
        return "a8";
    }
    if (gridNumber === 1) {
        return "b8";
    }
    if (gridNumber === 2) {
        return "c8";
    }
    if (gridNumber === 3) {
        return "d8";
    }
    if (gridNumber === 4) {
        return "e8";
    }
    if (gridNumber === 5) {
        return "f8";
    }
    if (gridNumber === 6) {
        return "g8";
    }
    if (gridNumber === 7) {
        return "h8";
    }
    if (gridNumber === 8) {
        return "a7";
    }
    if (gridNumber === 9) {
        return "b7";
    }
    if (gridNumber === 10) {
        return "c7";
    }
    if (gridNumber === 11) {
        return "d7";
    }
    if (gridNumber === 12) {
        return "e7";
    }
    if (gridNumber === 13) {
        return "f7";
    }
    if (gridNumber === 14) {
        return "g7";
    }
    if (gridNumber === 15) {
        return "h7";
    }
    if (gridNumber === 16) {
        return "a6";
    }
    if (gridNumber === 17) {
        return "b6";
    }
    if (gridNumber === 18) {
        return "c6";
    }
    if (gridNumber === 19) {
        return "d6";
    }
    if (gridNumber === 20) {
        return "e6";
    }
    if (gridNumber === 21) {
        return "f6";
    }
    if (gridNumber === 22) {
        return "g6";
    }
    if (gridNumber === 23) {
        return "h6";
    }
    if (gridNumber === 24) {
        return "a5";
    }
    if (gridNumber === 25) {
        return "b5";
    }
    if (gridNumber === 26) {
        return "c5";
    }
    if (gridNumber === 27) {
        return "d5";
    }
    if (gridNumber === 28) {
        return "e5";
    }
    if (gridNumber === 29) {
        return "f5";
    }
    if (gridNumber === 30) {
        return "g5";
    }
    if (gridNumber === 31) {
        return "h5";
    }
    if (gridNumber === 32) {
        return "a4";
    }
    if (gridNumber === 33) {
        return "b4";
    }
    if (gridNumber === 34) {
        return "c4";
    }
    if (gridNumber === 35) {
        return "d4";
    }
    if (gridNumber === 36) {
        return "e4";
    }
    if (gridNumber === 37) {
        return "f4";
    }
    if (gridNumber === 38) {
        return "g4";
    }
    if (gridNumber === 39) {
        return "h4";
    }
    if (gridNumber === 40) {
        return "a3";
    }
    if (gridNumber === 41) {
        return "b3";
    }
    if (gridNumber === 42) {
        return "c3";
    }
    if (gridNumber === 43) {
        return "d3";
    }
    if (gridNumber === 44) {
        return "e3";
    }
    if (gridNumber === 45) {
        return "f3";
    }
    if (gridNumber === 46) {
        return "g3";
    }
    if (gridNumber === 47) {
        return "h3";
    }
    if (gridNumber === 48) {
        return "a2";
    }
    if (gridNumber === 49) {
        return "b2";
    }
    if (gridNumber === 50) {
        return "c2";
    }
    if (gridNumber === 51) {
        return "d2";
    }
    if (gridNumber === 52) {
        return "e2";
    }
    if (gridNumber === 53) {
        return "f2";
    }
    if (gridNumber === 54) {
        return "g2";
    }
    if (gridNumber === 55) {
        return "h2";
    }
    if (gridNumber === 56) {
        return "a1";
    }
    if (gridNumber === 57) {
        return "b1";
    }
    if (gridNumber === 58) {
        return "c1";
    }
    if (gridNumber === 59) {
        return "d1";
    }
    if (gridNumber === 60) {
        return "e1";
    }
    if (gridNumber === 61) {
        return "f1";
    }
    if (gridNumber === 62) {
        return "g1";
    }
    if (gridNumber === 63) {
        return "h1";
    }
};

module.exports = determineMovement;
