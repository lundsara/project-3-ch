import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
      <nav>
      <p id='title'>Mood Diary</p>
      <div id="lister">
       <ul>
         <li><Link to="/home">Home</Link></li>
         <li><Link to="/reviews">Diary Entries</Link></li>
         <li><Link to="/login">Account</Link></li>
       </ul>
       </div>
      </nav>
      </header>
    );
  };
}

export default Header;
