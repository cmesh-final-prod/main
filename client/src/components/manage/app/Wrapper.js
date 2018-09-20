import React, { Component } from "react";
import { Route } from "react-router-dom";

// importing components
import Sidemenu from "components/manage/app/Sidemenu";
import Meshes from "components/manage/app/Meshes";
import Dashboard from "components/manage/app/Dashboard";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Wrapper extends Component {
  componentWillMount() {
    const { token } = this.props.auth;
    this.props.fetchOrg(token);
    this.renderAuthRedirect();
  }

  componentDidUpdate(prevProps) {
    const { isFetching } = this.props.org;
    if (isFetching !== prevProps.org.isFetching) {
      this.renderAuthRedirect();
    }
  }

  renderAuthRedirect() {
    const { url } = this.props.match;
    const { data } = this.props.org;
    const { push } = this.props.history;
    return data.urlName ? push(`${url}/meshes`) : push(`/manage/host`);
  }

  render() {
    let { url } = this.props.match;
    return (
      <div>
        <div className="row manage">
          <section className="color-1 col s2 m1 manage-sidemenu padding-top">
            <Sidemenu url={url} />
          </section>
          <section className="color-5 col s10 m11 manage-content">
            <Route path={`${url}/meshes`} component={Meshes} />
            <Route path={`${url}/dashboard`} component={Dashboard} />
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ org, auth }) {
  return { org, auth };
}

export default connect(
  mapStateToProps,
  actions
)(Wrapper);
