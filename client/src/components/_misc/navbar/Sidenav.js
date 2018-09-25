import React, { Component } from "react";
import M from "materialize-css";
import * as L from "components/_misc/LOG-TYPES";

// importing constants
import { SIDENAV_MENU } from "components/_misc/CONSTANTS";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

class Sidenav extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  }

  render() {
    const sidenavMenu = SIDENAV_MENU.map(item => {
      return (
        <li key={item.id} className="sidenav-btn">
          <a href={item.url} onClick={item.onClick}>
            <button className={`btn z-depth-0 ${item.className}`}>
              {item.name}
            </button>
          </a>
        </li>
      );
    });

    return (
      <ul className="sidenav color-4" id="mobile-nav">
        <div className="brand-logo white-text center">
          circle<b>mesh</b>
        </div>

        <div className="sidenav-list row center">
          <div className="col s12">{sidenavMenu}</div>
        </div>
      </ul>
    );
  }
}

export const hamburgerMenu = ownProps => {
  const handleClick = () => {
    let fingerPrint;

    if (ownProps.currentUser) {
      fingerPrint = ownProps.currentUser.fingerPrint;
    }

    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.SIDENAV_MENU_CLICKED,
        componentServed: "_misc-navbar-sidenav"
      }
    };
    ownProps.createLog(createLogProps);
  };

  return (
    <ul className="left">
      <li>
        <a
          href=""
          data-target="mobile-nav"
          className="button-collapse sidenav-trigger color-3-text"
          onClick={() => handleClick()}
        >
          <i className="material-icons">menu</i>
        </a>
      </li>
    </ul>
  );
};

function mapStateToProps({ meshes }) {
  return { meshes };
}

export default connect(
  mapStateToProps,
  actions
)(Sidenav);
