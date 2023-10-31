import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Tasks from './components/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<Tasks/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
