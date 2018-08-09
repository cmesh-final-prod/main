import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// temp
import ip from 'ip';
import { deviceDetect, browserName, browserVersion } from 'react-device-detect';

class Content extends Component {
  renderDeviceData() {
    return (
      <div>
        <p>
          Ip: {ip.address()}
          <br />
          browserName: {browserName}
          <br />
          browserVersion: {browserVersion}
          <br />
          ua: {deviceDetect().ua}
          <br />
          isMobile: {deviceDetect().isMobile ? 'true' : 'false'}
          <br />
          model: {deviceDetect().model}
          <br />
          os: {deviceDetect().ua}
          <br />
          osVersion: {deviceDetect().os}
          <br />
          ua: {deviceDetect().ua}
          <br />
          vendor: {deviceDetect().vendor}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="center motto">
          <p className="text-color-1">
            <span>CONNECT</span>
            <br />
            WITH PEOPLE
            <br />
            IN THE ROOM
          </p>
          <div className="divider" />
        </div>
        {this.renderDeviceData()}
        <div className="center">
          <Link to="/about" className="btn grey gradient-1 z-depth-5 btn-demo">
            Learn More
          </Link>
        </div>
      </div>
    );
  }
}

export default Content;
