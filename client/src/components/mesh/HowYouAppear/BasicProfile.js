import React, { Component } from 'react';

// importing components
import Info from 'components/mesh/HowYouAppear/Info';
import Questions from 'components/mesh/HowYouAppear/Questions';
import Button from 'components/mesh/HowYouAppear/Button';

class BasicProfile extends Component {
  state = {
    headline: this.props.headline,
    hiring: this.props.hiring,
    lookingForJob: this.props.lookingForJob
  };

  render() {
    const { firstName, lastName, photos } = this.props;

    return (
      <div className="row">
        <form className="col s12">
          <Info
            firstName={firstName}
            lastName={lastName}
            photos={photos}
            headline={this.state.headline}
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

// <i className="tiny material-icons">edit</i>
