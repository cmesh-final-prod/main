import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer color-1">
      <div className="row center">
        <div className="col s12">
          <a
            href="mailto:team@circlemesh.com"
            className="btn-flat white grey-text"
          >
            <i className="material-icons right tiny">email</i>Contact Us
          </a>
        </div>
      </div>
      <div className="footer-copyright center">
        <div className="container">All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
