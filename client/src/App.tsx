import React from "react";
import { Project } from "./components/projects.component";
import { ProjectItems } from "./components/projectItems.component";
import { DataTable } from "./components/projectMetaData.component";
import { PageNotFound } from "./components/pageNotFound";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <div
          style={{
            width: 100 + "vw",
            height: 70,
            backgroundColor: "lightBlue",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/project">project</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/project" exact>
            <Project />
          </Route>
          <Route path="/project/:id/:name" component={ProjectItems} />
          <Route
            path="/table/:id/items/:derivativesId"
            exact
            component={DataTable}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
