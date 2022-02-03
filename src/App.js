import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz" element={<Quiz/>} />
        </Routes>
      </Router>
    </div>
    );
}

export default App;
