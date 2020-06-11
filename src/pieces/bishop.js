import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_bishop.png";
import chesspieceBlackIcon from "../assets/black_bishop.png";

export default class Bishop extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    isMovePossible(originatingSquare, whichSqaureNumberWasClicked) {
        return (
            Math.abs(originatingSquare - whichSqaureNumberWasClicked) % 9 ===
                0 ||
            Math.abs(originatingSquare - whichSqaureNumberWasClicked) % 7 === 0
        );
    }
    // determine how far the bishop can go. REturn an array with the grid square numbers that are possible.
    getPathMovement(originatingSquare, destinationSquare) {
        let path = [],
            pathStart,
            pathEnd,
            incrementBy;
        if (originatingSquare > destinationSquare) {
            pathStart = destinationSquare;
            pathEnd = originatingSquare;
            console.log(`Bishop To: ${pathStart}`);
            console.log(`Bushop From: ${pathEnd}`);
        } else {
            pathStart = originatingSquare;
            pathEnd = destinationSquare;
        }
        if (Math.abs(originatingSquare - destinationSquare) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        } else {
            incrementBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }

        return path;
    }
}
