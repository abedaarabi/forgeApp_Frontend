import * as React from "react";

import fetch from "node-fetch";

import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { TypeProject } from "../../../server/src/interfaces/interface.project";

export const Project = () => {
  const [allProject, setAllProject] = React.useState([] as TypeProject[]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const getProject = async () => {
    try {
      const ENDPOINT = "http://localhost:3050/projects";
      const response = fetch(ENDPOINT);
      setIsLoading(true);
      const data = (await (await response).json()) as TypeProject[];
      setIsLoading(false);
      setAllProject(data);
    } catch (error) {}
  };
  React.useEffect(() => {
    getProject();
  }, []);

  let searchecProject;

  if (search === "") {
    searchecProject = [] as TypeProject[];
  } else {
    searchecProject = allProject.filter((project) => {
      return project.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search for project..."
        onChange={(event) => setSearch(event.target.value)}
      />

      <div>
        {isLoading
          ? null
          : searchecProject.slice(0, 10).map((project) => (
              <div key={project.id}>
                {
                  <div>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                  </div>
                }
                <br />
              </div>
            ))}
      </div>
    </div>
  );
};
