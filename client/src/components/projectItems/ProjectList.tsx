import React from "react";
import { Button, Checkbox, Spin } from "antd";
import revitLogo from "./img/revit-logo.png";
import ItemsActions from "./ItemsActions";
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
interface arrayOfProject {
  items: ItemDetails[];
  loadingResponse: boolean;
  projectId: string;
}
export const ProjectList = ({
  loadingResponse,
  items,
  projectId,
}: arrayOfProject) => {
  //states
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  console.log(items);

  return (
    <div className="project-list">
      {loadingResponse ? (
        <div className="project-list-spin">
          <Spin size="large" />
        </div>
      ) : !items ? (
        <div>please refresh the page</div>
      ) : (
        <div className="project-list-items">
          {items.map((item) => {
            if (!item) {
              return (
                <h3 style={{ backgroundColor: "red", color: "white" }}>
                  contact abma@moe.dk | JHE@Moe.dk to add the project to the
                  platform
                </h3>
              );
            }
            if (item.publishStatus === "complete") {
              return (
                <>
                  <li key={item.derivativesId}>
                    <img src={revitLogo} alt="" />
                    <Checkbox
                      checked={Boolean(selectedItems[item.derivativesId])}
                      onChange={(e: any) => {
                        const value = e.target.checked;
                        if (value) {
                          const isChecked = {
                            ...selectedItems,
                            [item.derivativesId]: item,
                          };
                          // isChecked[item.derivativesId] = item;
                          setSelectedItems(isChecked);
                        } else {
                          const isChecked = { ...selectedItems };
                          delete isChecked[item.derivativesId];
                          setSelectedItems(isChecked);
                        }
                      }}
                    >
                      {item.fileName}
                    </Checkbox>
                  </li>
                </>
              );
            }
            if (item.publishStatus === "Need to Publish") {
              return (
                <>
                  <li key={item.derivativesId}>
                    <img src={revitLogo} alt="" />
                    <Checkbox
                      checked={Boolean(selectedItems[item.derivativesId])}
                      onChange={(e: any) => {
                        const value = e.target.checked;
                        if (value) {
                          const isChecked = {
                            ...selectedItems,
                            [item.derivativesId]: item,
                          };
                          // isChecked[item.derivativesId] = item;
                          setSelectedItems(isChecked);
                        } else {
                          const isChecked = { ...selectedItems };
                          delete isChecked[item.derivativesId];
                          setSelectedItems(isChecked);
                        }
                      }}
                    >
                      <div className="need-publish">
                        <p> {item.fileName}</p> <span></span>
                        <p
                          style={{
                            color: "white",
                            backgroundColor: "red",
                          }}
                        >
                          need to publish
                        </p>
                      </div>
                    </Checkbox>
                  </li>
                </>
              );
            }
            if (item.publishStatus === "inprogress") {
              return (
                <>
                  <div className="inprogress">
                    <div>
                      <img
                        src={revitLogo}
                        alt=""
                        style={{ marginBottom: "5px" }}
                      />
                      <Spin size="small" style={{ marginBottom: "-2px" }} />
                    </div>
                    <p
                      style={{
                        color: "red",
                        marginLeft: "10px",
                      }}
                    >
                      {item.fileName}
                    </p>
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
      <div>
        <ItemsActions
          selectedItems={selectedItems}
          projectId={projectId}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};
