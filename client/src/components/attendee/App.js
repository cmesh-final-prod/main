import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
import * as actions from 'actions';

// importing css
import 'css/app.css';

// importing components
import Navbar from 'components/attendee/Navbar';
import MeshPanelsWrapper from 'components/attendee/MeshPanelsWrapper';

class App extends Component {
  componentDidMount() {
    this.props.fetchLinkedinUser();
    this.props.fetchActiveMeshes();
  }

  renderContent() {
    switch (this.props.activeMeshes) {
      case false:
        return (
          <div className="container">
            <h5 className="blue-text center">No Active Mesh Networks Found</h5>
          </div>
        );
      default:
        return <MeshPanelsWrapper />;
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ activeMeshes, linkedinAuth }) {
  return { activeMeshes, linkedinAuth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
