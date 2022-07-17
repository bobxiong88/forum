import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/home.js';
import B from './components/boards/b.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/b' element={<B />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
