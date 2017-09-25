import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
      <nav>
      <p id='title'>Event Feels</p>
       <ul>
         <li><Link to="/home">Home</Link></li>
         <li><Link to="/reviews">Reviews</Link></li>
         <li><Link to="/login">Account</Link></li>
       </ul>
      </nav>
      </header>
    );
  };
}

export default Header;
