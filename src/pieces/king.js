import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_king.png";
import chesspieceBlackIcon from "../assets/black_king.png";

export default class King extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    isMovePossible(originatingSquare, destinationSquare) {
        return (
            originatingSquare + 1 === destinationSquare ||
            originatingSquare + 9 === destinationSquare ||
            originatingSquare + 8 === destinationSquare ||
            originatingSquare + 7 === destinationSquare ||
            originatingSquare - 9 === destinationSquare ||
            originatingSquare - 8 === destinationSquare ||
            originatingSquare - 7 === destinationSquare ||
            originatingSquare - 1 === destinationSquare
        );
    }

    getPathMovement(originatingSquare, dest) {
        // console.log(`King From: ${originatingSquare}`);
        // console.log(`King To: ${dest}`);
        return [];
    }
}
