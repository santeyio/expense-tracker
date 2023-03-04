import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Wat from './views/Wat';
import Lol from './views/Lol';
import Main from './views/Main';


import './index.scss'

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/wat" element={<Wat />} />
        <Route path="/lol" element={<Lol />} />
      </Routes>
    );
  }
}

export default connect(
  state=>({

  }),
  {}
)(App)
