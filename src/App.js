import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.component';
import Questions from './components/questions.component';
import Navbar from './components/navbar.component';
// import logo from './logo.svg';


function App() {
  return (
    // <Navbar />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact ></Route>
        <Route path="/questions" element={<Questions />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
