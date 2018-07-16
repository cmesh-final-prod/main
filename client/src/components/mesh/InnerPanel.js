import React, { Component } from 'react';

class InnerPanel extends Component {
  render() {
    return (
      <div className="card mesh-panel-inner grey darken-2">
        <div className="container">
          <div className="card-content center">
            <div className="container">
              <h5 className="white-text">{this.props.title}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InnerPanel;
