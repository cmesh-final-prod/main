import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Footer extends Component {
  handleClick() {
    const { fingerPrint } = this.props.currentUser;
    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.CONTACT_US_CLICKED,
        componentServed: '_misc-footer'
      }
    };
    this.props.createLog(createLogProps);
  }

  render() {
    return (
      <footer className="color-1">
        <div className="row center">
          <div className="col s6 white-text">
            <p>&copy; All Rights Reserved</p>
          </div>
          <div className="col s6">
            <div className="footer-btn">
              <a
                href="mailto:team@circlemesh.com"
                className="white-text right-align"
                onClick={() => this.handleClick()}
              >
                <p>
                  <u>Contact Us</u>
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(Footer);
