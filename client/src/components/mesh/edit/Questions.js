import React, { Component } from 'react';

class Questions extends Component {
  state = {
    hiring: this.props.hiring,
    lookingForJob: this.props.lookingForJob
  };

  render() {
    const QUESTIONS = [
      { id: 'hiring', text: 'Are you hiring?' },
      {
        id: 'lookingForJob',
        text: 'Are you looking for opportunities?'
      }
    ];

    const questions = () => {
      return QUESTIONS.map(q => {
        const { id, text } = q;

        return (
          <div key={id} className="row">
            <div className="col s8">
              <p>{text}</p>
            </div>
            <div className="col s4">
              <div className="switch">
                <label>
                  <input
                    type="checkbox"
                    onClick={() => this.props.onClick(id)}
                    onChange={() => this.setState({ [id]: !this.state[id] })}
                    checked={this.state[id]}
                  />
                  <span className="lever" />
                </label>
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div className="color-1 white-text edit-questions">
        <div className="row">{questions()}</div>
      </div>
    );
  }
}

export default Questions;
