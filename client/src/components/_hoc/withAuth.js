import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      const { meshId } = this.props.selectedMesh.data;
      this.props.fetchCurrentUser(meshId);
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

  function mapStateToProps({ currentUser, selectedMesh }) {
    return { currentUser, selectedMesh };
  }

  return connect(
    mapStateToProps,
    actions
  )(ComposedComponent);
};
