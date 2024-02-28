import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Tasks from './components/Tasks';
import store from './store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
