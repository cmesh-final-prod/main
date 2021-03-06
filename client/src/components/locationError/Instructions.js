import React, { Component } from "react";
import * as L from "components/_misc/LOG-TYPES";
import {
  isSafari,
  isAndroid,
  isChrome,
  isFirefox,
  isOpera
} from "react-device-detect";

// importing components
import Oops from "components/locationError/Oops";

// importing _hoc
import withLogOnMount from "components/_hoc/withLogOnMount";

// importing assets
import settings from "assets/locationInstructions/settings.svg";
import privacy from "assets/locationInstructions/privacy.svg";
import locationServices from "assets/locationInstructions/locationServices.svg";
import chrome1 from "assets/locationInstructions/chrome1.svg";
import chrome2 from "assets/locationInstructions/chrome2.svg";
import safari1 from "assets/locationInstructions/safari1.svg";
import safari2 from "assets/locationInstructions/safari2.svg";
import opera1 from "assets/locationInstructions/opera1.svg";
import opera2 from "assets/locationInstructions/opera2.svg";
import firefox1 from "assets/locationInstructions/firefox1.svg";
import firefox2 from "assets/locationInstructions/firefox2.svg";
import a_apps1 from "assets/locationInstructions/a_apps1.svg";
import a_apps2 from "assets/locationInstructions/a_apps2.svg";
import a_chrome1 from "assets/locationInstructions/a_chrome1.svg";
import a_chrome2 from "assets/locationInstructions/a_chrome2.svg";
import a_firefox1 from "assets/locationInstructions/a_firefox1.svg";
import a_firefox2 from "assets/locationInstructions/a_firefox2.svg";
import a_opera1 from "assets/locationInstructions/a_opera1.svg";
import a_opera2 from "assets/locationInstructions/a_opera2.svg";

class Instructions extends Component {
  renderProblem() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 grey-text location-problem">
          <b>This browser doesn't have access to your location</b>
          <br />
          <div className="grey lighten-4 grey-text location-note">
            Circlemesh uses location services to show you active events nearby.{" "}
            <br />
            <span className="blue-text text-lighten-1">
              Circlemesh does not save or track your location after the event is
              over!
            </span>
          </div>
        </div>
      </div>
    );
  }

  renderSolutionSteps() {
    let STEPS, browser, browser1, browser2;
    if (isAndroid) {
      if (isChrome) {
        browser = "Chrome";
        browser1 = a_chrome1;
        browser2 = a_chrome2;
      } else if (isFirefox) {
        browser = "Firefox";
        browser1 = a_firefox1;
        browser2 = a_firefox2;
      } else if (isOpera) {
        browser = "Opera";
        browser1 = a_opera1;
        browser2 = a_opera2;
      } else {
        browser = "this browser";
        browser1 = a_chrome1;
        browser2 = a_chrome2;
      }
    } else {
      if (isChrome) {
        browser = "Chrome";
        browser1 = chrome1;
        browser2 = chrome2;
      } else if (isFirefox) {
        browser = "Firefox";
        browser1 = firefox1;
        browser2 = firefox2;
      } else if (isOpera) {
        browser = "Opera";
        browser1 = opera1;
        browser2 = opera2;
      } else if (isSafari) {
        browser = "Safari";
        browser1 = safari1;
        browser2 = safari2;
      } else {
        browser = "this browser";
        browser1 = safari1;
        browser2 = safari2;
      }
    }

    const iOS_steps = [
      {
        id: 1,
        text: "Make sure location services are turned on",
        path: "Settings > Privacy > Location Services",
        img: [settings, privacy, locationServices]
      },
      {
        id: 2,
        text: `Within location services, select ${browser} and then select: While Using the App`,
        path: `Privacy > Location Services > ${browser}`,
        img: [browser1, browser2]
      }
    ];

    const android_steps = [
      {
        id: 1,
        text: `Go to Settings and then select ${browser}`,
        path: `Settings > Apps > ${browser}`,
        img: [a_apps1, browser1]
      },
      {
        id: 2,
        text: `Select Permissions and turn Location on`,
        path: `${browser} > Permissions > Location`,
        img: [a_apps2, browser2]
      }
    ];

    if (isAndroid) {
      STEPS = android_steps;
    } else {
      STEPS = iOS_steps;
    }

    return STEPS.map(step => {
      return (
        <div
          key={step.id}
          className="col s12 left-align grey-text location-instructions-solution color-5-border z-depth-3"
        >
          <h5>
            STEP {step.id} of {iOS_steps.length}
          </h5>
          <div className="divider" />
          <h6 className="blue-text text-lighten-1">{step.text}</h6>
          <p>{step.path}</p>
          <div className="center">
            {step.img.map(img => {
              return (
                <div key={img}>
                  <img src={img} alt="" />
                  <div className="divider" />
                </div>
              );
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
    componentServed: "locationError-instructions"
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default withLogOnMount(Instructions, logProps);
