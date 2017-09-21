import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';


class Login extends Component {
  render() {
    return (
  <div className='login'>
        <div className="wrapper">
          <h1>Login to your Account</h1>
          {/* adding ternary operator for login logout */}
          {this.props.user ?
            <button onClick={this.props.logout}>Log Out</button>
            :
            <button onClick={this.props.login}>Log In</button>
          }
        </div>
      {this.props.user ?
         <div>
            <div className='userinfo'>
              {/* show user's photo */}
              <img src={this.props.user.photoURL} />
            </div>
         <div className='container'>
           <section className='display-review'>
            <div className="wrapper">
              <ul>
                {/* map over all reviews and display on page */}
                   {this.props.reviews.map((review) => {
                    return (
                      <li key={review.id}>
                        <h3>{review.title}</h3>
                        <p>Written by: {review.user}
                          {review.user === this.props.user.displayName || review.user === this.state.user.email ?
                          <button onClick={() => this.props.removeReview(review.id)}>Remove Review</button> : null}
                      </p>
                     </li>
                   )
                 })}
              </ul>
            </div>
          </section>
            {/* form to add new review */}
            <section className='add-review'>
               <form onSubmit={this.props.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" value={this.props.user.displayName || this.props.user.email} />
                  <input type="text" name="currentReview" placeholder="Tell us what you thought?" onChange={this.props.handleChange} value={this.props.currentReview} />
                  <button>Add Review</button>
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

  export default Login;
