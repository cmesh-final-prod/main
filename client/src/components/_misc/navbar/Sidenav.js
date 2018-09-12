import React, { Component } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import * as L from "components/_misc/LOG-TYPES";

// importing constants
import { SIDENAV_MENU, MESH_PROPS } from "components/_misc/CONSTANTS";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

class Sidenav extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  }

  createMeshProps() {
    const { lng, lat } = this.props.meshes.location;
    let orgId;
    process.env.NODE_ENV === "development"
      ? (orgId = "5b655afae0596954907ef72c")
      : (orgId = "5b6bf03df239d60014bd6bce");

    this.props.createMesh(MESH_PROPS(lng, lat), orgId);
  }

  render() {
    const sidenavMenu = SIDENAV_MENU.map(item => {
      return (
        <li key={item.id}>
          <Link to={item.url} onClick={item.onClick}>
            <h5 className={` color-4-text ${item.className}`}>
              {item.name}
              <i className="material-icons left">{item.icon}</i>
            </h5>
          </Link>
        </li>
      );
    });

    return (
      <ul className="sidenav" id="mobile-nav">
        <div className="brand-logo transparent center">
          <h4 className="color-4-text">
            circle<b>mesh</b>
          </h4>
        </div>
        <div className="divider" />
        <div className="sidenav-list container">
          {sidenavMenu}
          <li>
            <div className="center">
              <button
                className="btn light-blue white color-4-text btn-create"
                onClick={() => this.createMeshProps()}
              >
                Create
              </button>
            </div>
          </li>
        </div>
      </ul>
    );
  }
}

export const hamburgerMenu = ownProps => {
  const handleClick = () => {
    const { fingerPrint } = ownProps.currentUser;
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
