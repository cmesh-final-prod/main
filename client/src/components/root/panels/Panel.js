import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing log types
import * as L from "components/_misc/LOG-TYPES";

// importing hoc
import withLogOnMount from "components/_hoc/withLogOnMount";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

// importing components
import PanelHeader from "components/_misc/PanelHeader";
import Stats from "components/root/panels/Stats";

class MeshPanel extends Component {
  handleClick() {
    this.props.selectMesh(this.props.meshId);
    const { fingerPrint } = this.props.currentUser;
    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.JOIN_CLICKED,
        componentServed: "root-panels-panel",
        meshId: this.props.meshId
      }
    };
    this.props.createLog(createLogProps);
  }

  refreshMeshes = () => {
    const { lng, lat } = this.props.meshes.location;
    this.props.fetchMeshes(lng, lat);
  };

  renderPanelHeader() {
    const { lng, lat } = this.props.meshes.location;
    const { title, orgTitle, endDate } = this.props;
    return (
      <PanelHeader
        title={"Leveraging Customer-Focused Strategies to Achieve High Growth"}
        bg=""
        color="white-text light-text"
        labelBg="transparent color-4-border"
        labelText="white-text"
        endDate={endDate}
        orgTitle={"ProductTank SF"}
        onExpiry={() => this.props.fetchMeshes(lng, lat)}
      />
    );
  }

  renderStats() {
    const { totalUsers, totalHiring, totalLookingForJob } = this.props;
    return (
      <Stats
        totalUsers={totalUsers}
        totalHiring={totalHiring}
        totalLookingForJob={totalLookingForJob}
      />
    );
  }

  renderBodyResting() {
    return (
      <div className="center">
        <div className="row">
          <div className="m-body col s10 offset-s1">
            <div className="m-body-inner white-text">
              <div className="m-body-resting pulse btn-floating btn-flat grey darken-4 white-text circle">
                LIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPanelBody() {
    const { totalUsers } = this.props;
    return totalUsers > 1 ? this.renderStats() : this.renderBodyResting();
  }

  renderJoinButton() {
    return (
      <div className="center">
        <Link
          to="/mesh"
          onClick={() => this.handleClick()}
          className="btn-join color-10 color-10-text grey waves-effect btn z-depth-0"
        >
          <p className="flow-text bold-text">JOIN THE MESH</p>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="card m-panel gradient-2 shadow-2 z-depth-5">
        <div className="card-content">
          {this.renderPanelHeader()}
          {this.renderPanelBody()}
          {this.renderJoinButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meshes, currentUser }) {
  return { meshes, currentUser };
}

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: "root-panels-panel",
    meshId: ownProps.meshId
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(withLogOnMount(MeshPanel, logProps));
