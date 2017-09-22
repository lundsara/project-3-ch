import React, { Component } from "react";

class Add extends Component {
  render() {
    return (
      <section className='add-review'>
               <form onSubmit={this.props.handleSubmit}>
                  <input id='login'type="text" name="username" placeholder="What's your name?" value={this.props.user.displayName || this.props.user.email} />
                  <input type="text" name="currentReview" placeholder="Tell us what you thought?" onChange={this.props.handleChange} value={this.props.currentReview} />
                  <br/>
                  <button>Add Review</button>
              </form>
            </section>
    );
  }
}

export default Add;
