import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import TimeLeft from 'components/_misc/TimeLeft';
import Label from 'components/_misc/labels/Label';

class PanelHeader extends Component {
  onExpiry() {
    this.props.onExpiry();
  }

  render() {
    let { title, color, endDate, orgTitle } = this.props;

    return (
      <div className={`m-header ${this.props.bg}`}>
        <div className={`m-title ${color} left-align`}>
          <div className="m-title-text">{title}</div>
          <div className="m-labels">
            <Label
              text={orgTitle}
              bg="grey-text text-darken-1 grey lighten-4"
            />
          </div>
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
