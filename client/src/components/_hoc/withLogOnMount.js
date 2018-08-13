import React, { Component } from 'react';
import { deviceDetect, browserName, browserVersion } from 'react-device-detect';
import Fingerprint2 from 'fingerprintjs2';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default (ChildComponent, logProps) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      const createLogProps = {
        device: deviceDetect(),
        browser: { browserName, browserVersion },
        log: logProps(this.props)
      };
      this.props.createLog(createLogProps);

      new Fingerprint2().get((result, components) => {
        console.log('-----------------------', result);
      });
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
