import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Navbar extends Component {
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
                    onClick={() => this.props.addMesh({ title: 'mesh nine' })}
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
