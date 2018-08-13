import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

// importing components
import Info from 'components/mesh/edit/Info';
import Questions from 'components/mesh/edit/Questions';
import Button from 'components/mesh/edit/Button';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class BasicProfile extends Component {
  state = {
    headline: this.props.headline,
    hiring: this.props.hiring,
    lookingForJob: this.props.lookingForJob
  };

  handleQuestionSelection(q) {
    this.setState({ [q]: !this.state[q] });
    const createLogProps = {
      log: {
        logType: `${L.QUESTIONS_TOGGLED}: ${q}`,
        componentServed: 'mesh-edit-basicProfile',
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
  }

  handleOnFocus() {
    this.setState({ headline: '' });
    const createLogProps = {
      log: {
        logType: L.EDIT_HEADLINE_CLICKED,
        componentServed: 'mesh-edit-basicProfile',
        meshId: this.props.selectedMesh.data.meshId,
        userId: this.props.currentUser.data._id
      }
    };
    this.props.createLog(createLogProps);
  }

  render() {
    const { firstName, lastName, photos } = this.props;

    return (
      <div className="">
        <form className="">
          <Info
            firstName={firstName}
            lastName={lastName}
            photos={photos}
            headline={this.state.headline}
            hiring={this.state.hiring}
            lookingForJob={this.state.lookingForJob}
            onChange={headline => this.setState({ headline })}
            onFocus={() => this.handleOnFocus()}
          />
          <Questions
            hiring={this.props.hiring}
            lookingForJob={this.props.lookingForJob}
            onClick={q => this.handleQuestionSelection(q)}
          />
          <Button
            onClick={() => this.props.handleSubmit(this.state)}
            headline={this.state.headline}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(BasicProfile);
