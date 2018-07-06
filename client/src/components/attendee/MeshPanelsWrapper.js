import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
import * as actions from 'actions';

// importing components
import MeshPanel from 'components/attendee/MeshPanel';

class LandingPage extends Component {
  componentDidMount() {
    this.props.fetchActiveMeshes();
  }

  renderActiveMeshes() {
    return this.props.activeMeshes.map(mesh => {
      return <MeshPanel key={mesh.id} id={mesh.id} title={mesh.title} />;
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

function mapStateToProps({ activeMeshes }) {
  return { activeMeshes };
}

export default connect(
  mapStateToProps,
  actions
)(LandingPage);
