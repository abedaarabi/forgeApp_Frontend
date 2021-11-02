import React from "react";
import { Link } from "react-router-dom";
import { publishItems } from "../../helper/publishItems";
import { Spin } from "antd";
import { PopUp } from "../popUp/PopUp";

export const ItemsActions = ({
  selectedItems,
  projectId,
  setSelectedItems,
}: any) => {
  //State
  const [aPopUp, setApopUp] = React.useState(false);
  const [publishLoading, setPublishLoading] = React.useState(false);

  const arrayOfItems = Object.values(selectedItems) as any;

  return (
    <div className="items-action-list">
      {arrayOfItems[0] ? (
        <div>
          {/* <li>
            <Link
              to={{
                pathname: `/table/${projectId}/items/${arrayOfItems[0].derivativesId}`,
              }}
            >
              <p className="project-metadata">Project Metadata</p>
            </Link>
          </li> */}
          <li>
            <Link
              to={{
                pathname: `/viewer/${projectId}/items/3dViewer`,
                state: arrayOfItems,
              }}
            >
              <p className="view-model">View Models</p>
            </Link>
          </li>
          <li>
            <button
              className="item-button-publish"
              onClick={async () => {
                setPublishLoading(false);
                setApopUp(true);
              }}
            >
              Publish
            </button>
          </li>
        </div>
      ) : null}
      <div>
        <PopUp
          projectId={projectId}
          arrayOfItems={arrayOfItems}
          tricker={aPopUp}
          setApopUp={setApopUp}
          publishItems={publishItems}
          setO={setPublishLoading}
          setCChecked={setSelectedItems}
        />
      </div>
      <div>
        {publishLoading ? (
          <div>
            <Spin size="large" />,
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemsActions;
