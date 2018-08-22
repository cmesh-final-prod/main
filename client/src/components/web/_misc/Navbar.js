import React, { Component } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  renderClass() {
    return isTablet ? 'left' : isMobile ? 'center' : 'left';
  }

  renderNavColor() {
    const { pathname } = this.props.location;
    return pathname === '/web/about' ? 'web-navbar transparent' : 'color-1';
  }

  renderMenu() {
    const { url } = this.props.match;
    const MENU = [
      { id: 1, title: 'Terms Of Use', url: `${url}/terms-of-use` },
      { id: 2, title: 'Log In', url: '/terms-of-use' }
    ];

    return MENU.map(item => {
      return (
        <li key={item.id}>
          <Link to={item.url}>{item.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={`navbar-fixed ${this.renderNavColor()}`}>
        <nav className={this.renderNavColor()}>
          <div className="nav-wrapper">
            <div className="container">
              <div className={`brand-logo ${this.renderClass()}`}>
                <Link to="/">
                  circle<b>mesh</b>
                </Link>
              </div>
              <ul className="right hide-on-med-and-down">
                {this.renderMenu()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
