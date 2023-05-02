import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import MoveList from './MoveList';
import Board from './Board';
import Statistic from './Statistic';




class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board refreshWins={(player) => this.statistic.refreshWins(player)} />
        </div>
        <div className="game-info">
          <Statistic ref={(statistic) => (this.statistic = statistic)} />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// function calculateWinner(squares, refreshWins) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       refreshWins(squares[a]);
//       return squares[a];
//     }
//   }
//   return null;
// }
