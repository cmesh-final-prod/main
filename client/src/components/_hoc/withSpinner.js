import React, { Component } from 'react';

// importing components
import Spinner from 'components/_misc/Spinner';

// container elements
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      const { currentUser, meshes, selectedMesh } = this.props;

      if (
        currentUser.isFetching ||
        meshes.isFetching ||
        selectedMesh.isFetching
      ) {
        return <Spinner />;
      }
    }

    componentDidUpdate() {
      const { currentUser, meshes, selectedMesh } = this.props;

      if (
        currentUser.isFetching ||
        meshes.isFetching ||
        selectedMesh.isFetching
      ) {
        return <Spinner />;
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ currentUser, meshes, selectedMesh }) {
    return { currentUser, meshes, selectedMesh };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
