import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: "",
      showGameDetails: false,
      showNumPlayers: true,
      showPlayerEntry: false
    };
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  getPlayerNames = (players) => 
    players.map(p => this.state[p] || p)
  
  setNumPlayers = event => {
    event.preventDefault();
    this.setState({ showNumPlayers: false, showPlayerEntry: true });
  };

  setPlayerNames = event => {
    event.preventDefault();
    this.setState({ showPlayerEntry: false, showGameDetails: true });
  };

  render() {
    const {
      numPlayers,
      showGameDetails,
      showNumPlayers,
      showPlayerEntry,
    } = this.state;
    const players = Object.keys(this.state).filter(key => key.includes('player'))
    const playerNames = this.getPlayerNames(players)
    
    return (
      <div className="App">
        {showNumPlayers && (
          <form onSubmit={this.setNumPlayers}>
            <label>
              Number of Players:
              <input
                id="numPlayers"
                type="text"
                value={numPlayers}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" />
          </form>
        )}
        {showPlayerEntry && (
          <form onSubmit={this.setPlayerNames}>
            {new Array(parseInt(numPlayers, 10)).fill(0).map((x, i) => (
              <div key={i}>
                Player {i+1}{" "}
                <input
                  id={`player${i+1}`}
                  type="text"
                  value={this.state[`player${i+1}`]}
                  onChange={this.handleChange}
                />
              </div>
            ))}
            <input type="submit" />
          </form>
        )}
        {showGameDetails && (
          <div>
            <label>Number of players: </label>
            <span>{numPlayers}</span>
            <br/>
            <label>Player Names: </label>
            {playerNames.map(pn => <div>{pn}</div>)}
          </div>
        )}
      </div>
    );
  }
}

export default App;
