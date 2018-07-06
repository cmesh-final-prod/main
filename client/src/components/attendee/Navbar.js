import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
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
                    onClick={() =>
                      this.props.createMesh({ title: 'mesh nine' })
                    }
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
