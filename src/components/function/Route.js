import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export default class AuthRoute extends Component {
  render() {
    return <Route {...this.props} />;
  }
}

