import React from "react";
import { Project } from "./components/Projects";
import { ProjectItems } from "./components/projectItems/ProjectItems";
import { PublishItems } from "./components/PublishItems";
import { DataTable } from "./components/ProjectMetaData";
import { PageNotFound } from "./components/PageNotFound";
import { Home } from "./components/Home";
import { NavBar } from "./components/navBar/NavBar";

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { ForgeViewer } from "./components/forgeViewer/ForgeViewer";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/project" exact>
            <Project />
          </Route>
          <Route path="/project/:id/:name" component={ProjectItems} />
          <Route path="/publish" component={PublishItems} />
          <Route
            path="/table/:id/items/:derivativesId"
            exact
            component={DataTable}
          />
          <Route
            path="/viewer/:id/items/3dViewer"
            exact
            component={ForgeViewer}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
