import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Profile extends Component {
  renderTitle() {
    return (
      <div className="valign-wrapper">
        <div className="edit-header">
          <h5 className="center text-color-1 responsive edit-title">
            EDIT YOUR PROFILE
          </h5>
        </div>
      </div>
    );
  }

  renderUserContent() {
    const { isAuth, isCompliant } = this.props.currentUser;
    if (isAuth && isCompliant) {
      const {
        firstName,
        lastName,
        photos,
        headline
      } = this.props.currentUser.data.linkedin;

      return (
        <div className="text-color-1">
          <div className="">
            <p>
              <img src={photos[0]} alt="" className="circle" />
              <br />
              <span className="responsive edit-name">
                {`${firstName} ${lastName.substring(0, 1)}.`}
              </span>
              <br />
              <span className="edit-headline">
                {headline} <i className="tiny material-icons">edit</i>
              </span>
            </p>
          </div>
        </div>
      );
    }
  }

  renderQuestions() {
    const QUESTIONS = [
      { id: 1, text: 'Are you hiring?' },
      { id: 2, text: 'Are you looking for opportunities?' }
    ];

    const questions = () => {
      return QUESTIONS.map(question => {
        return (
          <div key={question.id} className="row">
            <div className="col s8">
              <p>{question.text}</p>
            </div>
            <div className="col s4">
              <div className="switch">
                <label>
                  <input type="checkbox" />
                  <span className="lever" />
                </label>
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="grey lighten-4 text-color-1 edit-questions">
        <div className="row">{questions()}</div>
      </div>
    );
  }

  renderButton() {
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn waves-effect color-1 center btn-letsGo"
        onClick={() => this.handleClick()}
      >
        I'm good, let's go!
      </Link>
    );
  }

  handleClick() {
    const { meshId } = this.props.match.params;
    const userId = this.props.currentUser.data._id;
    this.props.addMeshUser(meshId, userId);
  }

  render() {
    return (
      <div>
        <div className="container center">
          {this.renderTitle()}
          <div className="edit-content">
            {this.renderUserContent()}
            {this.renderQuestions()}
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
