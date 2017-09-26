import React from 'react';
import Review from './Review';
import Feels from './Feels';


const ReviewList = props => (
  <div id="list">
    <section className="display-review">
      <div className="wrapper">
        <ul id="review">
          {/* map over all reviews and display on page */}
          {
            props.reviews.map(review =>
              <Review review={review}>
                <Feels sentimentList={review.feels} />
              </Review>
            )
          }
        </ul>
      </div>
    </section>
  </div>
);

export default ReviewList;
