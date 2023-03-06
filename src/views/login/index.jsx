import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';

import './index.scss'

import Login from './Login';
import CheckIfLoggedIn from './CheckIfLoggedIn';

function LoginRouter() {
  return (
    <Routes>
      <Route path="/" element={<CheckIfLoggedIn />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );  
}

export default LoginRouter
