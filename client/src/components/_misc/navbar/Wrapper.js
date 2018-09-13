import React, { Component } from "react";

// importing components
import Sidenav, { hamburgerMenu } from "components/_misc/navbar/Sidenav";
import Logo from "components/_misc/Logo";
import { withRouter } from "react-router-dom";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

class NavbarWrapper extends Component {
  state = { navClass: "color-5" };

  renderTitle() {
    return <Logo />;
  }

  renderLeftIcon() {
    const { url } = this.props.match;
    return url === "/mesh" ? "" : hamburgerMenu(this.props);
  }

  renderRightIcon() {}

  meshesNotFound() {
    setTimeout(() => this.setState({ navClass: "color-5" }), 2000);
    return this.state.navClass;
  }

  renderClass() {
    const { isFetching, isPopulated } = this.props.meshes;
    return isFetching && !isPopulated
      ? "color-5"
      : isPopulated
        ? "color-5"
        : this.meshesNotFound();
  }

  renderContent() {
    return <Sidenav />;
  }

  render() {
    return (
      <div>
        <div className={`navbar-fixed ${this.renderClass()} `}>
          <nav className={`${this.renderClass()} z-depth-0`}>
            <div className="nav-wrapper">
              <div className="row">
                <div className="white-text">
                  {this.renderTitle()}
                  {this.renderLeftIcon()}
                  {this.renderRightIcon()}
                </div>
              </div>
            </div>
          </nav>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ currentUser, meshes }) {
  return { currentUser, meshes };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(NavbarWrapper));
