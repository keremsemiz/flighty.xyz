import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FlightSearch from './components/FlightSearch';
import FlightResults from './components/FlightResults';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<FlightSearch />} />
        <Route path="/results" element={<FlightResults />} />
      </Routes>
    </Router>
  );
}

export default App;
