import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div id="home">
      <p id="welcome">Welcome to Event Feels! <br /> The only place in the universe to find how your event <br/>made others feel using sentiment analysis!</p>
      <div id="enter"><Link to="/login">Enter</Link></div>
    </div>
    );
  };
}

export default Home;
