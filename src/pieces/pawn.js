import Piece from "./piece.js";

import chesspieceWhiteIcon from "../assets/white_pawn.png";
import chesspieceBlackIcon from "../assets/black_pawn.png";

export default class Pawn extends Piece {
    constructor(player) {
        super(player, player === 1 ? chesspieceWhiteIcon : chesspieceBlackIcon);
    }

    // isMovePossible(
    //     originatingSquare,
    //     whichSqaureNumberWasClicked,
    //     isDestinationSquareEnemyOccupied
    // ) {
    //     if (this.player === 1) {
    //         if (
    //             // pawn can move straight by 1 position if there is nothing blocking it
    //             whichSqaureNumberWasClicked === originatingSquare - 8 &&
    //             !isDestinationSquareEnemyOccupied
    //         ) {
    //             return true;
    //         } else if (
    //             // pawn can move diagnal if there is an opposition piece there.
    //             isDestinationSquareEnemyOccupied &&
    //             (whichSqaureNumberWasClicked === originatingSquare - 9 ||
    //                 whichSqaureNumberWasClicked === originatingSquare - 7)
    //         ) {
    //             return true;
    //         }
    //     } else if (this.player === 2) {
    //         if (
    //             // pawn can move straight by 1 position if there is nothing blocking it
    //             whichSqaureNumberWasClicked === originatingSquare + 8 &&
    //             !isDestinationSquareEnemyOccupied
    //         ) {
    //             return true;
    //         } else if (
    //             // pawn can move diagnal if there is an opposition piece there.
    //             isDestinationSquareEnemyOccupied &&
    //             (whichSqaureNumberWasClicked === originatingSquare + 9 ||
    //                 whichSqaureNumberWasClicked === originatingSquare + 7)
    //         ) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // can probably get rid of the belpw
    getPathMovement(originatingSquare, whichSqaureNumberWasClicked) {
        if (whichSqaureNumberWasClicked === originatingSquare - 16) {
            return [originatingSquare - 8];
        } else if (whichSqaureNumberWasClicked === originatingSquare + 16) {
            return [originatingSquare + 8];
        }
        return [];
    }
}
