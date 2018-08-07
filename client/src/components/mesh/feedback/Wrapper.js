import React, { Component } from 'react';
import M from 'materialize-css';
import StarRatingComponent from 'react-star-rating-component';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Feedback extends Component {
  state = {
    eventFeedback: 0,
    eventDescription: '',
    cmeshFeedback: 0,
    cmeshDescription: '',
    submittedAt: new Date().getTime()
  };

  componentDidMount() {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }

  handleEventFeedback(nextValue, prevValue, name) {
    this.setState({ eventFeedback: nextValue });
  }

  handleCmeshFeedback(nextValue, prevValue, name) {
    this.setState({ cmeshFeedback: nextValue });
  }

  handleSumbit() {
    const userId = this.props.currentUser.data._id;
    const { meshId } = this.props.selectedMesh.data;
    const feedbackProps = { ...this.state };
    this.props.addMeshFeedback(meshId, userId, feedbackProps);
    this.props.fetchCurrentUser(meshId);
  }

  shouldDisable() {
    if (this.state.eventFeedback === 0 && this.state.cmeshFeedback === 0) {
      return true;
    } else {
      return false;
    }
  }

  renderModal() {
    return (
      <div className="modal" id="feedbackModal">
        <div className="modal-content">
          <h4>Anonymous Feedback</h4>
          <p>Event Feedback</p>
          <StarRatingComponent
            name="eventFeedback"
            starCount={5}
            value={this.state.eventFeedback}
            onStarClick={this.handleEventFeedback.bind(this)}
          />
          <br />
          <p>Circlemesh Feedback</p>
          <StarRatingComponent
            name="cmeshFeedback"
            starCount={5}
            value={this.state.cmeshFeedback}
            onStarClick={this.handleCmeshFeedback.bind(this)}
          />
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className=" waves-effect waves-green btn-flat"
            onClick={() => this.handleSumbit()}
            disabled={this.shouldDisable()}
          >
            Submit
          </a>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <div className="center">
          <a
            href="#feedbackModal"
            className="waves-effects btn light-blue waves-light modal-trigger"
          >
            <p className="white-text">Please provide feedback</p>
          </a>
        </div>
        {this.renderModal()}
      </div>
    );
  }

  renderThanks() {
    return <div>Thanks Buddy!</div>;
  }

  render() {
    const { isFeedbackProvided } = this.props.currentUser.data;
    return isFeedbackProvided ? '' : this.renderForm();
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(Feedback);
