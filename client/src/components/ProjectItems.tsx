import * as React from "react";
import { LinearProgress } from "@material-ui/core";
import fetch from "node-fetch";
import { ItemDetails } from "../../../server/src/interfaces/interface.item";
import { PublishItems } from "./PublishItems";
import { Checkbox } from "antd";
import { Result, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { TypeProject } from "../../../server/src/interfaces/interface.project";

export const ProjectItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPublished, setIsPublished] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );

  const { id, name }: { id: string; name: string } = useParams();

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
  const arrayOfItems = Object.values(selectedItems);

  const publishItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:3050/projects/${id}/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arrayOfItems), // body data type must match "Content-Type" header
        }
      );
      const data = await response.json();
      console.log("111111", data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}> {name} </h1>
      {isLoading ? (
        <div>
          <LinearProgress color="secondary" />
        </div>
      ) : (
        allItems.map((item) => {
          if (item.publishStatus === "complete") {
            return (
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
            );
          } else if (item.publishStatus === "Need to Publish") {
            return (
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
                  <p style={{ color: "red" }}>need to publish</p>
                </Checkbox>
              </div>
            );
          } else if (item.publishStatus === "inprogress") {
            return (
              <div key={item.derivativesId}>
                <Button
                  type="primary"
                  loading
                  style={{ background: "darkblue" }}
                ></Button>
                <p style={{ color: "red" }}>{item.fileName}</p>
              </div>
            );
          }
        })
      )}

      {arrayOfItems[0] &&
        (arrayOfItems.length === 1 ? (
          <div style={{ padding: "10px 50px" }}>
            <div>
              <Link
                to={{
                  pathname: `/table/${id}/items/${arrayOfItems[0].derivativesId}`,
                }}
              >
                <p
                  style={{
                    margin: "30px 100px",
                    color: "white",
                    textDecoration: "none",
                    font: "large",
                  }}
                >
                  Project Metadata
                </p>
              </Link>
              <div>
                <Button
                  onClick={async () => {
                    publishItems();
                  }}
                >
                  Back Home
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Button
              onClick={async () => {
                publishItems();
              }}
            >
              Back Home
            </Button>
          </div>
        ))}
    </div>
  );
};
