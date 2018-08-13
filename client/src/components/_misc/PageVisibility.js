import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import withPageVisibility from 'components/_hoc/withPageVisibility';

class PageVisibility extends Component {
  render() {
    return <div />;
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

//////////////////////////////////////////
//////  withPageVisibility Props    //////
//////////////////////////////////////////

const pageVisibiltyProps = (ownProps, status) => {
  return {
    log: {
      logType: status,
      componentServed: 'mesh-list-wrapper',
      meshId: ownProps.selectedMesh.data.meshId,
      userId: ownProps.currentUser.data._id
    }
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(withPageVisibility(PageVisibility, pageVisibiltyProps));
