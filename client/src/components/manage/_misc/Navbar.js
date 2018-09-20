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

  renderMenu() {
    const MENU = [
      {
        id: 1,
        title: "signout",
        actionOne: this.props.clearState,
        actionTwo: this.props.history.push,
        url: "/"
      }
    ];

    return MENU.map(item => {
      const { id, title, actionOne, actionTwo, url } = item;
      const onClick = () => {
        actionOne();
        actionTwo(url);
      };
      return (
        <li key={id} onClick={() => onClick()}>
          <a href="" className="color-3-text">
            {title}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={`navbar-fixed`}>
        <nav className="color-5 z-depth-2">
          <div className="nav-wrapper">
            <div className="container">
              <div className={`brand-logo ${this.renderClass()}`}>
                <Link to="/manage/app" className="color-3-text">
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

export default connect(
  null,
  actions
)(withRouter(Navbar));
