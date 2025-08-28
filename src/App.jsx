import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Message from "./pages/Message";
import Todo from "./pages/Todo";
import Timer from "./pages/Timer";
import Health from "./pages/Health";
function App() {
  return (
    <Router>
      <NavBar className="nav-bar" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </Router>
  );
}

export default App;
