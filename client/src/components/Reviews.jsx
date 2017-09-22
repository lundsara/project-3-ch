import React, { Component } from 'react';


class Reviews extends Component {

  render() {
    return (
    <div id='single'>
      <section className='display-review'>
            <div className="wrapper">
              <ul id="review">
                {/* map over all reviews and display on page */}
                   {this.props.reviews.map((review) => {
                    return (
                      <li id='box' key={review.id}>
                        <h3>{review.title}</h3>
                        <div>Posted by: {review.user}
                      </div>
                     </li>
                   )
                 })}
              </ul>
            </div>
        </section>
      </div>

    )
  }
}

export default Reviews;
