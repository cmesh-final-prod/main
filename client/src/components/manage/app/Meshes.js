import React, { Component } from "react";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

// importing hoc
import withPubNub from "components/_hoc/withPubNub";

class Meshes extends Component {
  componentDidMount() {
    const { token } = this.props.auth;
    this.props.syncMeetups(token);
    this.props.fetchOrgMeshes(token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.org.orgMeshes !== prevProps.org.orgMeshes) {
      return this.renderOrgMeshes();
    }
  }

  renderTable(address, startDate, endDate) {
    const date = new Date(startDate).toDateString();
    const startTime = new Date(startDate).toLocaleTimeString();
    const endTime = new Date(endDate).toLocaleTimeString();

    let venue, time;
    if (address) {
      const { street, city } = address;
      venue = `${street}, ${city}`;
    } else {
      venue = "-";
    }

    if (startDate && endDate) {
      time = `${startTime} - ${endTime}`;
    } else if (startDate) {
      time = `${startTime} - `;
    } else {
      time = "-";
    }

    const TABLE = [
      { id: 1, title: "Date: ", text: date || "-" },
      { id: 2, title: "Time: ", text: time },
      { id: 3, title: "Venue: ", text: venue }
    ];

    return TABLE.map(item => {
      return (
        <tr key={item.id}>
          <td>
            <span className="bold-text ">{item.title}</span>
          </td>
          <td>{item.text}</td>
        </tr>
      );
    });
  }

  renderStatus(startDate, endDate, address) {
    if (!this.state.completeness) {
      return this.setState();
    }
  }

  renderOrgMeshes() {
    const { orgMeshes } = this.props.org;
    if (orgMeshes.length > 0) {
      return orgMeshes.map(orgMesh => {
        const { _id, eventDetails, startDate, endDate } = orgMesh;
        const { address, title } = eventDetails;
        const now = new Date().getTime();

        let status, statusClass, statusIcon;

        if (!startDate || !endDate || !address) {
          status = "ON HOLD";
          statusClass = "yellow-text text-darken-2";
        } else if (now > endDate) {
          status = "DONE";
          statusClass = "grey-text";
          statusIcon = "check";
        } else if (now >= startDate && now <= endDate) {
          status = "ACTIVE";
          statusClass = "red-text text-lighten-3";
        } else {
          status = "SCHEDULED";
          statusClass = "green-text text-lighten-3";
          statusIcon = "check_circle";
        }

        // const title =
        //   "Leveraging Customer-Focused Strategies to Achieeve High Growth";
        return (
          <div key={_id} className="org-mesh color-1 z-depth-5">
            <div className="sub-title title grey-text text-lighten-5 bold-text">
              {title}
            </div>
            <div className="div">
              <table className="grey-text text-lighten-5">
                <tbody>{this.renderTable(address, startDate, endDate)}</tbody>
              </table>
            </div>
            <div className="status row center grey lighten-5">
              <div
                className={` sub-title btn z-depth-0 grey lighten-5 bold-text ${statusClass}`}
              >
                <i className="material-icons">{statusIcon}</i>
                {status}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <h5 className="grey-text">No upcoming events were found.</h5>;
    }
  }

  renderTitle() {
    const { data } = this.props.org;
    return <h5 className="color-3-text title-text bold-text">{data.title}</h5>;
  }

  render() {
    return (
      <div className="row manage-mesh">
        <div className="col s12 m8">
          {this.renderTitle()}
          <div className="row divider" />
          <div className="col m6 s12">{this.renderOrgMeshes()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

//////////////////////////////////////////
//////      withPubNub Props     /////////
//////////////////////////////////////////

const channel = "fetchOrgMeshes";

const callback = ownProps => {
  ownProps.fetchOrgMeshes(ownProps.auth.token);
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(withPubNub(Meshes, channel, callback));
