import React, { Component } from 'react';

class SigninWithLinkedin extends Component {
  render() {
    return (
      <div>
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
