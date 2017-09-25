import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Update extends Component {
  render() {
    return (

      <section className='update-review'>
        <form onSubmit={this.props.updateReview}>
          <textarea type="text" name="currentReview" placeholder="Tell us what you thought?" onChange={this.props.handleChange} value={this.props.currentReview} />
          <br/>
          <button onClick={(e) => this.props.updateReview(e)}>Update Review</button>
        </form>
      </section>

    );
  }
}

export default Update;
