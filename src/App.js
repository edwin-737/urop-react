import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home.component';
import Navbar from './components/navbar.component';
import Topics from './components/forum/topics.component';
// import logo from './logo.svg';


function App() {
  return (
    // <Navbar />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact ></Route>
        <Route path="/topics" element={<Topics />}></Route>
        {/* <Route path='/replies' element={<Replies />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
