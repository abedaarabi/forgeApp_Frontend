import React from "react";
import { Project } from "./components/projects.component";
import { ProjectItems } from "./components/projectItems.component";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/project" exact component={Project} />
        <Route path="/project/:id" component={ProjectItems} />
      </Switch>
    </Router>
  );
}

export default App;
