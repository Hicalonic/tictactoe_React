import React from "react";

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
  export default Statistic;