import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div id="home">
      <aside> <img src="http://www.clker.com/cliparts/4/a/3/4/1206566086625250088Anonymous_pen_pencil_3.svg.hi.png"/></aside>
      <p id="welcome">Welcome to Mood Diary! <br /> Gain an accurate analysis of your mood <br/> by using artifical intelligence to interpret<br/>the sentiment in your entry!</p>
      <div id="enter"><Link to="/login">Click here to Begin</Link></div>
    </div>
    );
  };
}

export default Home;
