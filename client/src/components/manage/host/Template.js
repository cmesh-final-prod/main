import React, { Component } from "react";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Template extends Component {
  renderText() {
    const { text1, text2, text3 } = this.props;
    const PROPS = [
      { id: 1, text: text1 },
      { id: 2, text: text2 },
      { id: 3, text: text3 }
    ];
    return PROPS.map(prop => {
      return prop.id < PROPS.length && prop.text ? (
        <span key={prop.id}>
          {prop.text}
          <br />
          <br />
        </span>
      ) : (
        <span key={prop.id}>{prop.text}</span>
      );
    });
  }

  renderButton() {
    const { orgId } = this.props.org;
    return (
      <a href={`/auth/meetup/?orgId=${orgId}`}>
        <button className="btn color-4 z-depth-4 main-text bold-text">
          Sign in with meetup
        </button>
      </a>
    );
  }

  renderNote() {
    return (
      <div className="col s10 offset-s1 m12">
        <p className="">
          <i>
            <b>Note:</b> We never make any changes or post on your behalf.
          </i>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="host">
        <div className="row">
          <div className="col s10 offset-s1 m6 offset-m3 text grey lighten-3 blue-grey-text">
            <div className="title-text">
              <p className="bold-text blue-grey-text center">
                Link Your Events
              </p>
            </div>
            <div>
              <p className="main-text left">{this.renderText()}</p>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col s10 offset-s1 m6 offset-m3 link center">
            {this.renderButton()}
            {this.renderNote()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ org }) {
  return { org };
}

export default connect(
  mapStateToProps,
  actions
)(Template);
