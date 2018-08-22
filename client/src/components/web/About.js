import React, { Component } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

// importing assets
import mockIphone from 'assets/web/iphone/iphoneMock2.png';
import createMeshImg from 'assets/web/about/createMesh.svg';
import inMeshImg from 'assets/web/about/inMesh.svg';

class About extends Component {
  renderSize() {
    return isTablet
      ? 'font-medium center-align'
      : isMobile
        ? 'font-small center-align'
        : 'font-large center-align';
  }

  renderSections() {
    const CONTENT = [
      {
        id: 1,
        text: `Networking At Meetups Made Simple`,
        img: mockIphone,
        bg: 'about-bg-1'
      },
      {
        id: 2,
        text: 'Create A Location-Based Mesh Network',
        img: createMeshImg,
        bg: 'about-bg-2'
      },
      {
        id: 3,
        text: 'Attendees Join The Mesh At Circlemesh.com',
        img: inMeshImg,
        bg: 'about-bg-3'
      }
    ];

    return CONTENT.map(content => {
      return (
        <section key={content.id} className={`${content.bg} about`}>
          <div className="row">
            <div className="col l7 m12 s12 center container">
              <p className={`white-text center ${this.renderSize()}`}>
                {content.text}
              </p>
            </div>
            <div className="col l4 m12 s12 center">
              <img src={content.img} alt="" className={this.renderSize()} />
            </div>
          </div>
        </section>
      );
    });
  }

  render() {
    return <div>{this.renderSections()}</div>;
  }
}
export default About;
