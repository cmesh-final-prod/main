import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css";

// importing components
import Sidenav, { hamburgerMenu } from "components/_misc/navbar/Sidenav";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Navbar extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".scrollSpy");
    M.ScrollSpy.init(elems);
  }

  fetchMeetupInfo() {
    this.props.fetchMeetupGroupInfo();
  }

  renderClass() {
    return isTablet ? "left" : isMobile ? "center" : "left";
  }

  renderNavColor() {
    const { pathname } = this.props.location;
    return pathname === "/web/about"
      ? "color-5 z-depth-0"
      : "color-5 z-depth-0";
  }

  renderMenu() {
    const MENU = [
      {
        id: 2,
        title: "How It Works",
        url: "#HOW-IT-WORKS"
      },
      { id: 1, title: "Sign In", url: "/web/form/signin" }
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
  renderTitle() {
    return (
      <div className={`brand-logo ${this.renderClass()}`}>
        <a href="/" className="color-3-text">
          circle<b>mesh</b>
        </a>
      </div>
    );
  }

  render() {
    return (
      <div id="NAV">
        <div className={`navbar-fixed scrollSpy ${this.renderNavColor()}`}>
          <nav className={this.renderNavColor()}>
            <div className="nav-wrapper">
              <div className="container">
                {this.renderTitle()}
                {hamburgerMenu(this.props)}

                <ul className="right hide-on-med-and-down">
                  {this.renderMenu()}
                  <li>
                    <Link to="/web/form/create">
                      <button className="gradient-2 btn white-text create">
                        CREATE ACCOUNT
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <Sidenav />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(Navbar));
