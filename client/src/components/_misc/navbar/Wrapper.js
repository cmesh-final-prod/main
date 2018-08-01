import React, { Component } from 'react';

// importing components
import Sidenav, { hamburgerMenu } from 'components/_misc/navbar/Sidenav';
import Logo from 'components/_misc/Logo';
import { withRouter } from 'react-router-dom';

class NavbarWrapper extends Component {
  renderTitle() {
    return <Logo />;
  }

  renderLeftIcon() {
    const { url } = this.props.match;
    return url === '/mesh' ? '' : hamburgerMenu();
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
            <div className="nav-wrapper nav-gradient">
              <div className="row">
                <div className="">
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

export default withRouter(NavbarWrapper);
