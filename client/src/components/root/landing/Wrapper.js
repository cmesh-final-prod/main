import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// temp
// import publicIp from 'public-ip';
import ip from 'ip';
import { deviceDetect, browserName, browserVersion } from 'react-device-detect';

let ipV4, ipV6;
class Content extends Component {
  // componentDidMount() {
  //   publicIp.v4().then(ip => {
  //     ipV4 = ip;
  //     console.log(ipV4);
  //   });
  //   publicIp.v6().then(ip => {
  //     ipV6 = ip;
  //     console.log(ipV6);
  //   });
  // }

  renderDeviceData() {
    return (
      <div>
        <p>
          Ip: {ip.address()}
          <br />
          IpV4: {}
          <br />
          IpV6: {}
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
