import React, { Component } from "react";

class AddReviewForm extends Component {
  render() {
    return (
      <form
        className="add-review-form"
        onSubmit={this.props.handleReviewSubmit}
      >
      <input
          type="text"
          value={this.props.inputOrganizerValue}
          name="content"
          placeholder="Add Organizer Name Here"
          onChange={this.props.handleInputOrganizerChange}
      /><br/>
        <input
          type="text"
          value={this.props.inputNameValue}
          name="author"
          placeholder="Add Event Name Here"
          onChange={this.props.handleInputNameChange}
        /><br/>
         <input
          type="text"
          value={this.props.inputDateValue}
          name="author"
          placeholder="Add Event Date Here"
          onChange={this.props.handleInputDateChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputReviewValue}
          name="genre_type"
          placeholder="Add Review Here"
          onChange={this.props.handleInputReviewChange}
        /><br/>
        <button id="submit">Add Review!</button>
      </form>
    );
  }
}

export default AddReviewForm;
