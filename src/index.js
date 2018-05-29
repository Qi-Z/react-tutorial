import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // CSS is also imported

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSquare(i) {
        // Arrow function has literal `this` context
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null) }
            ],
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        // Not mutating the data directly gives us better overall application performance
        // If the object being referenced is different from before, then the object has changed. That’s it.
        const squares = current.squares.slice(); // Immutability is important in React
        const xIsNext = !this.state.xIsNext;
        if(calculateWinner(squares)|| squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            history: history.concat([
                {
                    squares
                }
            ]),
            xIsNext
        });// setState is async, you  don't know when it happens
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        )
    }
}

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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; // ES6 destruct
        if (squares[a] === squares[b] && squares[b] === squares[c] && squares[a]) {
            return squares[a];
        }
    }
    return null;
}

// =================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
)