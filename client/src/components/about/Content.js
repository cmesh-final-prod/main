import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// importing css
import 'css/about.css';

class AboutContent extends Component {
  render() {
    return (
      <div>
        <section className="section section-about">
          <h3 className="grey-text text-darken-2">
            circle<b>mesh</b>
          </h3>

          <br />
          <div className="row row-divider">
            <div className="col s12 m2">
              <div className="divider" />
            </div>
          </div>

          <div className="container">
            <h1 className="grey-text lighten-4">
              <b>Create.</b>
            </h1>

            <h5 className="grey-text lighten-4">
              a location bubble for your meetup
            </h5>
          </div>
          <div className="container">
            <h1 className="grey-text lighten-4">
              <b>Facilitate.</b>
            </h1>

            <h5 className="grey-text lighten-4">
              conversations among the attendees
            </h5>
          </div>
          <div className="container">
            <h1 className="grey-text lighten-4">
              <b>Learn.</b>
            </h1>

            <h5 className="grey-text lighten-4">more about your audience</h5>
          </div>
          <Link to="/manage" className="btn light-blue">
            Organizers
          </Link>
        </section>
      </div>
    );
  }
}
export default AboutContent;
