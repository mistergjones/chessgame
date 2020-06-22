import React from "react";
import "../index.css";
import Board from "./board.js";
import establishChessBoard from "./initialise.js";

//import determineMovement from "./Movement";

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            squares: establishChessBoard(),
            player: 1,
            squareSelection: -99,
            message: "", // used for text messages to display
            turn: "white",
            kingChecked: false,
            notation: "Awaiting first move...", //used for chess notation.
        };
    }

    // this function makes the background colour of the square go blank if called upon
    makeSquareBackgroundBlank(squares) {
        squares[this.state.squareSelection].style = {
            ...squares[this.state.squareSelection].style,
            backgroundColor: "",
        };
    }
    // this function determines and updates the message should a player initially click on a blank square or clicks on the other player's chess pieces.
    rightPlayerPieceSelected(squares, whichSqaureNumberWasClicked) {
        if (
            // if you clicked on a blank wrong square or clicked on the other player's square. Show error message.
            !squares[whichSqaureNumberWasClicked] ||
            squares[whichSqaureNumberWasClicked].player !== this.state.player
        ) {
            this.setState({
                message: `Wrong selection. Please choose player ${this.state.player} pieces.`,
            });

            // means if a valid piece was selected for the correct player
        } else {
            // make the background color go dark green to signify selected.
            squares[whichSqaureNumberWasClicked].style = {
                ...squares[whichSqaureNumberWasClicked].style,
                backgroundColor: "RGB(11,111,111)",
            };
            // update the squareSelection to the square number that was clicked for the destination and update the message.
            this.setState({
                message: "Choose destination for the selected piece",
                squareSelection: whichSqaureNumberWasClicked,
            });
        }
    }
    //check if player actually clicked on another of their own pieces. If true, update the satte
    updatemessageAsPlayerClickedOnOwnPieces() {
        this.setState({
            message:
                "You have clicked on another of your own pieces. Choose again.",
            squareSelection: -99,
        });
    }

    // this function determines if the chosen piece like a queen, bishop or castle is being blocked.
    isThePieceBeingBlockedFromMoving(srcToDestPath) {
        let isMoveLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            // console.log(srcToDestPath);
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isMoveLegal = false;
            }
        }
        // console.log(srcToDestPath);
        return isMoveLegal;
    }
    // find the positions of the 2 kings
    findKingPositions(squares) {
        var kingPositions = [];
        // Skip null, undefined, and nonexistent elements
        for (var i = 0; i < squares.length; i++) {
            if (!squares[i]) continue; // Skip null, undefined, and nonexistent elements
            // loop body here
            if (squares[i].constructor.name === "King") {
                //console.log(i);
                kingPositions.push(i);
            }
        }
        // console.log(squares[4].player);
        // console.log(squares[4].constructor.name);
        return kingPositions;
    }

    canPawnMove(
        squares,
        whichSqaureNumberWasClicked,
        isDestinationSquareOccupied
    ) {
        if (squares[this.state.squareSelection].constructor.name === "Pawn") {
            console.log("ASDFASDFAASDFAFD");
            if (this.player === 1) {
                if (
                    whichSqaureNumberWasClicked ===
                        whichSqaureNumberWasClicked - 8 &&
                    !isDestinationSquareOccupied
                ) {
                    return true;
                } else if (
                    isDestinationSquareOccupied &&
                    (whichSqaureNumberWasClicked ===
                        whichSqaureNumberWasClicked - 9 ||
                        whichSqaureNumberWasClicked ===
                            whichSqaureNumberWasClicked - 7)
                ) {
                    return true;
                }
            } else if (this.player === 2) {
                if (
                    whichSqaureNumberWasClicked ===
                        whichSqaureNumberWasClicked + 8 &&
                    !isDestinationSquareOccupied
                ) {
                    return true;
                } else if (
                    isDestinationSquareOccupied &&
                    (whichSqaureNumberWasClicked ===
                        whichSqaureNumberWasClicked + 9 ||
                        whichSqaureNumberWasClicked ===
                            whichSqaureNumberWasClicked + 7)
                ) {
                    return true;
                }
            }
            return false;
        }
    }

    joinChessNotation(chessNotationSentence) {
        var aj = chessNotationSentence;
        // aj.push(chessNotationSentence);
        // aj.push(this.state.notation);
        console.log(`jCN ${this.state.notation}`);
        return aj;
    }

    determineMovement = function (
        chessPiece,
        whichSqaureNumberWasClicked,
        originatingSquare,
        isDestinationSquareOccupied,
        player
    ) {
        // cfeate a sentence that will evenutally hod the chess notation without spaces
        let chessNotation = "Player ";
        var squareDestination = this.determineNotation(originatingSquare);
        var squareOrigination = this.determineNotation(
            whichSqaureNumberWasClicked
        );

        console.log(`THE PIECE IS ${chessPiece}`);

        if (chessPiece === "Pawn") {
            chessNotation = this.pieceStringTogether(
                chessNotation,
                player,
                chessPiece,
                squareOrigination,
                squareDestination
            );

            if (isDestinationSquareOccupied === true) {
                chessNotation = chessNotation + " and captured a piece";
            }
            console.log(`111 ${chessNotation}`);
            return chessNotation;
        }
        // if (chessPiece === "Bishop") {
        //     chessNotation = pieceStringTogether(
        //         chessNotation,
        //         player,
        //         chessPiece,
        //         squareOrigination,
        //         squareDestination
        //     );

        //     if (isDestinationSquareOccupied === true) {
        //         chessNotation = chessNotation + " and captured a piece";
        //     }

        //     return chessNotation;
        // }
        // if (chessPiece === "Castle") {
        //     chessNotation = pieceStringTogether(
        //         chessNotation,
        //         player,
        //         chessPiece,
        //         squareOrigination,
        //         squareDestination
        //     );

        //     if (isDestinationSquareOccupied === true) {
        //         chessNotation = chessNotation + " and captured a piece";
        //     }

        //     return chessNotation;
        // }
        // if (chessPiece === "King") {
        //     chessNotation = pieceStringTogether(
        //         chessNotation,
        //         player,
        //         chessPiece,
        //         squareOrigination,
        //         squareDestination
        //     );

        //     if (isDestinationSquareOccupied === true) {
        //         chessNotation = chessNotation + " and captured a piece";
        //     }

        //     return chessNotation;
        // }
        // if (chessPiece === "Knight") {
        //     chessNotation = pieceStringTogether(
        //         chessNotation,
        //         player,
        //         chessPiece,
        //         squareOrigination,
        //         squareDestination
        //     );

        //     if (isDestinationSquareOccupied === true) {
        //         chessNotation = chessNotation + " and captured a piece";
        //     }

        //     return chessNotation;
        // }
        // if (chessPiece === "Queen") {
        //     chessNotation = pieceStringTogether(
        //         chessNotation,
        //         player,
        //         chessPiece,
        //         squareOrigination,
        //         squareDestination
        //     );

        //     if (isDestinationSquareOccupied === true) {
        //         chessNotation = chessNotation + " and captured a piece";
        //     }

        //     return chessNotation;
        // }
        // console.log(chessNotation);
        // return chessNotation;
    };

    // this function simply completes the notation sentence from each
    pieceStringTogether = function (
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
            chessPiece +
            " from " +
            squareOrigination +
            " to " +
            squareDestination;
        return chessNotation;
    };

    determineNotation = function (gridNumber) {
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

    handleClick(whichSqaureNumberWasClicked) {
        // take a copy of the squares cheesboard when you click on a square
        const squares = this.state.squares.slice();

        // if === -99, starting source condition for a piece.
        if (this.state.squareSelection === -99) {
            // confirm if a player has selected their own piece. If so, make the backround dark and capture the next handleclick ready to move it.
            this.rightPlayerPieceSelected(squares, whichSqaureNumberWasClicked);

            // if the second click (i.e. destination selection) > -99, i.e. it is from 0-63....
        } else if (this.state.squareSelection > -99) {
            // change the destination background colour back to blank/transparent when you move a piece.
            this.makeSquareBackgroundBlank(squares);

            // If a player has selected their piece, but then selects another of their pieces...Update the message and display an error message to the user.
            if (
                squares[whichSqaureNumberWasClicked] &&
                squares[whichSqaureNumberWasClicked].player ===
                    this.state.player
            ) {
                this.updatemessageAsPlayerClickedOnOwnPieces();
            } else {
                // ELSE: if player didn't click on their own piece and are looking for a valid move...do the following...
                // take a copy of the squares array. This will be used to update it when a valid piece moves.
                const squares = this.state.squares.slice();

                // store result of whether the destination square is occupied
                const isDestinationSquareOccupied = squares[
                    whichSqaureNumberWasClicked
                ]
                    ? true
                    : false;

                // obtain what the square clicked and then find out from the individual piece, what it can do.
                // i.e. can it move to the destnation square
                // true or false
                const isThePieceMovingInRightDirection = squares[
                    this.state.squareSelection
                ].isMovePossible(
                    this.state.squareSelection,
                    whichSqaureNumberWasClicked,
                    isDestinationSquareOccupied
                );

                // find the king positions
                // console.log(this.findKingPositions(squares));

                // With the selected piece, obtain valid square numbers that the piece can move to.
                const hasPieceGotLineOfSight = squares[
                    this.state.squareSelection
                ].getPathMovement(
                    this.state.squareSelection,
                    whichSqaureNumberWasClicked
                );

                // Now check to see if a piece like a queen, castle or bishop is blocked when making a move
                const isMoveLegal = this.isThePieceBeingBlockedFromMoving(
                    hasPieceGotLineOfSight
                );

                // if both flags are true....i.e. the piece can move legally
                if (isThePieceMovingInRightDirection && isMoveLegal) {
                    // determine the chess notation first
                    var piece = squares[this.state.squareSelection];
                    // obtain the actual name of hte piece
                    var actualPiece = piece.constructor.name;
                    var glenny = this.determineMovement(
                        actualPiece,
                        this.state.squareSelection,
                        whichSqaureNumberWasClicked,
                        isDestinationSquareOccupied,
                        this.state.player
                    );

                    console.log(`GLENNY ${glenny}`);
                    //pass the nototion sentence to following functoin to join
                    var gj = this.joinChessNotation(glenny);

                    console.log(`ZZZZ ${gj}`);

                    // update the square to display the icon for the piece
                    squares[whichSqaureNumberWasClicked] =
                        squares[this.state.squareSelection];

                    // console.log(squares[whichSqaureNumberWasClicked]);

                    // update appropriate variables. Then update the state
                    squares[this.state.squareSelection] = null;
                    let whichPlayerGoesNext = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === "white" ? "black" : "white";
                    // update the state
                    this.setState({
                        squareSelection: -99,
                        squares: squares,
                        player: whichPlayerGoesNext,
                        message: "",
                        turn: turn,
                        kingChecked: false,
                        notation: gj,
                    });
                } else {
                    // a player has clicked on a sqaure that is invalid for that piece
                    this.setState({
                        message: "Invalid move for that piece. Choose again.",
                        squareSelection: -99,
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <h2>Chess Game</h2>
                <div className="game-info">
                    <h3>Player 1 = White || Player 2 = Black</h3>
                    <h3>Player: {this.state.player} turn</h3>
                    <h4>NOTE: Pawns can only move 1 square. No en-passant. </h4>
                    <h4>NOTE: Check/Checkmate in progress. </h4>

                    <div
                        id="player-turn-box"
                        style={{ backgroundColor: this.state.turn }}
                    ></div>
                    <div className="commentary">
                        <h3>Commentary: {this.state.message}</h3>
                    </div>
                </div>
                <div className="center-div-container">
                    <div className="game-wrapper">
                        <div className="game">
                            <Board
                                squares={this.state.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                            <div className="alegebraicNotation">
                                <textarea
                                    rows="27"
                                    cols="52"
                                    value={this.state.notation}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
