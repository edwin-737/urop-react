import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.component';
import Questions from './components/questions.component';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    // <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
