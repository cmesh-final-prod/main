import React, { Component } from 'react';
import { deviceDetect, browserName, browserVersion } from 'react-device-detect';

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
