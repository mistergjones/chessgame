import React from "react";

import "../index.css";
import Board from "./board.js";
import establishChessBoard from "./initialise.js";

import determineMovement from "./Movement";
import { act } from "react-dom/test-utils";

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
            notation: ["Awaiting first move..."], //used for chess notation.
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
        var gj = this.state.notation;
        gj.unshift(chessNotationSentence + "\n");

        return gj;
    }

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
                    var actualNotation = determineMovement(
                        actualPiece,
                        this.state.squareSelection,
                        whichSqaureNumberWasClicked,
                        isDestinationSquareOccupied,
                        this.state.player
                    );

                    //pass the nototion sentence to following functoin to join
                    actualNotation = this.joinChessNotation(actualNotation);

                    console.log(actualNotation);

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
                        notation: actualNotation,
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
