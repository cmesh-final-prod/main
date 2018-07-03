import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
import * as actions from 'actions';

class Test extends Component {
  renderEnv() {
    return <p>{this.props.test.env}</p>;
  }

  render() {
    return (
      <div className=" container blue-grey lighten-5">
        <div className="center-align">
          <button onClick={() => this.props.testConnection()}>
            Test Server Connection
          </button>
          <div>{this.renderEnv()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ test }) {
  return { test };
}

export default connect(
  mapStateToProps,
  actions
)(Test);
