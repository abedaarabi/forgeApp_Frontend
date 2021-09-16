import * as React from "react";
import "./projectItems.css";
import { LinearProgress } from "@material-ui/core";
import fetch from "node-fetch";
import { ItemDetails } from "../../../../server/src/interfaces/interface.item";
import { PublishItems } from "../PublishItems";
import { Checkbox, Spin, Space } from "antd";
import { Result, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { TypeProject } from "../../../../server/src/interfaces/interface.project";
import { PopUp } from "../popUp/PopUp";

export const ProjectItems = () => {
  const [allItems, setallItems] = React.useState([] as ItemDetails[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPublished, setIsPublished] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState(
    {} as { [key: string]: ItemDetails }
  );
  const [aPopUp, setApopUp] = React.useState(false);
  const [publishLoading, setPublishLoading] = React.useState(false);
  const { id, name }: { id: string; name: string } = useParams();

  const [cChecked, setCChecked] = React.useState(false);

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
  console.log("8888", selectedItems);
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
    <div className="mainDiv">
      <h1 style={{ color: "gray" }}> {name} </h1>
      {isLoading ? (
        <div>
          <LinearProgress color="secondary" />
        </div>
      ) : allItems ? (
        allItems.map((item) => {
          if (item.publishStatus === "complete") {
            return (
              <div key={item.derivativesId} className="checkboxComplete">
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
                  style={{ color: "gray" }}
                >
                  {item.fileName}
                </Checkbox>
              </div>
            );
          } else if (item.publishStatus === "Need to Publish") {
            return (
              <div key={item.derivativesId}>
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
                  style={{ color: "gray" }}
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
      ) : null}

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
                    color: "gray",
                    textDecoration: "none",
                    font: "large",
                    position: "absolute",
                  }}
                >
                  Project Metadata
                </p>
              </Link>
              <Link
                to={{
                  pathname: `/viewer/${id}/items/3dViewer`,
                  state: arrayOfItems,
                }}
              >
                <p
                  style={{
                    margin: "30px 100px",
                    color: "gray",
                    textDecoration: "none",
                    font: "large",
                    position: "relative",
                  }}
                >
                  View Models
                </p>
              </Link>
              <div>
                <div style={{ zIndex: 0, position: "absolute" }}>
                  <Button
                    onClick={async () => {
                      console.log("hello");
                      setPublishLoading(false);
                      setApopUp(true);
                    }}
                  >
                    Publish
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: "-150px",
                    zIndex: 1,
                    position: "absolute",
                  }}
                >
                  <PopUp
                    tricker={aPopUp}
                    setApopUp={setApopUp}
                    publishItems={publishItems}
                    setO={setPublishLoading}
                    setCChecked={setSelectedItems}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Button
              onClick={async () => {
                console.log("hello");
                setApopUp(true);
              }}
            >
              Publish
            </Button>
            <PopUp
              tricker={aPopUp}
              setApopUp={setApopUp}
              publishItems={publishItems}
              setO={setPublishLoading}
              setCChecked={setSelectedItems}
            />
            <Link
              to={{
                pathname: `/viewer/${id}/items/3dViewer`,
                state: arrayOfItems,
              }}
            >
              <p
                style={{
                  margin: "30px 100px",
                  color: "gray",
                  textDecoration: "none",
                  font: "large",
                  position: "relative",
                }}
              >
                View Models
              </p>
            </Link>
          </div>
        ))}
      <div>
        {publishLoading ? (
          <div>
            <Space size="large" color="secondary">
              <Spin size="large" />
            </Space>
            ,
          </div>
        ) : null}
      </div>
    </div>
  );
};
