import * as React from "react";
import { LinearProgress } from "@material-ui/core";
import fetch from "node-fetch";
import "./SearchBar.css";
import { Link } from "react-router-dom";

export interface TypeProject {
  id: string;
  name: string;
  rootFolderId: string;
}

export const Project = () => {
  const [allProject, setAllProject] = React.useState([] as TypeProject[]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const getProject = async () => {
    try {
      const ENDPOINT = "/projects";
      // const ENDPOINT = "process.env.BACK_END_API/projects";
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
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="search for project..."
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="searchIcon">
          {isLoading ? (
            <div>
              <LinearProgress color="secondary" />
            </div>
          ) : (
            <div className="dataResult">
              {searchecProject.slice(0, 10).map((project) => (
                <div key={project.id}>
                  {
                    <div className="dataItem">
                      <Link
                        to={`/project/${project.id}/${project.name}`}
                        style={{ textDecoration: "none", color: "gray" }}
                      >
                        {project.name}
                      </Link>
                    </div>
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//https://material-ui.com/components/tables/
