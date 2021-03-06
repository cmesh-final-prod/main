import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing components
import HowItWorks from "components/web/landing/HowItWorks";

class Template extends Component {
  renderMarketingText() {
    const { marketingText1, marketingText2, marketingText3 } = this.props;
    return (
      <h2 className="color-1-text bold-text right-align">
        <br />
        {marketingText1}
        <br />

        {marketingText2}
        <br />

        <span className="color-2-text">{marketingText3}</span>
      </h2>
    );
  }

  renderErrorMessage() {
    const { errorOne, errorTwo } = this.props;
    if (errorTwo) {
      return <div className="error red-text text-lighten-2">{errorTwo}</div>;
    } else if (errorOne) {
      return <div className="error red-text text-lighten-2">{errorOne}</div>;
    } else {
      return;
    }
  }

  renderTerms() {
    const { terms } = this.props;
    return terms ? (
      <div className="col s10 offset-s1">
        <p className="grey-text text-lighten-2">
          By clicking submit, you agree with our{" "}
          <a href="/web/terms">
            <span className="light-blue-text">terms and conditions</span>
          </a>
        </p>
      </div>
    ) : (
      ""
    );
  }

  isSignedUp() {
    const { isSignedUp } = this.props;
    return isSignedUp ? (
      <p>
        Don't have an account? <Link to="/web/form/create">Create Account</Link>
      </p>
    ) : (
      <p>
        Already have an account? <Link to="/web/form/signin">Sign In</Link>
      </p>
    );
  }

  render() {
    const {
      title,
      buttonText,
      inputFields,
      handleSubmit,
      disabled
    } = this.props;

    return (
      <div>
        <section className="color-5 min-height-3 form">
          <div className="row center">
            <div className="col m7 hide-on-med-and-down padding-right marketing">
              {this.renderMarketingText()}
            </div>
            <form
              action=""
              onSubmit={event => handleSubmit(event)}
              className="col s10 offset-s1 m3 z-depth-4 color-4"
            >
              <h4 className="white-text bold-text">{title}</h4>
              <div className="input-field grey-text text-lighten-4">
                {inputFields}
              </div>
              <button
                className="white btn btn-1 col s12"
                type="submit"
                disabled={disabled}
              >
                <span className="center-block">{buttonText}</span>
              </button>
              {this.renderTerms()}
              {this.renderErrorMessage()}
            </form>
          </div>
          <div className="row center isSignedUp">
            <div className="col s10 offset-s1 m3 offset-m7">
              {this.isSignedUp()}
            </div>
          </div>
        </section>
        <HowItWorks />
      </div>
    );
  }
}

export default Template;
