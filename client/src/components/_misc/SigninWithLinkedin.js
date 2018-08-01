import React, { Component } from 'react';

// importing components
import NavbarWrapper from 'components/_misc/navbar/Wrapper';
import Footer from 'components/_misc/Footer';

class SigninWithLinkedin extends Component {
  render() {
    return (
      <div>
        <NavbarWrapper />
        <section className="section center">
          <a href="/auth/linkedin" className="btn btn-large light-blue">
            Signin With Linkedin
          </a>
        </section>
        <Footer />
      </div>
    );
  }
}

export default SigninWithLinkedin;
