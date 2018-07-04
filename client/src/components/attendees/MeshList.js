import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// importing components
import Navbar from 'components/attendees/Navbar';

// importing action creators
import * as actions from 'actions';

class MeshList extends Component {
  componentDidMount() {
    this.props.linkedinAuthUser();
  }

  render() {
    const {
      linkedinFirstName,
      linkedinLastName,
      linkedinURL,
      linkedinProfilePictures,
      linkedinHeadline
    } = this.props.linkedinAuth;

    return (
      <div>
        <Navbar />
        <section className="section">
          <ul className="collection">
            <li className="collection-item avatar">
              <img src={linkedinProfilePictures} alt="" className="circle" />

              <span className="title">{linkedinFirstName}</span>
              <p>
                {linkedinHeadline}
                <br />
                <a href={linkedinURL} className="btn white btn-small blue-text">
                  View
                </a>
              </p>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ linkedinAuth }) {
  return { linkedinAuth };
}

export default connect(
  mapStateToProps,
  actions
)(MeshList);
