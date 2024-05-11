import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        //ini.adalah konsep immutabality
        const nextSquares = squares.slice(); //menduplikat array squares

        nextSquares[i] = xIsNext ? "x" : "o";

        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);

    let status = winner
        ? `Winner : ${winner}`
        : `Next Player : ${xIsNext ? "X" : "O"}`;
    return (
        <>
            <div>{status}</div>
            <div className="board">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />
                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />
                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => {
        let text = move > 0 ? `GO TO MOVE ${move}` : `GO TO GAME START`;

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{text}</button>
            </li>
        );
    });

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    );
}
export default Game;

//untuk cek pemenang
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 1; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    }

    return false;
}
