import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_queen.png";
import chesspieceBlackIcon from "../assets/black_queen.png";

export default class Queen extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    isMovePossible(originatingSquare, destinationSquare) {
        let mod = originatingSquare % 8;
        let diff = 8 - mod;

        return (
            Math.abs(originatingSquare - destinationSquare) % 9 === 0 ||
            Math.abs(originatingSquare - destinationSquare) % 7 === 0 ||
            Math.abs(originatingSquare - destinationSquare) % 8 === 0 ||
            (destinationSquare >= originatingSquare - mod &&
                destinationSquare < originatingSquare + diff)
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
            // console.log(`Queen From: ${pathEnd}`);
            // console.log(`Queen To: ${pathStart}`);
        } else {
            pathStart = originatingSquare;
            pathEnd = destinationSquare;
            // console.log(`Queen From: ${pathEnd}`);
            // console.log(`Queen To: ${pathStart}`);
        }
        if (Math.abs(originatingSquare - destinationSquare) % 8 === 0) {
            incrementBy = 8;
            pathStart += 8;
        } else if (Math.abs(originatingSquare - destinationSquare) % 9 === 0) {
            incrementBy = 9;
            pathStart += 9;
        } else if (Math.abs(originatingSquare - destinationSquare) % 7 === 0) {
            incrementBy = 7;
            pathStart += 7;
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
