import React, { Component } from "react";

// importing components
import IndeterminateSpinner from "components/_misc/spinners/Indeterminate";

// container elements
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    renderContent() {
      const { currentUser, selectedMesh } = this.props;
      return currentUser.isFetching ||
        (selectedMesh.isFetching && !selectedMesh.isPopulated) ? (
        <IndeterminateSpinner />
      ) : (
        <ChildComponent {...this.props} />
      );
    }

    render() {
      return this.renderContent();
    }
  }

  function mapStateToProps({ currentUser, selectedMesh }) {
    return { currentUser, selectedMesh };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
