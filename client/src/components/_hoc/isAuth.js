import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      const { isAuth } = this.props.currentUser;
      if (!isAuth) {
        this.props.fetchAuthLinkedinUser();
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
