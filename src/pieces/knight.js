import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_knight.png";
import chesspieceBlackIcon from "../assets/black_knight.png";

export default class Knight extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    isMovePossible(originatingSquare, destinationSquare) {
        return (
            originatingSquare - 17 === destinationSquare ||
            originatingSquare - 10 === destinationSquare ||
            originatingSquare + 6 === destinationSquare ||
            originatingSquare + 15 === destinationSquare ||
            originatingSquare - 15 === destinationSquare ||
            originatingSquare - 6 === destinationSquare ||
            originatingSquare + 10 === destinationSquare ||
            originatingSquare + 17 === destinationSquare
        );
    }

    getPathMovement() {
        return [];
    }
}
