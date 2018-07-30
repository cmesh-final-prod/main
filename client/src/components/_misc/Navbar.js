import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Navbar extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  createMeshProps() {
    const { lng, lat } = this.props.meshes.location;

    const meshProps = {
      title: 'This is a test event',
      coordinates: [lng, lat],
      duration: 1,
      startDate: new Date(),
      description:
        'Odit sit ab repudiandae dolor necessitatibus ea asperiores a consectetur.',
      address: '077 Ashly Course'
    };

    const organizerId = '5b4ba413d0f8cc5b14661967';

    this.props.createMesh(meshProps, organizerId);
  }

  renderSideNav() {
    const MENU = [
      { id: 1, name: 'About', url: '/about', onClick: null, className: '' },
      { id: 2, name: 'Contact', url: '', onClick: null, className: '' }
    ];

    if (!this.props.sidenav) {
      return MENU.map(item => {
        return (
          <li key={item.id} className="black">
            <Link to={item.url} onClick={item.onClick} className="grey-text">
              {item.name}
            </Link>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="white">
            <div className="nav-wrapper nav-gradient">
              <div className="row">
                <div className="">
                  <div className="brand-logo white-text text-darken-2">
                    <span className="text-color-1">
                      circle<b>mesh</b>
                    </span>
                  </div>
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
                </div>
              </div>
            </div>
          </nav>
        </div>
        <ul className="sidenav" id="mobile-nav">
          {this.renderSideNav()}
          <li>
            <button
              className="btn light-blue white-text"
              onClick={() => this.createMeshProps()}
            >
              Create
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ meshes }) {
  return { meshes };
}

export default connect(
  mapStateToProps,
  actions
)(Navbar);
