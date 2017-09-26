import React from 'react';
import { Link } from 'react-router-dom';

const Review = props => (
  <li id="box" key={props.review.id}>
    <h3>{props.review.title}</h3>
    <div>
      <p className="person">Posted by: {props.review.user}</p>
      {/* If i've been composed with a child, render */}
      {props.children}
      {/* {props.review.user === this.props.user.displayName || props.review.user === this.state.user.email ? */}
      <Link className="link"
        to="/update"
        onClick={() => props.getReviewToUpdate(props.review.id)}>Update Review</Link>

    </div>
  </li>
);

export default Review;
