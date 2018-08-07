import React, { Component } from 'react';

// importing components
import Info from 'components/mesh/edit/Info';
import Questions from 'components/mesh/edit/Questions';
import Button from 'components/mesh/edit/Button';

class BasicProfile extends Component {
  state = {
    headline: this.props.headline,
    hiring: this.props.hiring,
    lookingForJob: this.props.lookingForJob
  };

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
            onFocus={() => this.setState({ headline: '' })}
          />
          <Questions
            hiring={this.props.hiring}
            lookingForJob={this.props.lookingForJob}
            onClick={q => this.setState({ [q]: !this.state[q] })}
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

export default BasicProfile;
