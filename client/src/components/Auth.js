import React from 'react';

// importing images
import googleLoginImg from 'assets/login-google.png';
import linkedinLoginImg from 'assets/login-linkedin.png';

const Auth = () => {
  return (
    <div className="container">
      <div className="collection center-align">
        <ul>
          <li className="collection-item">
            <a href="/auth/google">
              <img
                src={googleLoginImg}
                width="300"
                height="115"
                alt="Sign in with Google"
              />
            </a>
          </li>
          <li className="collection-item">
            <a href="/auth/linkedin">
              <img
                src={linkedinLoginImg}
                width="300"
                height="80"
                alt="Sign in with LinkedIn"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Auth;
