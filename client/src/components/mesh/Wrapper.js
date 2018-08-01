import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// importing components
import NavbarWrapper from 'components/_misc/navbar/Wrapper';
import HowYouAppearWrapper from 'components/mesh/HowYouAppear/Wrapper';
import List from 'components/mesh/List';
import Expired from 'components/mesh/Expired';

// importing hoc
import withAuth from 'components/_hoc/withAuth';
import withSelection from 'components/_hoc/withSelection';

// TODO: Check if user is still at the event location-- stillAtLocation
// May be create a watch geolocation tag?
// May be create a separate route to confirm if the user's location is within 200 of the selected mesh

class MeshWrapper extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <NavbarWrapper />
        <Route
          exact
          path={`${match.url}/:meshId`}
          component={HowYouAppearWrapper}
        />
        <Route exact path={`${match.url}/:meshId/list`} component={List} />
        <Route path={`${match.url}/:meshId/list/expired`} component={Expired} />
      </div>
    );
  }
}

export default withAuth(withSelection(MeshWrapper));
