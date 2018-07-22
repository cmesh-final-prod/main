import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Expired extends Component {
  componentWillMount() {
    setTimeout(() => this.props.history.push('/'), 3000);
  }

  render() {
    return <div>Mesh Has Expired</div>;
  }
}

export default withRouter(Expired);
