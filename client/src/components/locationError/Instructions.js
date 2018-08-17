import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';
import { isAndroid, isChrome, isFirefox, isOpera } from 'react-device-detect';

// importing components
import Oops from 'components/locationError/Oops';

// importing _hoc
import withLogOnMount from 'components/_hoc/withLogOnMount';

// importing assets
import settings from 'assets/locationInstructions/settings.svg';
import privacy from 'assets/locationInstructions/privacy.svg';
import locationServices from 'assets/locationInstructions/locationServices.svg';
import chrome1 from 'assets/locationInstructions/chrome1.svg';
import chrome2 from 'assets/locationInstructions/chrome2.svg';
import safari1 from 'assets/locationInstructions/safari1.svg';
import safari2 from 'assets/locationInstructions/safari2.svg';
import opera1 from 'assets/locationInstructions/opera1.svg';
import opera2 from 'assets/locationInstructions/opera2.svg';
import firefox1 from 'assets/locationInstructions/firefox1.svg';
import firefox2 from 'assets/locationInstructions/firefox2.svg';

class Instructions extends Component {
  renderProblem() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 grey-text location-problem">
          Your location services may be turned <b>on</b>.{' '}
          <span className="">
            However, <b>this browser doesn't have access to your location!</b>
          </span>
        </div>
      </div>
    );
  }

  renderSolutionSteps() {
    let browser, browser1, browser2;
    if (isAndroid) {
      browser = 'Chrome';
      browser1 = chrome1;
      browser2 = chrome2;
    } else {
      if (isChrome) {
        browser = 'Chrome';
        browser1 = chrome1;
        browser2 = chrome2;
      } else if (isFirefox) {
        browser = 'Firefox';
        browser1 = firefox1;
        browser2 = firefox2;
      } else if (isOpera) {
        browser = 'Opera';
        browser1 = opera1;
        browser2 = opera2;
      } else {
        browser = 'Safari';
        browser1 = safari1;
        browser2 = safari2;
      }
    }

    const iOS_steps = [
      {
        id: 1,
        text: 'Make sure location services are turned on',
        path: 'Settings > Privacy > Location Services',
        img: [settings, privacy, locationServices]
      },
      {
        id: 2,
        text: 'Select "While Using The App"',
        path: `Privacy > Location Services > ${browser}`,
        img: [browser1, browser2]
      }
    ];

    return iOS_steps.map(step => {
      return (
        <div
          key={step.id}
          className="col s12 left-align grey-text location-instructions-solution color-5-border z-depth-3"
        >
          <h5>STEP {step.id}</h5>
          <div className="divider" />
          <h6>
            <b>{step.text}</b>
          </h6>
          <p>{step.path}</p>
          <div className="center">
            {step.img.map(img => {
              return <img key={img} src={img} alt="" />;
            })}
          </div>
        </div>
      );
    });
  }

  renderSolution() {
    return (
      <div className="row">
        <div className="col s10 offset-s1">
          <h4 className="grey-text">Solution:</h4>
          <div className="divider" />
          <div className="row">{this.renderSolutionSteps()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section>
        <Oops />
        {this.renderProblem()}
        {this.renderSolution()}
      </section>
    );
  }
}

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: 'locationError-instructions'
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default withLogOnMount(Instructions, logProps);
