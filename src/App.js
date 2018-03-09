import React, { Component } from 'react';
import RoyaltyRewardsApp from './components/app/app';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      royaltyRewardsApp: new RoyaltyRewardsApp(),
    };
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
