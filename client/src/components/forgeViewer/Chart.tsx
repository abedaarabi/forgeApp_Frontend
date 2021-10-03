import "./forgeViewer.css";

import { Spin } from "antd";
import React from "react";

import { Line, Bar } from "react-chartjs-2";
import { getAllLeavesProperties } from "./helper/forgeViwerHelper";

interface Model {
  allModels: Autodesk.Viewing.GuiViewer3D | undefined;
}

export const Chart = ({ allModels }: Model) => {
  const [tt, setTt] = React.useState("") as any;
  const [rr, setrr] = React.useState("") as any;
  const [data, setSss] = React.useState(null) as any;

  const test = () => {
    console.log("allModels", allModels);
    if (!allModels) return;
    else {
      getAllLeavesProperties(allModels).then( (data: any) => {
        //@ts-ignore
        const BIM7AATypeComments = data["BIM7AATypeComments"];
        if (BIM7AATypeComments) {
          try {
            //@ts-ignore
            const modelData = data["BIM7AATypeComments"];
            const label = Object.keys(modelData);

            console.log(label);
            if (label) setTt(label);
            //@ts-ignore
            const myObject = Object.keys(data["BIM7AATypeComments"]).map(
              //@ts-ignore
              (key) => data["BIM7AATypeComments"][key].length
            );
            if (myObject) setrr(myObject);
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  React.useEffect(() => {
    test();
  }, [allModels]);

  const barData = {
    labels: tt,
    datasets: [
      {
        label: "BIM7AATypeComments",
        data: rr,
        backgroundColor: ["#24b35a"],
        hoverBackgroundColor: ["#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <button
        id="id-btn-green-showModelColor"
        onClick={() => {
          test();
        }}
      >
        cilck
      </button>
      <div>
        <Bar data={barData} />{" "}
      </div>
    </div>
  );
};
