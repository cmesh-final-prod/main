import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import TimeLeft from 'components/_misc/TimeLeft';

class PanelHeader extends Component {
  onExpiry() {
    this.props.onExpiry();
  }

  render() {
    const { title, color, endDate, organizer } = this.props;
    return (
      <div className="m-header">
        <p className={`m-title ${color} flow-text left-align`}>{title}</p>
        <div className="m-label grey lighten-4">
          <p className="grey-text text-darken-1">{organizer}</p>
        </div>
        <div className="m-timer ">
          <TimeLeft
            className={`${color} center-align`}
            endDate={endDate}
            onMeshExpiry={() => this.onExpiry()}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(PanelHeader));
