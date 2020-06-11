var determineMovement = function (
    chessPiece,
    whichSqaureNumberWasClicked,
    originatingSquare,
    isDestinationSquareOccupied,
    player
) {
    switch (chessPiece.constructor.name) {
        case "Pawn": {
            console.log(`Glen: ${chessPiece.constructor.name}`);
            console.log(
                `Which sqare was cliked: ${whichSqaureNumberWasClicked}`
            );
            console.log(`Originating Square: ${originatingSquare}`);
            console.log(
                `Is DestinationSquareOccupied: ${isDestinationSquareOccupied}`
            );
            console.log(`Player: ${player}`);

            if (player === 1) {
                if (
                    // pawn can move straight by 1 position if there is nothing blocking it
                    whichSqaureNumberWasClicked === originatingSquare + 8 &&
                    !isDestinationSquareOccupied
                ) {
                    return true;
                } else if (
                    // pawn can move diagnal if there is an opposition piece there.
                    isDestinationSquareOccupied &&
                    (whichSqaureNumberWasClicked === originatingSquare + 9 ||
                        whichSqaureNumberWasClicked === originatingSquare + 7)
                ) {
                    return true;
                }
            } else if (player === 2) {
                if (
                    // pawn can move straight by 1 position if there is nothing blocking it
                    whichSqaureNumberWasClicked === originatingSquare - 8 &&
                    !isDestinationSquareOccupied
                ) {
                    return true;
                } else if (
                    // pawn can move diagnal if there is an opposition piece there.
                    isDestinationSquareOccupied &&
                    (whichSqaureNumberWasClicked === originatingSquare - 9 ||
                        whichSqaureNumberWasClicked === originatingSquare - 7)
                ) {
                    return true;
                }
            }

            return false;
        }
        case "Bishop": {
            console.log(`Glen: ${chessPiece.constructor.name}`);
            console.log(
                `Which sqare was cliked: ${whichSqaureNumberWasClicked}`
            );
            console.log(`Originating Square: ${originatingSquare}`);
            return (
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    9 ===
                    0 ||
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    7 ===
                    0
            );
        }

        case "Castle": {
            console.log(`Glen: ${chessPiece.constructor.name}`);
            console.log(
                `Which sqare was cliked: ${whichSqaureNumberWasClicked}`
            );
            console.log(`Originating Square: ${originatingSquare}`);
            let modulusRemainder = originatingSquare % 8;
            console.log(originatingSquare);
            console.log(whichSqaureNumberWasClicked);
            console.log(`modulusRemainder is: ${modulusRemainder}`);
            let difference = 8 - modulusRemainder;
            console.log(`difference is: ${difference}`);
            return (
                // vertical movement then horizontal movement
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    8 ===
                    0 ||
                (whichSqaureNumberWasClicked >=
                    originatingSquare - modulusRemainder &&
                    whichSqaureNumberWasClicked <
                        originatingSquare + difference)
            );
        }
        case "King": {
            console.log(`Glen: ${chessPiece.constructor.name}`);
            console.log(
                `Which sqare was cliked: ${whichSqaureNumberWasClicked}`
            );
            console.log(`Originating Square: ${originatingSquare}`);
            return (
                originatingSquare + 1 === whichSqaureNumberWasClicked ||
                originatingSquare + 9 === whichSqaureNumberWasClicked ||
                originatingSquare + 8 === whichSqaureNumberWasClicked ||
                originatingSquare + 7 === whichSqaureNumberWasClicked ||
                originatingSquare - 9 === whichSqaureNumberWasClicked ||
                originatingSquare - 8 === whichSqaureNumberWasClicked ||
                originatingSquare - 7 === whichSqaureNumberWasClicked ||
                originatingSquare - 1 === whichSqaureNumberWasClicked
            );
        }

        case "Knight": {
            console.log(`Glen: ${chessPiece.constructor.name}`);
            console.log(
                `Which sqare was cliked: ${whichSqaureNumberWasClicked}`
            );
            console.log(`Originating Square: ${originatingSquare}`);
            return (
                originatingSquare - 17 === whichSqaureNumberWasClicked ||
                originatingSquare - 10 === whichSqaureNumberWasClicked ||
                originatingSquare + 6 === whichSqaureNumberWasClicked ||
                originatingSquare + 15 === whichSqaureNumberWasClicked ||
                originatingSquare - 15 === whichSqaureNumberWasClicked ||
                originatingSquare - 6 === whichSqaureNumberWasClicked ||
                originatingSquare + 10 === whichSqaureNumberWasClicked ||
                originatingSquare + 17 === whichSqaureNumberWasClicked
            );
        }
        case "Queen": {
            let modulusRemainder = originatingSquare % 8;
            let difference = 8 - modulusRemainder;

            return (
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    9 ===
                    0 ||
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    7 ===
                    0 ||
                Math.abs(originatingSquare - whichSqaureNumberWasClicked) %
                    8 ===
                    0 ||
                (whichSqaureNumberWasClicked >=
                    originatingSquare - modulusRemainder &&
                    whichSqaureNumberWasClicked <
                        originatingSquare + difference)
            );
        }
        default:
            return false;
    }
};

module.exports = determineMovement;
