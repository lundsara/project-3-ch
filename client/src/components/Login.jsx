import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase';
import axios from 'axios'

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
          
              {/* show user's photo */}
              <img  className='userinfo' src={this.props.user.photoURL} />
          
         <div className='container'>
           <section className='display-review'>
            <div className="wrapper">
              <ul id='review'>
                {/* map over all reviews and display on page */}
                   {this.props.reviews.map((review) => {
                     console.log(`this is ${this.props.reviews}`)
                    return (
                      <li className='userReview' key={review.id}>
                        <h3>{review.title}</h3>
                        <div>Written by: {review.user}
                          <button onClick={() => this.props.removeReview(review.id)}>Remove Review</button>
                      </div>
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
                  <button onClick={this.props.handleCall} >Feels</button>
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
