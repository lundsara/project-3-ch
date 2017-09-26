import React, { Component } from "react";

class Update extends Component {
  render() {
    return (
      <section className='update-review'>
        <form onSubmit={this.props.updateReview}>
          <textarea type="text" name="currentReview" placeholder="Tell us what you thought?" onChange={this.props.handleChange} value={this.props.currentReview} />
          <br/>
          <button type="submit">Update Review</button>
        </form>
      </section>

    );
  }
}

export default Update;
