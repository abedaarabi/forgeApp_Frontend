import * as React from "react";
import "./projectItems.css";
import fetch from "node-fetch";

import { useParams } from "react-router-dom";
import { ProjectList } from "./ProjectList";
import { ItemDetails } from "../../interfaces/ItemDetails";

export const ProjectItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id, name }: { id: string; name: string } = useParams();

  const getProject = async () => {
    const BASE_ENDPOINT =
      process.env.REACT_APP_PROXY || "http://localhost:9090/";
    try {
      const ENDPOINT = `${BASE_ENDPOINT}projects/${id}`;
      const response = fetch(ENDPOINT);
      setIsLoading(true);
      const data = (await (await response).json()) as any;
      setIsLoading(false);

      setallItems(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getProject();
    return () => {};
  }, []);

  return (
    <div className="main-div">
      <h1> {name} </h1>
      <div>
        <ProjectList
          items={allItems}
          loadingResponse={isLoading}
          projectId={id}
        />
      </div>
    </div>
  );
};
