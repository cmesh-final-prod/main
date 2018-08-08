import React from 'react';

const Footer = () => {
  return (
    <footer className="color-1">
      <div className="row center">
        <div className="col s6 white-text">
          <p>&copy; All Rights Reserved</p>
        </div>
        <div className="col s6">
          <div className="footer-btn">
            <a
              href="mailto:team@circlemesh.com"
              className="white-text right-align"
            >
              <p>
                <u>Contact Us</u>
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
