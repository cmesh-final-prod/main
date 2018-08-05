import React, { Component } from 'react';

// importing components
import Panel from 'components/root/panels/Panel';

// container elements
import { connect } from 'react-redux';

class PanelsWrapper extends Component {
  renderActiveMeshes() {
    return this.props.meshes.data.map(mesh => {
      return (
        <Panel
          key={mesh.meshId}
          meshId={mesh.meshId}
          title={mesh.title}
          distance={mesh.distance.calculated}
          endDate={mesh.endDate}
          totalUsers={mesh.totalUsers}
          totalHiring={mesh.totalHiring}
          totalLookingForJob={mesh.totalLookingForJob}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="valign-wrapper">
          <div className="row">{this.renderActiveMeshes()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meshes }) {
  return { meshes };
}

export default connect(mapStateToProps)(PanelsWrapper);
