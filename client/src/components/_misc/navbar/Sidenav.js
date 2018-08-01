import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

// importing constants
import { SIDENAV_MENU, MESH_PROPS } from 'components/_misc/CONSTANTS';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Sidenav extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  createMeshProps() {
    const { lng, lat } = this.props.meshes.location;
    const organizerId = '5b4ba413d0f8cc5b14661967';
    this.props.createMesh(MESH_PROPS(lng, lat), organizerId);
  }

  render() {
    const sidenavMenu = SIDENAV_MENU.map(item => {
      return (
        <li key={item.id}>
          <Link to={item.url} onClick={item.onClick}>
            <h5 className={`text-color-1 ${item.className}`}>
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
          <h4 className="text-color-1">
            circle<b>mesh</b>
          </h4>
        </div>
        <div className="divider text-color-1" />
        <div className="sidenav-list container">
          {sidenavMenu}
          <li>
            <div className="center">
              <button
                className="btn light-blue white text-color-1 btn-create"
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

export const hamburgerMenu = () => {
  return (
    <ul className="left">
      <li>
        <a
          href=""
          data-target="mobile-nav"
          className="button-collapse sidenav-trigger text-color-1"
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
