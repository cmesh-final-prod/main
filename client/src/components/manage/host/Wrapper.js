import React, { Component } from "react";
import { Route } from "react-router-dom";
import qs from "qs";

// import components
import HostSignin from "components/manage/host/Signin";
import Tryagain from "components/manage/host/Tryagain";
import Multiple from "components/manage/host/Multiple";

// container elements
import { connect } from "react-redux";

class Wrapper extends Component {
  componentDidMount() {
    this.renderRedirectLogic();
    this.renderAuthRedirect();
  }

  componentDidUpdate(prevProps) {
    const { isFetching } = this.props.org;
    if (isFetching !== prevProps.org.isFetching) {
      this.renderAuthRedirect();
    }
  }

  renderAuthRedirect() {
    const { data } = this.props.org;
    const { push } = this.props.history;
    return data.urlName ? push(`/manage/app`) : "";
  }

  renderRedirectLogic() {
    const { push } = this.props.history;
    const { location } = this.props;
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const { isFound, isMultiple, isSuccess } = query;
    let { url } = this.props.match;
    if (url[url.length - 1] === "/") {
      url = url.substring(0, url.length - 1);
    }

    if (isFound || isMultiple || isSuccess) {
      if (isMultiple === "true") {
        return push(`${url}/multiple`);
      } else if (isSuccess === "true") {
        return push("/manage/app");
      } else if (isFound === "true") {
        return push(`${url}/tryagain?isFound=true`);
      } else if (isFound === "false") {
        return push(`${url}/tryagain?isFound=false`);
      }
    }
  }

  render() {
    const { url } = this.props.match;
    return (
      <section className="min-height-3">
        <Route exact path={`${url}`} component={HostSignin} />
        <Route path={`${url}/tryagain`} component={Tryagain} />
        <Route path={`${url}/multiple`} component={Multiple} />
      </section>
    );
  }
}

function mapStateToProps({ org }) {
  return { org };
}

export default connect(mapStateToProps)(Wrapper);
