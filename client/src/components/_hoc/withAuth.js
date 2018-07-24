import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.props.fetchAuthLinkedinUser();
    }

    componentDidUpdate() {
      const { isAuth, isFetching } = this.props.currentUser;
      if (!isAuth && !isFetching) {
        this.redirectAsRequired();
      }
    }

    redirectAsRequired() {
      const { isCompliant, isAuth } = this.props.currentUser;
      if (!isAuth) {
        this.props.history.push('/signinWithLinkedin');
      } else if (!isCompliant) {
        this.props.history.push('/signinWithLinkedin');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser }) {
    return { currentUser };
  }

  return connect(
    mapStateToProps,
    actions
  )(ComposedComponent);
};
