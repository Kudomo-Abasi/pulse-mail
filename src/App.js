import "./App.css";
import React from "react";
import RoutesLayout from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <RoutesLayout />
      </Router>
    </div>
  );
}

export default App;
