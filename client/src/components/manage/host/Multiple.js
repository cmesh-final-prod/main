import React, { Component } from "react";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Multiple extends Component {
  state = { summary: [], tryagain: false, activeOption: null, urlName: null };

  componentDidMount() {
    const { token } = this.props.auth;
    this.props.fetchMeetupSummary(token);
  }

  componentDidUpdate(prevProps, prevState) {
    const { summary, isLinked } = this.props.org;
    const { push } = this.props.history;
    if (summary !== prevProps.org.summary) {
      this.setState({ summary });
    }

    if (isLinked !== prevProps.org.isLinked) {
      isLinked ? push("/manage/app") : this.setState({ tryagain: true });
    }

    if (this.state.tryagain !== prevState.tryagain) {
      isLinked ? push("/manage/app") : this.setState({ tryagain: true });
    }
  }

  onClick(urlName) {
    const { token } = this.props.auth;
    this.setState({ tryagain: false });
    this.props.addMeetupURL(token, urlName);
  }

  renderMeetupGroups() {
    const { summary } = this.state;
    return summary.map(group => {
      let optionColor;
      this.state.activeOption === group._id
        ? (optionColor = "color-1 white-text")
        : (optionColor = "grey-text color-2-border");

      return (
        <a href="" key={group._id}>
          <div
            className={`group sub-title z-depth-2 ${optionColor}`}
            onClick={() =>
              this.setState({
                tryagain: false,
                activeOption: group._id,
                urlName: group.urlName
              })
            }
          >
            {group.name.toUpperCase()}
          </div>
        </a>
      );
    });
  }

  renderTryagainMessage() {
    const message =
      "This meetup group is already linked with another circlemesh account.";
    return this.state.tryagain ? (
      <p className="sub-title red-text">{message}</p>
    ) : (
      ""
    );
  }

  renderSubmitButton() {
    let disabled;
    this.state.activeOption ? (disabled = false) : (disabled = true);
    return (
      <button
        className="btn color-1"
        onClick={() => this.onClick(this.state.urlName)}
        disabled={disabled}
      >
        Submit
      </button>
    );
  }

  render() {
    return (
      <div className="host-multiple">
        <div className="row">
          <div className="col s10 offset-s1 m6 offset-m3">
            <div className="title-text">
              <p className="bold-text blue-grey-text center">
                Select Primary Meetup Group
              </p>
            </div>

            <div className="col s12 m8 offset-m2 center">
              {this.renderMeetupGroups()}
              {this.renderSubmitButton()}
              {this.renderTryagainMessage()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(
  mapStateToProps,
  actions
)(Multiple);
