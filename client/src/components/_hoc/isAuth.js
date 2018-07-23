import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.props.fetchAuthLinkedinUser();
      const { isAuth } = this.props.currentUser;
      if (!isAuth) {
        console.log('Not Auth', isAuth);
        this.redirectAsRequired();
      }
    }

    redirectAsRequired() {
      const { isCompliant, isFetching, isAuth } = this.props.currentUser;
      if (!isFetching && !isAuth) {
        console.log('pushing to signin 1', isFetching);
        this.props.history.push('/signinWithLinkedin');
      } else if (!isFetching && isAuth && !isCompliant) {
        console.log('pushing to signin 2');
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
