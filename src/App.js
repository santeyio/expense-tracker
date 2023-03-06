import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom';

import Dash from './views/dash';
import LoginRouter from './views/login';
import { ProtectedRoute } from './components';

import './index.scss'

class App extends Component {
  render() {
    const PR = ProtectedRoute;
    return (
      <Routes>
        <Route path="*" element={<LoginRouter />} />
        <Route path="/dash" element={<PR><Dash /></PR>} />
      </Routes>
    );
  }
}

export default connect(
  state=>({

  }),
  {}
)(App)
