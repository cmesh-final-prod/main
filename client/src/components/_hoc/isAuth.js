import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    async componentDidMount() {
      console.log('isAuth componentDidMount fetchAuth');
      await this.props.fetchAuthLinkedinUser();
      console.log('isAuth componentDidMount redirectAsRequired');
      await this.redirectAsRequired();
    }

    redirectAsRequired() {
      console.log('isAuth redirectAsRequired');
      const { isAuth, isCompliant, isFetching } = this.props.currentUser;
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
