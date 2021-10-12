import React from "react";
import { Checkbox, Spin } from "antd";
import revitLogo from "../img/revit-logo.png";

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

  getSelectedItems: any;
}
export const ItemNeedToPublish = ({
  items,
  getSelectedItems,
}: arrayOfProject) => {
  //states
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  return (
    <>
      <div className="project-list-spin">
        <Spin size="large" />
      </div>
      ) : !items ? (<div>please refresh the page</div>) : (
      <div className="project-list-items">
        {items.map((item) => {
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
        })}
      </div>
    </>
  );
};
