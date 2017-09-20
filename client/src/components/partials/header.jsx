import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
      <nav>
      <h1>Event Feels</h1>
       <ul>
         <li><Link to="/home">Home</Link></li>
         <li><Link to="/reviewlist">Reviews</Link></li>
         <li><Link to="/login">Login</Link></li>
       </ul>
      </nav>
      </header>
    );
  };
}

export default Header;
