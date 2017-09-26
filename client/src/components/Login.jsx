import React, { Component } from 'react';

import Feels from './Feels';
import ReviewList from './ReviewList';
import Add from './Add';


class Login extends Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }


  render() {
    return (
      <div className="login">
        <div className="wrapper">
          <h2>Your Account</h2>
          {/* adding ternary operator for login logout */}
          {this.props.user ?
            <button onClick={this.props.logout}>Log Out</button>
            :
            <button onClick={this.props.login}>Log In</button>
          }
        </div>
        {this.props.user ?
          <div>
            {/* show user's photo */}
            <img className="userinfo" src={this.props.user.photoURL} />
            <div className="container">
              <section className="display-review">
                <div className="wrapper">
                  <ReviewList
                  getReviewToUpdate={this.props.getReviewToUpdate}
                  reviews={this.props.reviews}
                  />
                </div>
              </section>
              {/* form to add new review */}
              <Add
                handleSubmit={this.props.handleSubmit}
                user={this.props.user}
                handleChange={this.props.handleChange}
                />
            </div>
          </div>
          :
          <div className="wrapper">
            <p>You must be logged in to see the reviews list and submit to it.</p>
          </div>
        }
      </div>
    );
  }
}
export default Login;


