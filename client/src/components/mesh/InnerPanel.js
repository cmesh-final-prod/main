import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// importing components
import TimeLeft from 'components/_misc/TimeLeft';

class InnerPanel extends Component {
  redirectToMeshExpiredComponent() {
    this.props.history.push(`${this.props.match.url}/expired`);
  }

  render() {
    return (
      <div className="card mesh-panel-inner grey darken-2">
        <div className="container">
          <div className="card-content center">
            <div className="container">
              <h5 className="white-text">{this.props.title}</h5>
              <TimeLeft
                className="white-text"
                endDate={this.props.endDate}
                onMeshExpiry={() => this.redirectToMeshExpiredComponent()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InnerPanel);
