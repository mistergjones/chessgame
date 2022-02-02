import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_castle.png";
import chesspieceBlackIcon from "../assets/black_castle.png";

export default class Castle extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    isMovePossible(originatingSquare, whichSqaureNumberWasClicked) {
        let modulusRemainder = originatingSquare % 8;
        // console.log(originatingSquare);
        // console.log(whichSqaureNumberWasClicked);
        // console.log(`modulusRemainder is: ${modulusRemainder}`);
        let difference = 8 - modulusRemainder;
        // console.log(`difference is: ${difference}`);
        return (
            // vertical movement then horizontal movement
            Math.abs(originatingSquare - whichSqaureNumberWasClicked) % 8 ===
                0 ||
            (whichSqaureNumberWasClicked >=
                originatingSquare - modulusRemainder &&
                whichSqaureNumberWasClicked < originatingSquare + difference)
        );
    }
    getPathMovement(originatingSquare, destinationSquare) {
        let path = [],
            pathStart,
            pathEnd,
            incrementBy;
        if (originatingSquare > destinationSquare) {
            pathStart = destinationSquare;
            pathEnd = originatingSquare;
            // console.log(`Castle/Rook From: ${pathEnd}`);
            // console.log(`Castle To: ${pathStart}`);
        } else {
            pathStart = originatingSquare;
            pathEnd = destinationSquare;
        }
        if (Math.abs(originatingSquare - destinationSquare) % 8 === 0) {
            incrementBy = 8;
            pathStart += 8;
        } else {
            incrementBy = 1;
            pathStart += 1;
        }

        for (let i = pathStart; i < pathEnd; i += incrementBy) {
            path.push(i);
        }
        return path;
    }
}
