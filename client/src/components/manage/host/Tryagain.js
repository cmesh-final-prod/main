import React, { Component } from "react";
import qs from "qs";

// importing components
import Template from "components/manage/host/Template";

class Tryagain extends Component {
  renderIsFound() {
    return (
      <span>
        <span className="bold-text red-text">Error:</span> This meetup account
        is already linked with circle<b>mesh</b>, please signin with a different
        meetup account.
      </span>
    );
  }

  renderIsNotFound() {
    return (
      <span>
        <span className="bold-text red-text">Error:</span> No meetup groups
        found where you are part of the organizing team, please signin with a
        different meetup account.
      </span>
    );
  }

  renderText1() {
    const { location } = this.props;
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const { isFound } = query;
    return isFound === "true" ? this.renderIsFound() : this.renderIsNotFound();
  }

  render() {
    return <Template text1={this.renderText1()} />;
  }
}

export default Tryagain;
