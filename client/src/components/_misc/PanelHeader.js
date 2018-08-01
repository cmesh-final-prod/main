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
    let { title, color, endDate, organizer } = this.props;
    // if (title.length > 30) {
    //   title = `${title.substring(0, 30)}...`;
    // }
    return (
      <div className="m-header">
        <div className={`m-title ${color} left-align`}>
          <div className="m-title-text">{title}</div>

          <span className="grey-text text-darken-1 m-label grey lighten-4">
            {organizer}
          </span>
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
