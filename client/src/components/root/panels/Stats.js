import React, { Component } from 'react';

let hiringData;
let lookingData;

class Stats extends Component {
  state = { totalUsers: true, totalHiring: false, totalLookingForJob: false };

  componentDidMount() {
    this.renderHiring();
    this.renderLookingForJob();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.renderHiring();
      this.renderLookingForJob();
    }
  }

  renderHiring() {
    const { totalHiring } = this.props;
    if (totalHiring) {
      this.setState({ totalHiring: true });
      hiringData = totalHiring;
    } else {
      this.setState({ totalHiring: false });
    }
  }

  renderLookingForJob() {
    const { totalLookingForJob } = this.props;
    if (totalLookingForJob) {
      this.setState({ totalLookingForJob: true });
      lookingData = totalLookingForJob;
    } else {
      this.setState({ totalLookingForJob: false });
    }
  }

  renderStats() {
    const STATS = [
      {
        id: 'totalUsers',
        data: this.props.totalUsers,
        text: 'people have joined'
      },
      { id: 'totalHiring', data: hiringData, text: 'hiring' },
      {
        id: 'totalLookingForJob',
        data: lookingData,
        text: 'looking for opportunities'
      }
    ];

    return STATS.map(item => {
      return this.state[item.id] ? (
        <div key={item.id} className="m-stats color-1-text">
          <div className="m-stats-data right-align">{item.data}</div>
          <div className="m-stats-text left-align">{item.text}</div>
        </div>
      ) : (
        ''
      );
    });
  }

  render() {
    return (
      <div className="center">
        <div className="row">
          <div className="m-body col s10 offset-s1 white-text">
            <div className="m-body-inner">{this.renderStats()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
