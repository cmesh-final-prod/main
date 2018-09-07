import React, { Component } from "react";
import { Route } from "react-router-dom";

// importing components
import NavbarWrapper from "components/_misc/navbar/Wrapper";
import EditWrapper from "components/mesh/edit/Wrapper";
import ListWrapper from "components/mesh/list/Wrapper";
import Expired from "components/mesh/misc/Expired";
import Footer from "components/_misc/Footer";

// importing hoc
import withAuth from "components/_hoc/withAuth";
import withSelection from "components/_hoc/withSelection";
import withSpinner from "components/_hoc/withSpinner";

// TODO: Check if user is still at the event location-- stillAtLocation
// May be create a watch geolocation tag?
// May be create a separate route to confirm if the user's location is within 200 of the selected mesh

class MeshWrapper extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="app">
        <NavbarWrapper />
        <section>
          <Route exact path={`${match.url}/:meshId`} component={EditWrapper} />
          <Route
            exact
            path={`${match.url}/:meshId/list`}
            component={ListWrapper}
          />
          <Route
            path={`${match.url}/:meshId/list/expired`}
            component={Expired}
          />
        </section>
        <Footer />
      </div>
    );
  }
}

export default withAuth(withSelection(withSpinner(MeshWrapper)));
