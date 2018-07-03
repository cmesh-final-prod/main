import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// importing components
import Test from 'components/Test';
import Header from 'components/Header';
import Auth from 'components/Auth';

// imoprting action creators
import * as actions from 'actions';

class App extends Component {
  componentDidMount() {
    this.props.authUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/test" exact component={Test} />
          <Route path="/signin" component={Auth} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
