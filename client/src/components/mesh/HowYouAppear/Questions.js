import React, { Component } from 'react';

class Questions extends Component {
  render() {
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
      <div className="color-1 white-text edit-questions">
        <div className="row">{questions()}</div>
      </div>
    );
  }
}

export default Questions;
