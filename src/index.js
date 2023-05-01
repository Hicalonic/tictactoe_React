import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
        disabled={this.props.disabled}
      >
        {this.props.value}
      </button>
    );
  }
}

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

class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollbackIndex: "",
    };
  }

  handleRollbackChange = (event) => {
    this.setState({
      rollbackIndex: event.target.value,
    });
  };

  handleRollBackClick = () => {
    const index = parseInt(this.state.rollbackIndex);
    if (index >= 0 && index < this.props.moves.length) {
      this.props.onRollback(index);
    }
  };

  render() {
    const moves = this.props.moves.map((move, index) => {
      const player = move.player;
      const square = move.square;
      const desc = `Player ${player} played on square ${square}`;
      return <li key={index}>{desc}</li>;
    });
    return (
      <div className="move-list">
        <h3>Move List</h3>
        <ol>{moves}</ol>
        <div>
          <input
            type="number"
            placeholder="Choose a number"
            value={this.state.rollbackIndex}
            onChange={this.handleRollbackChange}
          ></input>
          <button onClick={this.handleRollBackClick}>RollBack</button>
        </div>
      </div>
    );
  }
}

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xWins: 0,
      oWins: 0,
    };
  }

  refreshWins(player) {
    if (player === "X") {
      this.setState({ xWins: this.state.xWins + 1 });
    } else if (player === "O") {
      this.setState({ oWins: this.state.oWins + 1 });
    }
  }

  render() {
    return (
      <div>
        <div className="playerWins"> Winners</div>
        <div>X Wins = {this.state.xWins}</div>
        <div>O Wins = {this.state.oWins}</div>
      </div>
    );
  }
}

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
