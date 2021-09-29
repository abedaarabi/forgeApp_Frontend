import React from "react";
import { Project } from "./components/Projects";
import { ProjectItems } from "./components/projectItems/ProjectItems";
import { PublishItems } from "./components/PublishItems";
import { DataTable } from "./components/ProjectMetaData";
import { PageNotFound } from "./components/PageNotFound";
import { Home } from "./components/home/Home";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ForgeViewer } from "./components/forgeViewer/ForgeViewer";
import Navbar from "./components/navbar2/Navbar";
import Test from "./components/test/Test";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/testing" exact component={Test} />
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
            path="/viewer/:id/items/3dViewer*/"
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
