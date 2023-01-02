import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Home from './components/home.component';
import Navbar from './components/navbar.component';
import Topics from './components/forum/topics.component';
import Chapters from './components/chapter/Chapters.component'
// import logo from './logo.svg';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Topics />}></Route>
        <Route path='/chapter' element={<Chapters />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
