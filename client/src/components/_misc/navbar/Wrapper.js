import React, { Component } from 'react';

// importing components
import Sidenav, { hamburgerMenu } from 'components/_misc/navbar/Sidenav';
import Logo from 'components/_misc/Logo';
import { withRouter } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class NavbarWrapper extends Component {
  renderTitle() {
    return <Logo />;
  }

  renderLeftIcon() {
    const { url } = this.props.match;
    return url === '/mesh' ? '' : hamburgerMenu(this.props);
  }

  renderRightIcon() {}

  renderContent() {
    return <Sidenav />;
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="white">
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

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(NavbarWrapper));
