import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed web-navbar">
        <nav className="transparent">
          <div className="nav-wrapper">
            <div className="container">
              <div className="brand-logo left">
                circle<b>mesh</b>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
