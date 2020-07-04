import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <Router>
      <Route path="/" component={Dashboard} />
    </Router>
  );
}

export default App;
