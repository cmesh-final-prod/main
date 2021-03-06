import React, { Component } from "react";
import M from "materialize-css";
import StarRatingComponent from "react-star-rating-component";
import * as L from "components/_misc/LOG-TYPES";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

class Feedback extends Component {
  state = {
    eventFeedback: 0,
    eventDescription: "",
    cmeshFeedback: 0,
    cmeshDescription: "",
    submittedAt: new Date().getTime()
  };

  componentDidMount() {
    const elems = document.querySelectorAll(".modal");
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

    const { fingerPrint } = this.props.currentUser;
    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.FEEDBACK_SUBMITTED,
        componentServed: "mesh-feedback-wrapper",
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
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
        id: "eventFeedback",
        text: "Overall, how was the event today?",
        cb: this.handleEventFeedback.bind(this),
        desc: "eventDescription"
      },
      {
        id: "cmeshFeedback",
        text: "How useful was Circlemesh in this event?",
        cb: this.handleCmeshFeedback.bind(this),
        desc: "cmeshDescription"
      }
    ];

    return CONTENT.map(content => {
      return (
        <div key={content.id} className="m-feedback-type grey lighten-5">
          <p className="color-7-text sub-title">{content.text}</p>
          <div className="m-feedback-star">
            <StarRatingComponent
              name={content.id}
              starCount={5}
              value={this.state[content.id]}
              onStarClick={content.cb}
              renderStarIcon={() => (
                <span>
                  <i className="material-icons small">star_border</i>
                </span>
              )}
              emptyStarColor={"#cccccc"}
            />
            <div className="m-feedback-textarea">
              <textarea
                id={content.id}
                className="materialize-textarea color-1-text"
                placeholder="please explain"
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
      <div className="modal bottom-sheet m-feedback-modal" id="feedbackModal">
        <div className="modal-content m-feedback-content">
          <p className="m-feedback-title color-6-text">
            <i className="material-icons left large">forum</i>Feedback
          </p>
          <div className="m-feedback-divider divider color-1" />
          {this.renderModalContent()}
        </div>
        <div className="row">
          <div className="col s12 m-feedback-footer center">
            <div
              className="waves-effect grey btn-large color-7 color-6-text m-feedback-button btn"
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

  handleFeebackBtnClick() {
    const { fingerPrint } = this.props.currentUser;
    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.FEEDBACK_BTN_CLICKED,
        componentServed: "mesh-feedback-wrapper",
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
  }

  renderForm() {
    return (
      <div className="row m-feedback-trigger center">
        <div className="center waves-effects btn btn-large white shadow-2 color-7 feedback-trigger-btn">
          <a
            href="#feedbackModal"
            className="modal-trigger"
            onClick={() => this.handleFeebackBtnClick()}
          >
            <div className="color-6-text bold-text">Feedback</div>
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
    return isFeedbackProvided ? "" : this.renderForm();
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(Feedback);
