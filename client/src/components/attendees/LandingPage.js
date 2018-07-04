import React, { Component } from 'react';

// importing components
import MeshPanel from 'components/attendees/MeshPanel';

class LandingPage extends Component {
  render() {
    return (
      <section className="section section-landing grey lighten-5">
        <div className="valign-wrapper">
          <div className="row">
            <MeshPanel />
          </div>
        </div>
      </section>
    );
  }
}

export default LandingPage;
