import * as React from "react";
import { LinearProgress } from "@material-ui/core";
import fetch from "node-fetch";
import { ItemDetails } from "../../../server/src/interfaces/interface.item";
import { DataTable } from "./ProjectMetaData";
import { Checkbox } from "antd";

import { Link, useParams } from "react-router-dom";
import { TypeProject } from "../../../server/src/interfaces/interface.project";

export const PublishItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isPublished, setIsPublished] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );

  const { id, name }: { id: string; name: string } = useParams();
  const abed = useParams();
  console.log("========", abed);

  const getProject = async () => {
    try {
      const ENDPOINT = `http://localhost:3050/projects/${id}`;
      const response = fetch(ENDPOINT);
      setIsLoading(true);
      const data = (await (await response).json()) as any;
      setIsLoading(false);

      setallItems(data);
    } catch (error) {}
  };
  console.log(allItems);

  const publishItem = async () => {
    return setIsPublished(false);
    const selectArray = Object.values(selectedItems);
    try {
      const response = await fetch(`http://localhost:3050/projects/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectArray), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProject();
    publishItem();
  }, []);
  console.log(selectedItems);

  const arrayOfItems = Object.values(selectedItems);

  return (
    <div>
      <h1 style={{ color: "white" }}> Publish {name} </h1>
      {isLoading ? (
        <div>
          <LinearProgress color="secondary" />
        </div>
      ) : (
        allItems.map((item) => (
          <div key={item.derivativesId}>
            <Checkbox
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
              style={{ color: "white" }}
            >
              {item.fileName}
            </Checkbox>
          </div>
        ))
      )}
    </div>
  );
};

////////////////////////////////
// const publishItem = async () => {
//   const selectArray = Object.values(selectedItems);
//   try {
//     if (selectArray.length === -1) {
//       alert("Please select item");
//     } else if (selectArray.length === 1) {
//       // return;
//       const response = await fetch(`http://localhost:3050/projects/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(selectArray), // body data type must match "Content-Type" header
//       });
//       const data = await response.json();
//       console.log(data);

//     } else {
//       alert("Please select one item");
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   console.log(selectArray);
// };

{
  /* <input
              type="checkbox"
              onChange={(e) => {
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
            />
            <label style={{ textDecoration: "none", color: "white" }}>
              {item.fileName}
            </label> */
}
