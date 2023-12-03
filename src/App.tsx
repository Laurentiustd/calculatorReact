import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator';
import SupportForm from './components/SupportForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Calculator/>} />
            <Route path="/supportPage" element={<SupportForm />} />
          </Routes>
      </Router>
  );
}

export default App;
