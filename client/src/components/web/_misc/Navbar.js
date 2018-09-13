import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Link, withRouter } from "react-router-dom";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Navbar extends Component {
  fetchMeetupInfo() {
    this.props.fetchMeetupGroupInfo();
  }

  renderClass() {
    return isTablet ? "left" : isMobile ? "center" : "left";
  }

  renderNavColor() {
    const { pathname } = this.props.location;
    return pathname === "/web/about" ? "color-5 z-depth-0" : "color-1";
  }

  renderMenu() {
    const { url } = this.props.match;
    const MENU = [
      {
        id: 2,
        title: "How It Works",
        url: "/auth/meetup?orgId=5b655afae0596954907ef72c"
      },
      { id: 1, title: "Sign In", url: "" }
    ];

    return MENU.map(item => {
      return (
        <li key={item.id}>
          <a href={item.url} className="color-3-text">
            {item.title}
          </a>
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
              <div
                onClick={() => this.fetchMeetupInfo()}
                className={`brand-logo ${this.renderClass()}`}
              >
                <Link to="/" className="color-3-text">
                  circle<b>mesh</b>
                </Link>
              </div>

              <ul className="right hide-on-med-and-down">
                {this.renderMenu()}
                <li>
                  <div className="gradient-2 btn-1 white-text">Sign Up</div>
                </li>
              </ul>
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
)(withRouter(Navbar));
