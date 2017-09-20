import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
    <div className='userinfo'>
      <header>
        <div className="wrapper">
          {this.state.user ?
    <button onClick={this.logout}>Log Out</button>
    :
    <button onClick={this.login}>Log In</button>
  }
        </div>
      </header>
      {this.state.user ?
    <div>
      <div className='user-profile'>
        <img src={this.state.user.photoURL} />
      </div>
     }
    </div>
    );
  };
}

export default User;
