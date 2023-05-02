


import React from 'react';
import MoveList from './MoveList';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: false,
        moveList: [],
      };
    }
  
    handleRollBack(index) {
      const moves = this.state.moveList.slice(0, index);
      const squares = Array(9).fill(null);
      moves.forEach((move) => {
        squares[move.square] = move.player;
      });
      this.setState({
        squares: squares,
        xIsNext: moves.length % 2 === 0,
        winner: calculateWinner(squares, this.props.refreshWins),
        moveList: moves,
      });
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares, this.props.refreshWins) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      const move = { player: squares[i], square: i };
      let newMoveList = this.state.moveList.concat(move);
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        winner: calculateWinner(squares, this.props.refreshWins),
        moveList: newMoveList,
      });
    }
  
    handleRestart() {
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: false,
        moveList: [],
      });
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
          disabled={this.state.winner}
        />
      );
    }
  
    render() {
      let restartButton;
      restartButton = (
        <button className="restart" onClick={() => this.handleRestart()}>
          Restart
        </button>
      );
      const winner = calculateWinner(this.state.squares, this.props.refreshWins);
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = this.state.xIsNext ? " NEXT PLAYER X" : " NEXT PLAYER O";
      }
  
      return (
        <div>
          <div className="status">{status}</div>
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
          {restartButton}
          <MoveList
            moves={this.state.moveList}
            onRollback={(index) => this.handleRollBack(index)}
          />
        </div>
      );
    }
  }

  export default Board;

  function calculateWinner(squares, refreshWins) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        refreshWins(squares[a]);
        return squares[a];
      }
    }
    return null;
  }