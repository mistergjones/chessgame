import React from "react";
import "../index.css";
import Square from "./square.js";

export default class Board extends React.Component {
    renderSquare(squareNumber, squareShade) {
        return (
            <Square
                style={
                    this.props.squares[squareNumber]
                        ? this.props.squares[squareNumber].style
                        : null
                }
                shade={squareShade}
                onClick={() => this.props.onClick(squareNumber)}
            />
        );
    }

    render() {
        const chessboard = [];

        // need to create 8 rows
        for (let rowLineIdx = 0; rowLineIdx < 8; rowLineIdx++) {
            const squareRows = [];

            // in each square of the row, determine if the color of the square is light or dark
            for (let eachSquareIdx = 0; eachSquareIdx < 8; eachSquareIdx++) {
                // if both numbers are even OR both numbers are ODD, make it a light square. Else, make dark square
                const squareShade =
                    (isEven(rowLineIdx) && isEven(eachSquareIdx)) ||
                    (!isEven(rowLineIdx) && !isEven(eachSquareIdx))
                        ? "light-square"
                        : "dark-square";

                squareRows.push(
                    this.renderSquare(
                        rowLineIdx * 8 + eachSquareIdx,
                        squareShade
                    )
                );
            }
            chessboard.push(<div className="board-row">{squareRows}</div>);
        }

        return <div>{chessboard}</div>;
    }
}

function isEven(num) {
    return num % 2 === 0;
}
