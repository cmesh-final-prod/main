import React, { Component } from "react";
import { deviceDetect, browserName, browserVersion } from "react-device-detect";
import Fingerprint2 from "fingerprintjs2";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

export default (ChildComponent, logProps) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      setTimeout(
        new Fingerprint2().get((result, components) => {
          const createLogProps = {
            fingerPrint: result,
            device: deviceDetect(),
            browser: { browserName, browserVersion },
            log: logProps(this.props)
          };
          this.props.createLog(createLogProps);
        }),
        1000
      );
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return connect(
    null,
    actions
  )(ComposedComponent);
};
