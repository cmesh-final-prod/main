import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class InnerMeshPanel extends Component {
  render() {
    const [mesh] = this.props.selectedMesh;

    if (mesh) {
      return (
        <div className="card mesh-panel-inner grey darken-2">
          <div className="container">
            <div className="card-content center">
              <div className="container">
                <h5 className="white-text">{mesh.title}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

function mapStateToProps({ selectedMesh }) {
  return { selectedMesh };
}

export default connect(mapStateToProps)(InnerMeshPanel);
