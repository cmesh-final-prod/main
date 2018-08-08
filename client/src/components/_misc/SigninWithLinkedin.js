import React, { Component } from 'react';

// importing components
import NavbarWrapper from 'components/_misc/navbar/Wrapper';
import Footer from 'components/_misc/Footer';

class SigninWithLinkedin extends Component {
  renderWhyLinkedin() {
    const REASONS = [
      {
        id: 1,
        text: 'Linkedin is the most popular professional networking platform'
      },
      {
        id: 2,
        text:
          'Using linkedin you can easily share your basic profile information with others in the room'
      },
      {
        id: 3,
        text:
          "This helps confirm everyone's identity, ensuring a quality experience for all"
      }
    ];

    return REASONS.map(reason => {
      return (
        <div key={reason.id} className="row">
          <div className="col s2 offset-s1 signin-check">
            <i className="material-icons right text-color-1">check_circle</i>
          </div>
          <div className="col s9 signin-reason">{reason.text}</div>
        </div>
      );
    });
  }

  renderTerms() {
    return (
      <div className="col s10 offset-s1">
        <p>
          By signin in, you aggree with our{' '}
          <span className="light-blue-text">terms and conditions</span>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavbarWrapper />
        <section className="section center">
          <div className="row">
            <div className="col s10 offset-s1 grey lighten-5 left-align text-color-1 signin">
              <div className="signin-title">Why Linkedin?</div>
              <div className="divider signin-divider" />
              {this.renderWhyLinkedin()}
            </div>
          </div>
          <div className="row">
            <div className="col s10 offset-s1">
              <a
                href="/auth/linkedin"
                className="btn btn-large light-blue signin-btn"
              >
                Signin With Linkedin
              </a>
            </div>
            {this.renderTerms()}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default SigninWithLinkedin;
