import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home.component';
import Navbar from './components/navbar.component';
import Topics from './components/forum/topics.component';
// import logo from './logo.svg';


function App() {
  return (
    // <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Topics />}></Route>
        {/* <Route path='/replies' element={<Replies />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
