import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.redirectAsRequired();
    }

    redirectAsRequired() {
      const { selectedMesh } = this.props;
      if (selectedMesh.isFetched) {
        if (selectedMesh.isCurrentUserAdded) {
          this.props.history.push(`/mesh/${selectedMesh.data.meshId}/list`);
        } else {
          this.props.history.push(`/mesh/${selectedMesh.data.meshId}`);
        }
      } else {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ selectedMesh }) {
    return { selectedMesh };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
