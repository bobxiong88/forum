import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, HashRouter} from "react-router-dom";
import Home from './components/home';
import Board from './components/board';
import './styles/App.css';
import Boards from './components/boards';
import uniqid from 'uniqid';
const boardList = Object.keys(Boards);
boardList.sort();
console.log(boardList);
function App() {
  return (
      <HashRouter basename = "/">
        <Routes>
          <Route path = "/home" element={<Home />}/>
          {boardList.map(board => {
            console.log(`${board} added`)
            return (
              <Route key = {uniqid()} path = {`board/${board}`} element = {<Board />}/>
            );
          })}
        </Routes>
      </HashRouter>
  );
}

export default App;
