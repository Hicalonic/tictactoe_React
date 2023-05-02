
import React from 'react';

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
  export default MoveList;