import * as React from "react";
import "./projectItems.css";
import fetch from "node-fetch";

import { useParams } from "react-router-dom";
import { ProjectList } from "./ProjectList";

interface ItemDetails {
  publishStatus: string;
  versionId: string;
  fileName: string;
  projectName: string;
  projectId: string;
  versionType: string;
  derivativesId: string;
  createUserName: string;
  fileType: string;
  createTime: Date;
  lastModifiedTime: Date;
  lastModifiedUserName: string;
  storageSize: number;
  extension: string;
  originalItemUrn: string;
  projectGuid: string;
  downloadItem: string;
  name: string;
  role: string;
  guid: string;
  translateStatus: string;
  translateProgress: string;
}

export const ProjectItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id, name }: { id: string; name: string } = useParams();

  const getProject = async () => {
    try {
      const ENDPOINT = `http://localhost:9090/projects/${id}`;
      const response = fetch(ENDPOINT);
      setIsLoading(true);
      const data = (await (await response).json()) as any;
      setIsLoading(false);

      setallItems(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getProject();
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
