import React, { Component } from 'react';

class SpinnerM extends Component {
  renderIcon(text) {
    return (
      <div className="spinner-m">
        <div className="white-text gradient-1 center circle z-depth-5 icon btn-floating pulse grey lighten-1">
          <span>m</span>
        </div>
        <div className="row">
          <div className="col s12 center text">
            <h4 className="grey-text flow-text">{text}</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.props.searching
      ? this.renderIcon('Searching...')
      : this.renderIcon('No active mesh networks found...');
  }
}

export default SpinnerM;
