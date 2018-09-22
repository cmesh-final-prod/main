import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// importing components
import Navbar from "components/web/_misc/Navbar";
import Footer from "components/_misc/Footer";
import Terms from "components/web/_misc/Terms";
import LandingWrapper from "components/web/landing/Wrapper";
import FormWrapper from "components/web/form/Wrapper";

// container elements
import { connect } from "react-redux";

class Wrapper extends Component {
  componentDidMount() {
    const { isAuth } = this.props.auth;
    return isAuth ? this.props.history.push("/manage/app") : "";
  }

  render() {
    const { url } = this.props.match;
    return (
      <div className="web">
        <Navbar />
        <Route
          exact
          path={`${url}`}
          render={() => {
            return <Redirect to={`${url}/about`} />;
          }}
        />
        <Route path={`${url}/about`} component={LandingWrapper} />
        <Route path={`${url}/terms`} component={Terms} />
        <Route path={`${url}/form`} component={FormWrapper} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Wrapper);
