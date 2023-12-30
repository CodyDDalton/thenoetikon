import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
