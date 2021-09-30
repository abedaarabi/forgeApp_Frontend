import React from "react";
import { Checkbox, Spin } from "antd";
import revitLogo from "../img/revit-logo.png";
import { ItemDetails } from "../../../../../server/src/interfaces/interface.item";

interface arrayOfProject {
  items: ItemDetails[];

  getSelectedItems: any;
}
export const ItemInprogress = ({ items, getSelectedItems }: arrayOfProject) => {
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
                <div className="inprogress">
                  <div>
                    <img
                      src={revitLogo}
                      alt=""
                      style={{ marginBottom: "-15px" }}
                    />
                    <Spin size="small" style={{ marginBottom: "-20px" }} />
                  </div>

                  <p style={{ color: "red", marginLeft: "10px" }}>
                    {item.fileName}
                  </p>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
