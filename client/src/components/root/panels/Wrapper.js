import React, { Component } from 'react';
import 'css/panels.css';

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
        />
      );
    });
  }

  render() {
    return (
      <div>
        <section className="section section-landing grey lighten-5">
          <div className="valign-wrapper">
            <div className="row">{this.renderActiveMeshes()}</div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ meshes }) {
  return { meshes };
}

export default connect(mapStateToProps)(PanelsWrapper);
