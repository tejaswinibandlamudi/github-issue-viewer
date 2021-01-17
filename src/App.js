import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import IssueDisplay from "./components/IssueDisplay";
import IssueList from "./components/IssueList";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={HomePage} />
      </div>
      <Route exact path="/:org/:repo/issues" component={IssueList} />
      <Route path="/:org/:repo/issues/:issue" component={IssueDisplay} />
    </Router>
  );
}
