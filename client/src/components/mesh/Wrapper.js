import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// importing components
import Navbar from 'components/_misc/Navbar';
import Profile from 'components/mesh/Profile';
import List from 'components/mesh/List';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class MeshWrapper extends Component {
  renderNavigation() {
    const { selectedMesh } = this.props;
    const { match } = this.props;

    if (selectedMesh.isPopulated) {
      // Only fetch authLinkedin() when being redirected from Linkedin OAuth
      return (
        <Route
          exact
          path={`${match.url}`}
          render={() => {
            this.props.fetchAuthLinkedinUser();
            return <Redirect to={`/mesh/${selectedMesh.meshId}`} />;
          }}
        />
      );
    }

    return (
      <Route exact path={`${match.url}`} render={() => <Redirect to="/" />} />
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Navbar />
        {this.renderNavigation()}
        <Route exact path={`${match.url}/:meshId`} component={Profile} />
        <Route path={`${match.url}/:meshId/list`} component={List} />
      </div>
    );
  }
}

function mapStateToProps({ selectedMesh }) {
  return { selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(MeshWrapper);
