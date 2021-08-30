import * as React from "react";

import fetch from "node-fetch";
import { ItemDetails } from "../../../server/src/interfaces/interface.item";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

export const ProjectItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  const { id }: { id: string } = useParams();

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

  React.useEffect(() => {
    getProject();
  }, []);
  console.log(selectedItems);

  return (
    <div>
      <h1>Project Items</h1>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        allItems.map((item) => (
          <div key={item.derivativesId}>
            <input
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
            <label> {item.fileName}</label>
          </div>
        ))
      )}
      <button
        onClick={(e) => {
          const selectArray = Object.values(selectedItems);
          console.log("#########,", selectArray);
        }}
      >
        Do SOmething
      </button>
    </div>
  );
};
