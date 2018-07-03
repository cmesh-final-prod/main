import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
import * as actions from 'actions';

class Test extends Component {
  onButtonClick() {
    this.props.testConnection();
  }

  render() {
    return (
      <div className="container">
        <div className="card blue-grey">
          <div className="card-content center">
            <button
              onClick={() => this.onButtonClick()}
              className="btn white blue-text"
            >
              Test Server Connection
            </button>
            <div className="white-text center container">
              <h3>{this.props.test.env}</h3>
            </div>
          </div>
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
