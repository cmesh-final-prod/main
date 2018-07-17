import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Navbar extends Component {
  createMeshProps() {
    const meshProps = {
      title: 'Near By And Active',
      coordinates: [-122.4451599, 37.664456099999995],
      duration: 5,
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
      <nav className="white">
        <div className="nav-wrapper">
          <div className="row">
            <div className="container">
              <div className="brand-logo grey-text text-darken-2">
                circle<b>mesh</b>
              </div>
              <ul className="right">
                <li>
                  <button
                    className="btn"
                    onClick={() => this.createMeshProps()}
                  >
                    create
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  actions
)(Navbar);
