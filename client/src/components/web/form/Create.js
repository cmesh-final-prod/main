import React, { Component } from "react";

// importing components
import Template from "components/web/form/Template";

// importing container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Create extends Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    emailError: false,
    passwordError: false,
    passwordMatchError: false,
    created: false
  };

  componentDidUpdate(prevProps) {
    const { isFetching, isAuth, error } = this.props.auth;
    if (isFetching !== prevProps.auth.isFetching) {
      if (isAuth) {
        return this.props.history.push("/manage");
      } else if (error === "email") {
        this.props.clearState();
        return this.renderError("email");
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return;
    }
    const orgProps = { email: email.toLowerCase(), password };
    if (email && password) {
      this.props.createOrg(orgProps);
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
        type: "password",
        className: "validate",
        helper: "Please enter a valid password"
      },
      {
        id: "confirmPassword",
        placeholder: "Confirm Password",
        type: "password",
        className: "validate",
        helper: "Password do not match",
        onBlur: "password"
      }
    ];

    return FIELDS.map(field => {
      const { id, type, placeholder, className, onBlur } = field;
      return (
        <div key={id}>
          <input
            type={type}
            placeholder={placeholder}
            className={className}
            onChange={event => {
              this.setState({ [id]: event.target.value });
            }}
            onBlur={() => this.renderError(onBlur)}
            onFocus={() =>
              this.setState({
                emailError: false,
                passwordError: false,
                passwordMatchError: false
              })
            }
          />
          <span className="helper-text" data-error={field.helper} />
        </div>
      );
    });
  }

  renderErrorMessage(type) {
    let message;
    const { emailError, passwordError, passwordMatchError } = this.state;
    switch (type) {
      case "email":
        message =
          "Email already exists, please signin or try with a different email address.";
        return emailError ? message : "";
      case "password":
        const regexErrorMessage =
          "Password must be at least 8 characters long, must contain at least 1 lower case alphabet and at least 1 numeric digit.";
        const matchErrorMessage = "Passwords do not match";
        return passwordError
          ? regexErrorMessage
          : passwordMatchError
            ? matchErrorMessage
            : "";
      default:
        return;
    }
  }

  renderError(type) {
    const { password, confirmPassword } = this.state;
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
    switch (type) {
      case "email":
        return this.setState({ emailError: true });
      case "password":
        return !passwordRegex.test(password)
          ? this.setState({ passwordError: true })
          : password !== confirmPassword
            ? this.setState({ passwordMatchError: true })
            : "";

      default:
        return;
    }
  }

  render() {
    const { email, password, confirmPassword } = this.state;
    return (
      <div>
        <Template
          marketingText1="one time setup"
          marketingText2="unlimited events"
          marketingText3="for free."
          title="Create Account"
          buttonText="SUBMIT"
          errorOne={this.renderErrorMessage("email")}
          errorTwo={this.renderErrorMessage("password")}
          inputFields={this.renderInputFields()}
          handleSubmit={event => this.handleSubmit(event)}
          disabled={email && password && confirmPassword ? false : true}
          terms={true}
          isSignedUp={false}
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
)(Create);
