import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Navbar extends Component {
  createMeshProps() {
    const meshProps = {
      title: 'Near By And Active RealTime',
      coordinates: [-122.44577670000001, 37.6639105],
      duration: 1,
      startDate: new Date(),
      description:
        'Odit sit ab repudiandae dolor necessitatibus ea asperiores a consectetur.',
      address: '077 Ashly Course'
    };

    const organizerId = '5b4ba413d0f8cc5b14661967';

    this.props.createMesh(meshProps, organizerId);
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="white">
          <div className="nav-wrapper nav-gradient">
            <div className="row">
              <div className="container">
                <div className="brand-logo">
                  <span className="logo">
                    circle<b>mesh</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Navbar);
