import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';


class User extends Component {

render() {


  return (
    <div className='user'>
      <header>
        <div className="wrapper">
          <h1>Reviewers Login</h1>
          {this.props.user ?
    <button onClick={this.props.logout}>Log Out</button>
    :
    <button onClick={this.props.login}>Log In</button>
  }
        </div>
      </header>
      {this.props.user ?
    <div>
      <div className='user-profile'>
        <img src={this.props.user.photoURL} />
      </div>
      <div className='container'>
      <section className='display-item'>
    <div className="wrapper">
      <ul>
        {this.props.items.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>brought by: {item.user}
                 {item.user === this.props.user.displayName || item.user === this.props.user.email ?
                   <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
    <section className='add-item'>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
        <button>Add Item</button>
      </form>
    </section>
  </div>
    </div>
    :
    <div className='wrapper'>
      <p>You must be logged in to see the reviews list and submit to it.</p>
    </div>
  }
</div>
  );
}
}

export default User;
