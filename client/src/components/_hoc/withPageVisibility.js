import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

export default (ChildComponent, pageVisibiltyProps) => {
  let hidden, visibilityChange, handleVisibilityChange;
  class ComposedComponent extends Component {
    componentDidMount() {
      // Set the name of the hidden property and the change event for visibility
      if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
      } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
      }

      handleVisibilityChange = () => {
        if (document[hidden]) {
          this.props.createLog(pageVisibiltyProps(this.props, L.PAGE_HIDDEN));
          document.removeEventListener(
            visibilityChange,
            handleVisibilityChange,
            false
          );
        } else {
          this.props.createLog(pageVisibiltyProps(this.props, L.PAGE_VISIBLE));
          document.removeEventListener(
            visibilityChange,
            handleVisibilityChange,
            false
          );
        }
      };

      // Warn if the browser doesn't support addEventListener or the Page Visibility API
      if (
        typeof document.addEventListener === 'undefined' ||
        hidden === undefined
      ) {
        console.log('page visibility API not supported');
      } else {
        document.addEventListener(
          visibilityChange,
          handleVisibilityChange,
          false
        );
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return ComposedComponent;
};
