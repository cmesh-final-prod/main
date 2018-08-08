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

  renderModalContent() {
    const CONTENT = [
      {
        id: 'eventFeedback',
        text: 'Please rate this event: ',
        cb: this.handleEventFeedback.bind(this),
        desc: 'eventDescription'
      },
      {
        id: 'cmeshFeedback',
        text: 'Please rate circlemesh: ',
        cb: this.handleCmeshFeedback.bind(this),
        desc: 'cmeshDescription'
      }
    ];

    return CONTENT.map(content => {
      return (
        <div key={content.id} className="m-feedback-type grey lighten-5">
          <p className="text-color-1">{content.text}</p>
          <div className="m-feedback-star">
            <StarRatingComponent
              name={content.id}
              starCount={5}
              value={this.state[content.id]}
              onStarClick={content.cb}
              renderStarIcon={() => (
                <span>
                  <i className="material-icons">star_border</i>
                </span>
              )}
              emptyStarColor={'#cccccc'}
            />
            <div className="m-feedback-textarea">
              <textarea
                id={content.id}
                className="materialize-textarea text-color-1"
                placeholder="describe..."
                onChange={e =>
                  this.setState({ [content.desc]: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      );
    });
  }

  renderModal() {
    return (
      <div className="modal m-feedback-modal" id="feedbackModal">
        <div className="modal-content m-feedback-content">
          <p className="m-feedback-title text-color-1">Feedback</p>
          <div className="m-feedback-divider divider color-1" />
          {this.renderModalContent()}
        </div>
        <div className="row">
          <div className="col s12 m-feedback-footer center">
            <div
              className="waves-effect light-blue m-feedback-button btn"
              onClick={() => this.handleSumbit()}
              disabled={this.shouldDisable()}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="row">
        <div className="col s12  m-feedback-trigger center waves-effects light-blue waves-light z-depth-2 ">
          <a href="#feedbackModal" className="modal-trigger">
            <p className="white-text">PROVIDE FEEDBACK</p>
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
