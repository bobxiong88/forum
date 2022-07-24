import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/home';
import Board from './components/board';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='forum/' element={<Home />} />
          <Route path = 'forum/:board' element = {<Board />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
