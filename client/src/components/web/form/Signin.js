import React, { Component } from "react";

// importing container elements
import * as actions from "actions";
import { connect } from "react-redux";

// importing components
import Template from "components/web/form/Template";

class Signin extends Component {
  state = {
    email: null,
    password: null,
    authError: false
  };

  componentDidUpdate(prevProps) {
    const { isFetching, isAuth, error } = this.props.auth;
    if (isFetching !== prevProps.auth.isFetching) {
      if (error) {
        this.props.clearState();
        return this.setState({ authError: true });
      } else if (isAuth) {
        return this.props.history.push("/manage");
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const orgProps = { email: email.toLowerCase(), password };
    if (email && password) {
      this.props.signinOrg(orgProps);
    }
  }

  renderInputFields() {
    const FIELDS = [
      {
        id: "email",
        placeholder: "Email",
        type: "email",
        className: "validate",
        helper: "Please enter a valid email"
      },
      {
        id: "password",
        placeholder: "Password",
        type: "password"
      }
    ];

    return FIELDS.map(field => {
      const { id, type, placeholder, className } = field;
      return (
        <div key={id}>
          <input
            type={type}
            placeholder={placeholder}
            className={className}
            onChange={event => {
              this.setState({ [id]: event.target.value });
            }}
            onFocus={() => this.setState({ authError: false })}
          />
          <span className="helper-text" data-error={field.helper} />
        </div>
      );
    });
  }

  renderErrorMessage() {
    const { authError } = this.state;
    const message = "Invalid email / password combination";
    return authError ? message : "";
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Template
          marketingText1="one time setup"
          marketingText2="unlimited events"
          marketingText3="for free."
          title="Sign In"
          buttonText="SUBMIT"
          errorOne={this.renderErrorMessage()}
          inputFields={this.renderInputFields()}
          handleSubmit={event => this.handleSubmit(event)}
          disabled={email && password ? false : true}
          isSignedUp={true}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(Signin);
