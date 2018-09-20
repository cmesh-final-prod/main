import React, { Component } from "react";
import { Route } from "react-router-dom";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

// importing components
import Navbar from "components/manage/_misc/Navbar";
import Footer from "components/_misc/Footer";
import ManageAppWrapper from "components/manage/app/Wrapper";
import HostWrapper from "components/manage/host/Wrapper";
import IndeterminateSpinner from "components/_misc/spinners/Indeterminate";

class ManageWrapper extends Component {
  componentDidMount() {
    this.renderRedirectLogic();
  }

  componentDidUpdate(prevProps) {
    if (this.props.org.isFetching !== prevProps.org.isFetching) {
      this.renderRedirectLogic();
    }
  }

  renderRedirectLogic() {
    const { token, isAuth } = this.props.auth;
    const { pathname } = this.props.location;
    const { url } = this.props.match;
    const { push } = this.props.history;
    const { data, isFetched } = this.props.org;
    if (!isAuth) {
      return push("/web/form/signin");
    } else if (!isFetched) {
      return this.props.fetchOrg(token);
    } else if (data.urlName) {
      return push(`${url}/app/meshes`);
    } else if (pathname === "/manage") {
      return push(`${url}/host`);
    } else {
      return;
    }
  }

  render() {
    const { url } = this.props.match;
    const { isFetching } = this.props.org;
    return (
      <div>
        <Navbar />
        <section className="min-height-2">
          {isFetching ? <IndeterminateSpinner /> : ""}
          <Route path={`${url}/app`} component={ManageAppWrapper} />
          <Route path={`${url}/host`} component={HostWrapper} />
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(
  mapStateToProps,
  actions
)(ManageWrapper);
