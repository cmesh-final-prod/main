import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';

class Profile extends Component {
  renderUserContent() {
    const {
      linkedinFirstName,
      linkedinHeadline,
      linkedinProfilePictures
    } = this.props.auth.linkedin;

    return (
      <li className="collection-item">
        <img src={linkedinProfilePictures} alt="" className="circle" />
        <span className="title">{linkedinFirstName}</span>
        <p>{linkedinHeadline}</p>
      </li>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="center">How you appear</h3>
          <ul className="collection avatar">{this.renderUserContent()}</ul>
        </div>
        <Link
          to={`${this.props.match.url}/list`}
          className="btn light-blue center"
        >
          Got it
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);
