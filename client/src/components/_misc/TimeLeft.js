import React, { Component } from 'react';

class TimeLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  componentWillMount() {
    const INTERVAL_ID = setInterval(() => timer(), 1000);

    const timer = () => {
      const end = new Date(this.props.endDate).getTime();
      // const end = 1532291820000;
      const now = new Date().getTime();
      const timeLeft = end - now;

      if (timeLeft <= 0) {
        clearInterval(INTERVAL_ID);
        this.props.onMeshExpiry();
      } else {
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        !this.isCancelled && this.setState({ days, hours, minutes, seconds });
      }
    };
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  leadingZero(num) {
    return num < 10 ? '0' + num : num;
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    if (!days) {
      return (
        <div className={this.props.className}>
          {this.leadingZero(hours)}:
          {this.leadingZero(minutes)}:
          {this.leadingZero(seconds)}
        </div>
      );
    } else {
      return (
        <div className={this.props.className}>
          {this.leadingZero(days)}d {this.leadingZero(hours)}h{' '}
          {this.leadingZero(minutes)}m {this.leadingZero(seconds)}s
        </div>
      );
    }
  }
}

export default TimeLeft;
