import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Expired extends Component {
  componentWillMount() {
    setTimeout(() => this.props.history.push('/'), 3000);
  }

  render() {
    return (
      <section>
        <div className="container m-expiry center">
          <i className="material-icons large text-color-1">broken_image</i>
          <br />
          <h4 className="color-5-text flow-text">This mesh has expired!</h4>
        </div>
      </section>
    );
  }
}

export default withRouter(Expired);
