import React, { Component } from 'react';

// importing navbar
import Navbar from 'components/attendees/Navbar';

class SigninWithLinkedin extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <section className="section center">
          <a href="/auth/linkedin" className="btn btn-large light-blue">
            Signin With Linkedin
          </a>
        </section>
      </div>
    );
  }
}

export default SigninWithLinkedin;
