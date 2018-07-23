import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// importing components
import Navbar from 'components/_misc/Navbar';
import Profile from 'components/mesh/Profile';
import List from 'components/mesh/List';
import Expired from 'components/mesh/Expired';

// importing hoc
import isAuth from 'components/_hoc/isAuth';
import isMeshSelected from 'components/_hoc/isMeshSelected';

class MeshWrapper extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Navbar />
        <Route exact path={`${match.url}/:meshId`} component={Profile} />
        <Route exact path={`${match.url}/:meshId/list`} component={List} />
        <Route path={`${match.url}/:meshId/list/expired`} component={Expired} />
      </div>
    );
  }
}

export default isMeshSelected(isAuth(MeshWrapper));
