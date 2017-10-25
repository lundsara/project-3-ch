import React from 'react';
import Login from './Login';

const Add = props => (
  <section className="add-review">
    <form onSubmit={props.handleSubmit}>
      <textarea id="user"type="text" name="username" placeholder="What's your name?" value={props.user.displayName || props.user.email} />
      <textarea type="text" name="currentReview" placeholder="Tell us what you thought?" onChange={props.handleChange} value={props.currentReview} />
      <br />
      <button type="submit">Add Entry</button>
      {/* <button onClick={this.props.handleCall}>Feels</button> */}
    </form>
  </section>
);

export default Add;
