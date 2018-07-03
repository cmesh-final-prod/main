import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderGoogleAuthFlow() {
    console.log('auth: ', this.props.auth);

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="blue-grey darken-2">
          <div className="nav-wrapper">
            <Link to="/">Full Stack App</Link>
            <ul className="right">
              <li>
                <Link to="/test">Test</Link>
              </li>
              {this.renderGoogleAuthFlow()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
