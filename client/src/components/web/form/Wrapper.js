import React, { Component } from "react";
import { Route } from "react-router-dom";

// importing components
import Create from "components/web/form/Create";
import Signin from "components/web/form/Signin";

class Wrapper extends Component {
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <Route path={`${url}/create`} component={Create} />
        <Route path={`${url}/signin`} component={Signin} />
      </div>
    );
  }
}

export default Wrapper;
