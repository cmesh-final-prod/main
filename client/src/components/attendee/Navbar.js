import React, { Component } from 'react';

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
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
